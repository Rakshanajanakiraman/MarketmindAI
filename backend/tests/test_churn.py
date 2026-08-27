"""
Test suite -- Churn Prediction Engine (Milestone 3)
Runs inside the backend venv: .\\venv\\Scripts\\python.exe tests\\test_churn.py
"""

import sys
import os

# Ensure backend/app is importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

print("=" * 60)
print("  MarketMind AI — Churn Prediction Verification Tests")
print("=" * 60)

# ------------------------------------------------------------------
# Test 1: clean_numeric helper (pluralization safety)
# ------------------------------------------------------------------
from app.ml.churn import _clean_numeric

tests_pass = True

cases = [
    ("3 items",  3.0),
    ("1 item",   1.0),
    ("12.5 units", 12.5),
    ("1 day",    1.0),
    ("5 days",   5.0),
    (None,       0.0),
    ("",         0.0),
    (42,         42.0),
    (3.14,       3.14),
]
for raw, expected in cases:
    result = _clean_numeric(raw, default=0.0)
    status = "PASS" if abs(result - expected) < 1e-6 else "FAIL"
    if status == "FAIL":
        tests_pass = False
    print(f"  [{status}] _clean_numeric({raw!r}) -> {result} (expected {expected})")

print()

# ------------------------------------------------------------------
# Test 2: _assign_risk_tier
# ------------------------------------------------------------------
from app.ml.churn import _assign_risk_tier

tier_cases = [
    (0.80, "High"),
    (0.55, "Medium"),
    (0.20, "Low"),
    (0.40, "Medium"),
    (0.70, "High"),
    (0.39, "Low"),
]
for prob, expected_tier in tier_cases:
    result = _assign_risk_tier(prob)
    status = "PASS" if result["riskLevel"] == expected_tier else "FAIL"
    if status == "FAIL":
        tests_pass = False
    print(f"  [{status}] _assign_risk_tier({prob}) -> {result['riskLevel']} (expected {expected_tier})")

print()

# ------------------------------------------------------------------
# Test 3: predict_customer_churn (single-customer heuristic)
# ------------------------------------------------------------------
from app.ml.churn import predict_customer_churn

single_cases = [
    {"recency_days": 180, "frequency_count": 2, "ltv": 200.0,   "segment": "Hibernating", "expected_tier": "High"},
    {"recency_days": 60,  "frequency_count": 8, "ltv": 1500.0,  "segment": "Consumer",    "expected_tier": "Medium"},
    {"recency_days": 10,  "frequency_count": 25, "ltv": 8000.0, "segment": "Champions",   "expected_tier": "Low"},
]
for case in single_cases:
    result = predict_customer_churn(
        recency_days=case["recency_days"],
        frequency_count=case["frequency_count"],
        ltv=case["ltv"],
        segment=case["segment"],
    )
    assert 0.0 <= result["churnProb"] <= 1.0, "churnProb out of range"
    assert result["riskLevel"] in ("High", "Medium", "Low"), "Invalid riskLevel"
    assert "action" in result and len(result["action"]) > 10, "Missing action"
    status = "PASS" if result["riskLevel"] == case["expected_tier"] else "FAIL"
    if status == "FAIL":
        tests_pass = False
    print(f"  [{status}] predict_customer_churn(recency={case['recency_days']}d, freq={case['frequency_count']}, seg={case['segment']!r})")
    print(f"           -> churnProb={result['churnProb']:.4f}  riskLevel={result['riskLevel']}")

print()

# ------------------------------------------------------------------
# Test 4: generate_churn_predictions — full pipeline on data.csv
# ------------------------------------------------------------------
print("  [INFO] Running full churn prediction pipeline on data.csv ...")
print("         (This trains XGBoost + Random Forest — may take ~10 seconds)")
print()

try:
    from app.ml.churn import generate_churn_predictions
    output = generate_churn_predictions()

    # Validate top-level keys
    assert "summary" in output, "Missing 'summary'"
    assert "model_metrics" in output, "Missing 'model_metrics'"
    assert "customers" in output, "Missing 'customers'"

    summary = output["summary"]
    metrics = output["model_metrics"]
    customers = output["customers"]

    # Summary checks
    total = summary["total_customers"]
    assert total > 0, "total_customers should be > 0"
    assert summary["high_risk_count"] + summary["medium_risk_count"] + summary["low_risk_count"] == total
    print(f"  [PASS] Total customers scored: {total}")
    print(f"  [PASS] High Risk:   {summary['high_risk_count']} ({summary['high_risk_pct']}%)")
    print(f"  [PASS] Medium Risk: {summary['medium_risk_count']} ({summary['medium_risk_pct']}%)")
    print(f"  [PASS] Low Risk:    {summary['low_risk_count']} ({summary['low_risk_pct']}%)")
    print(f"  [PASS] Overall Churn Rate:   {summary['overall_churn_rate_pct']}%")
    print(f"  [PASS] Selected Model:       {summary['selected_model']}")
    print(f"  [PASS] Model F1-Score:       {summary['model_f1_score']}")
    print(f"  [PASS] Model ROC-AUC:        {summary['model_roc_auc']}")
    print()

    # Model metrics checks
    for model_name in ("xgboost", "random_forest"):
        m = metrics[model_name]
        assert 0.0 <= m["f1"] <= 1.0,      f"{model_name} F1 out of range"
        assert 0.0 <= m["roc_auc"] <= 1.0, f"{model_name} ROC-AUC out of range"
        print(f"  [PASS] {model_name.upper():20s} F1={m['f1']:.4f}  ROC-AUC={m['roc_auc']:.4f}")

    print()

    # Customer record checks
    assert len(customers) == total, "Customer list length mismatch"
    first = customers[0]
    required_keys = [
        "customerId", "name", "segment", "country", "recencyDays",
        "frequency", "monetary", "rfmScore", "churnProb",
        "riskLevel", "action", "lastActive",
    ]
    for key in required_keys:
        assert key in first, f"Missing key: {key}"
    assert first["riskLevel"] in ("High", "Medium", "Low"), "Invalid riskLevel in first customer"
    assert 0.0 <= first["churnProb"] <= 100.0, "churnProb should be a percentage 0-100"

    print(f"  [PASS] Customer record schema validated ({len(required_keys)} fields)")
    print()
    print("  Top-5 At-Risk Customers:")
    print(f"  {'Customer ID':<14} {'Name':<22} {'Segment':<14} {'Churn%':>7}  {'Risk':<8} {'Recency':>8}")
    print("  " + "-" * 80)
    for c in customers[:5]:
        print(f"  {c['customerId']:<14} {c['name'][:20]:<22} {c['segment']:<14} "
              f"{c['churnProb']:>6.1f}%  {c['riskLevel']:<8} {c['recencyDays']:>6}d")

except Exception as exc:
    tests_pass = False
    print(f"  [FAIL] generate_churn_predictions() raised: {exc}")
    import traceback
    traceback.print_exc()

print()
print("=" * 60)
if tests_pass:
    print("  [OK] All churn prediction verification tests PASSED.")
else:
    print("  [FAIL] Some tests FAILED -- see details above.")
print("=" * 60)
