import os
import sys

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.ml.forecasting import (
    clean_pluralized_string,
    load_and_preprocess_sales_data,
    generate_sales_forecast
)

def test_clean_pluralized_string():
    """
    Verifies that string pluralization handling prevents variable type parsing crashes.
    """
    assert clean_pluralized_string("1 item") == 1.0
    assert clean_pluralized_string("12 items") == 12.0
    assert clean_pluralized_string("1 day") == 1.0
    assert clean_pluralized_string("5 days") == 5.0
    assert clean_pluralized_string("3.5 units") == 3.5
    assert clean_pluralized_string(42) == 42.0
    assert clean_pluralized_string(None, default_val=0.0) == 0.0
    assert clean_pluralized_string("invalid string", default_val=1.0) == 1.0

def test_load_and_preprocess_sales_data():
    """
    Verifies that data.csv is ingested and aggregated into a weekly time series.
    """
    df_weekly = load_and_preprocess_sales_data()
    assert df_weekly is not None
    assert len(df_weekly) > 0
    assert "ds" in df_weekly.columns
    assert "y" in df_weekly.columns

def test_generate_sales_forecast_output_structure():
    """
    Verifies that the forecasting engine outputs forecasts and model metrics.
    """
    result = generate_sales_forecast()
    
    assert "forecasts" in result
    assert "model_metrics" in result
    assert isinstance(result["forecasts"], list)
    assert isinstance(result["model_metrics"], list)
    
    # Assert forecast structure
    for forecast in result["forecasts"]:
        assert "month" in forecast
        assert "forecast" in forecast
        assert "lower" in forecast
        assert "upper" in forecast
        assert forecast["lower"] <= forecast["forecast"] <= forecast["upper"]

    # Assert model metrics structure
    for metric in result["model_metrics"]:
        assert "model" in metric
        assert "mae" in metric
        assert "rmse" in metric
        assert "r2" in metric
        assert "status" in metric

if __name__ == "__main__":
    test_clean_pluralized_string()
    test_load_and_preprocess_sales_data()
    test_generate_sales_forecast_output_structure()
    print("All forecasting engine verification tests passed successfully!")
