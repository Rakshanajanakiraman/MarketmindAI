import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingBag,
  Package, AlertTriangle, Brain, ArrowRight,
} from 'lucide-react';
import {
  kpiData, salesOverviewData, salesByCategoryData,
  topSellingProducts, aiRecommendation, formatCurrency,
} from '../../data/mockData';
import './Dashboard.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('monthly');

  const kpiCards = [
    { key: 'sales', label: 'Total Sales', value: formatCurrency(kpiData.totalSales.value), change: kpiData.totalSales.change, period: kpiData.totalSales.period, icon: DollarSign },
    { key: 'profit', label: 'Total Profit', value: formatCurrency(kpiData.totalProfit.value), change: kpiData.totalProfit.change, period: kpiData.totalProfit.period, icon: TrendingUp },
    { key: 'inventory', label: 'Inventory Value', value: formatCurrency(kpiData.inventoryValue.value), change: kpiData.inventoryValue.change, period: kpiData.inventoryValue.period, icon: Package },
    { key: 'lowstock', label: 'Low Stock Items', value: kpiData.lowStockItems.value, change: kpiData.lowStockItems.change, period: kpiData.lowStockItems.period, icon: AlertTriangle, isNegative: true },
  ];

  return (
    <div className="page-content animate-in">
      {/* KPI Cards */}
      <div className="kpi-grid" id="kpi-section">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.isNegative ? kpi.change < 0 : kpi.change > 0;
          return (
            <div key={kpi.key} className={`kpi-card ${kpi.key}`} id={`kpi-${kpi.key}`}>
              <div className="kpi-top">
                <span className="kpi-label">{kpi.label}</span>
                <div className="kpi-icon">
                  <Icon size={20} />
                </div>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div>
                <span className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
                <span className="kpi-period">{kpi.period}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="charts-grid" id="charts-section">
        {/* Sales Overview Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Sales Overview</h3>
            <div className="chart-tabs">
              {['weekly', 'monthly', 'yearly'].map((range) => (
                <button
                  key={range}
                  className={`chart-tab ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesOverviewData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2.5} fill="url(#salesGradient)" name="Sales" dot={false} activeDot={{ r: 5, fill: '#6366f1' }} />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2.5} fill="url(#profitGradient)" name="Profit" dot={false} activeDot={{ r: 5, fill: '#10b981' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="card">
          <div className="card-header">
            <h3>Sales by Category</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={110}
                    innerRadius={55}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {salesByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '13px', lineHeight: '24px' }}
                    formatter={(value) => <span style={{ color: '#475569', fontWeight: 450 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid" id="bottom-section">
        {/* Top Selling Products */}
        <div className="card">
          <div className="card-header">
            <h3>Top Selling Products</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="card-body">
            <table className="data-table" id="top-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Sales</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product) => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                    <td>
                      <span className="badge neutral">{product.category}</span>
                    </td>
                    <td>{formatCurrency(product.sales)}</td>
                    <td>
                      <span className={`growth-${product.growth > 0 ? 'positive' : 'negative'}`} style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="card">
          <div className="card-header">
            <h3>AI Recommendation</h3>
            <span className="badge primary">
              <Brain size={12} /> AI Powered
            </span>
          </div>
          <div className="card-body">
            <div className="ai-recommendation" id="ai-recommendation">
              <div className="ai-header">
                <div className="ai-icon">
                  <Brain size={18} />
                </div>
                <span className="ai-title">{aiRecommendation.title}</span>
              </div>
              <p className="ai-text">{aiRecommendation.text}</p>
              <div className="ai-confidence">
                <span className="confidence-label">Confidence Score</span>
                <div className="confidence-bar-container">
                  <div className="progress-bar" style={{ height: '6px' }}>
                    <div
                      className="progress-fill primary"
                      style={{ width: `${aiRecommendation.confidence}%` }}
                    ></div>
                  </div>
                  <span className="confidence-value">{aiRecommendation.confidence}%</span>
                </div>
              </div>
              <div className="ai-cta">
                <button>
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
