import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Search, Plus, Filter, Download, Eye, Edit2, Trash2,
  TrendingUp, ShoppingCart, CreditCard, Calendar,
} from 'lucide-react';
import {
  salesTransactions, monthlySalesData, formatCurrency,
} from '../../data/mockData';
import './Sales.css';

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: '', product: '', quantity: '', amount: '', paymentMode: 'UPI',
  });

  const filteredTransactions = salesTransactions.filter((t) => {
    const matchesSearch =
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = salesTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedCount = salesTransactions.filter((t) => t.status === 'completed').length;
  const avgOrderValue = Math.round(totalRevenue / salesTransactions.length);

  const statusBadge = (status) => {
    const map = {
      completed: 'success',
      pending: 'warning',
      refunded: 'danger',
    };
    return map[status] || 'neutral';
  };

  return (
    <div className="page-content animate-in">
      {/* Sales KPIs */}
      <div className="sales-kpi-row" id="sales-kpi-section">
        <div className="sales-kpi-card">
          <div className="sales-kpi-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)' }}>
            <ShoppingCart size={22} />
          </div>
          <div>
            <span className="sales-kpi-label">Total Revenue</span>
            <span className="sales-kpi-value">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>
        <div className="sales-kpi-card">
          <div className="sales-kpi-icon" style={{ background: 'var(--accent-50)', color: 'var(--accent-600)' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="sales-kpi-label">Avg Order Value</span>
            <span className="sales-kpi-value">{formatCurrency(avgOrderValue)}</span>
          </div>
        </div>
        <div className="sales-kpi-card">
          <div className="sales-kpi-icon" style={{ background: 'var(--info-50)', color: 'var(--info-500)' }}>
            <CreditCard size={22} />
          </div>
          <div>
            <span className="sales-kpi-label">Transactions</span>
            <span className="sales-kpi-value">{salesTransactions.length}</span>
          </div>
        </div>
        <div className="sales-kpi-card">
          <div className="sales-kpi-icon" style={{ background: 'var(--accent-50)', color: 'var(--accent-600)' }}>
            <Calendar size={22} />
          </div>
          <div>
            <span className="sales-kpi-label">Completed</span>
            <span className="sales-kpi-value">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card sales-chart-card" id="sales-chart">
        <div className="card-header">
          <h3>Monthly Revenue & Transactions</h3>
        </div>
        <div className="card-body">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px' }}
                  formatter={(value, name) => [name === 'revenue' ? formatCurrency(value) : value, name === 'revenue' ? 'Revenue' : 'Transactions']}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="revenue" fill="url(#revenueBarGrad)" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card" id="transactions-section">
        <div className="card-header">
          <h3>Recent Transactions</h3>
        </div>
        <div className="card-body">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="form-input"
                style={{ paddingLeft: '40px', width: '280px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="sales-search"
              />
            </div>
            <select
              className="form-select"
              style={{ width: '160px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              id="status-filter"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
            <div className="toolbar-right">
              <button className="btn btn-secondary btn-sm" id="export-sales-btn">
                <Download size={16} /> Export
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)} id="add-sale-btn">
                <Plus size={16} /> New Sale
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="data-table" id="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{txn.id}</td>
                  <td>{txn.date}</td>
                  <td style={{ fontWeight: 500 }}>{txn.customer}</td>
                  <td>{txn.product}</td>
                  <td>{txn.quantity}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(txn.amount)}</td>
                  <td><span className="badge neutral">{txn.paymentMode}</span></td>
                  <td>
                    <span className={`badge ${statusBadge(txn.status)}`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="View"><Eye size={15} /></button>
                      <button className="action-btn" title="Edit"><Edit2 size={15} /></button>
                      <button className="action-btn danger" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sale Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Sale Entry</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter customer name"
                  value={newSale.customer}
                  onChange={(e) => setNewSale({ ...newSale, customer: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Product</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter product name"
                  value={newSale.product}
                  onChange={(e) => setNewSale({ ...newSale, product: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={newSale.quantity}
                    onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0.00"
                    value={newSale.amount}
                    onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Payment Mode</label>
                <select
                  className="form-select"
                  value={newSale.paymentMode}
                  onChange={(e) => setNewSale({ ...newSale, paymentMode: e.target.value })}
                >
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                  <option value="EMI">EMI</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Save Sale</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
