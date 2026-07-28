import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import {
  Brain, TrendingUp, TrendingDown, Zap, Target, Lightbulb,
  ArrowUpRight, ArrowDownRight, RefreshCw,
} from 'lucide-react';
import {
  demandForecasts, salesPredictions, aiInsights,
  forecastChartData, formatCurrency,
} from '../../data/mockData';
import './AIInsights.css';

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState('forecasts');

  const insightTypeStyle = (type) => {
    switch (type) {
      case 'opportunity': return { bg: 'var(--accent-50)', color: 'var(--accent-600)', icon: <TrendingUp size={22} /> };
      case 'warning': return { bg: 'var(--warning-50)', color: 'var(--warning-600)', icon: <Zap size={22} /> };
      case 'trend': return { bg: 'var(--info-50)', color: 'var(--info-500)', icon: <Target size={22} /> };
      case 'suggestion': return { bg: 'var(--primary-50)', color: 'var(--primary-600)', icon: <Lightbulb size={22} /> };
      default: return { bg: 'var(--gray-100)', color: 'var(--gray-600)', icon: <Brain size={22} /> };
    }
  };

  return (
    <div className="page-content animate-in">
      {/* AI Header Banner */}
      <div className="ai-banner" id="ai-banner">
        <div className="ai-banner-content">
          <div className="ai-banner-icon">
            <Brain size={28} />
          </div>
          <div>
            <h2>AI-Powered Business Intelligence</h2>
            <p>Machine learning models analyze your sales data to provide actionable insights, demand forecasts, and smart recommendations.</p>
          </div>
        </div>
        <button className="btn btn-secondary" id="refresh-insights-btn">
          <RefreshCw size={16} /> Refresh Insights
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs" id="ai-tabs">
        <button className={`tab ${activeTab === 'forecasts' ? 'active' : ''}`} onClick={() => setActiveTab('forecasts')}>
          Demand Forecasts
        </button>
        <button className={`tab ${activeTab === 'predictions' ? 'active' : ''}`} onClick={() => setActiveTab('predictions')}>
          Sales Predictions
        </button>
        <button className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
          Recommendations
        </button>
      </div>

      {/* Demand Forecasts Tab */}
      {activeTab === 'forecasts' && (
        <div className="ai-tab-content">
          {/* Forecast Chart */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3>Sales Forecast (Actual vs Predicted)</h3>
              <span className="badge primary"><Brain size={12} /> ML Model</span>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px' }}
                      formatter={(value) => value ? formatCurrency(value) : 'N/A'}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2.5} fill="url(#actualGrad)" name="Actual Sales" dot={{ r: 4, fill: '#6366f1' }} connectNulls={false} />
                    <Area type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="8 4" fill="url(#forecastGrad)" name="Forecasted Sales" dot={{ r: 4, fill: '#f59e0b' }} connectNulls={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Demand Forecast Table */}
          <div className="card">
            <div className="card-header">
              <h3>Product Demand Forecasts</h3>
            </div>
            <div className="card-body">
              <table className="data-table" id="forecast-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Current Demand</th>
                    <th>Forecasted</th>
                    <th>Change</th>
                    <th>Confidence</th>
                    <th>Period</th>
                  </tr>
                </thead>
                <tbody>
                  {demandForecasts.map((f) => (
                    <tr key={f.id}>
                      <td style={{ fontWeight: 500 }}>{f.product}</td>
                      <td><span className="badge neutral">{f.category}</span></td>
                      <td>{f.currentDemand} units</td>
                      <td style={{ fontWeight: 600 }}>{f.forecastedDemand} units</td>
                      <td>
                        <span className={`forecast-change ${f.trend === 'up' ? 'up' : 'down'}`}>
                          {f.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {f.changePercent > 0 ? '+' : ''}{f.changePercent}%
                        </span>
                      </td>
                      <td>
                        <div className="confidence-cell">
                          <div className="progress-bar" style={{ height: '5px', width: '60px' }}>
                            <div className={`progress-fill ${f.confidence >= 85 ? 'accent' : f.confidence >= 70 ? 'warning' : 'danger'}`} style={{ width: `${f.confidence}%` }}></div>
                          </div>
                          <span className="confidence-text">{f.confidence}%</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{f.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sales Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="ai-tab-content">
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3>Revenue Prediction (Next 5 Months)</h3>
              <span className="badge primary"><Brain size={12} /> Time Series Model</span>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesPredictions} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="predBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px' }}
                      formatter={(value) => formatCurrency(value)}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '13px' }} />
                    <Bar dataKey="lower" fill="#e2e8f0" name="Lower Bound" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar dataKey="predicted" fill="url(#predBarGrad)" name="Predicted" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar dataKey="upper" fill="#c7d2fe" name="Upper Bound" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Predictions Summary */}
          <div className="predictions-grid">
            {salesPredictions.map((pred, idx) => (
              <div key={idx} className="prediction-card">
                <span className="pred-month">{pred.month}</span>
                <span className="pred-value">{formatCurrency(pred.predicted)}</span>
                <div className="pred-range">
                  <span>Range: {formatCurrency(pred.lower)} - {formatCurrency(pred.upper)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="ai-tab-content">
          <div className="insights-grid" id="insights-grid">
            {aiInsights.map((insight) => {
              const style = insightTypeStyle(insight.type);
              return (
                <div key={insight.id} className="insight-card">
                  <div className="insight-badge">
                    <span className={`badge ${insight.impact === 'Critical' ? 'danger' : insight.impact === 'High' ? 'primary' : insight.impact === 'Medium' ? 'warning' : 'neutral'}`}>
                      {insight.impact} Impact
                    </span>
                  </div>
                  <div className="insight-icon" style={{ background: style.bg, color: style.color }}>
                    {style.icon}
                  </div>
                  <h3>{insight.title}</h3>
                  <p>{insight.description}</p>
                  <div className="insight-metric">{insight.metric}</div>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: '12px' }}>
                    View Details <ArrowUpRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
