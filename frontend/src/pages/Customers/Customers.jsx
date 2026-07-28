import { useState } from 'react';
import {
  Search, Plus, Download, Eye, Edit2, Trash2, Mail, Phone, MapPin,
  Users, UserCheck, ShoppingBag, ArrowLeft, X,
} from 'lucide-react';
import { customers, customerPurchaseHistory, formatCurrency } from '../../data/mockData';
import './Customers.css';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '', email: '', phone: '', address: '',
  });

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = customers.filter((c) => c.status === 'active').length;
  const totalSpentAll = customers.reduce((s, c) => s + c.totalSpent, 0);

  if (selectedCustomer) {
    const c = selectedCustomer;
    return (
      <div className="page-content animate-in">
        <button className="btn btn-ghost" onClick={() => setSelectedCustomer(null)} style={{ marginBottom: '20px' }}>
          <ArrowLeft size={18} /> Back to Customers
        </button>

        <div className="customer-detail-grid">
          {/* Profile Card */}
          <div className="card customer-profile-card">
            <div className="card-body">
              <div className="customer-avatar-large">
                {c.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h2 className="customer-name">{c.name}</h2>
              <span className={`badge ${c.status === 'active' ? 'success' : 'neutral'}`}>
                {c.status === 'active' ? 'Active' : 'Inactive'}
              </span>
              <div className="customer-contact-info">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>{c.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{c.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>{c.address}</span>
                </div>
              </div>
              <div className="customer-stats-detail">
                <div className="stat-item">
                  <span className="stat-val">{c.totalPurchases}</span>
                  <span className="stat-lbl">Purchases</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">{formatCurrency(c.totalSpent)}</span>
                  <span className="stat-lbl">Total Spent</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">{c.joinDate}</span>
                  <span className="stat-lbl">Member Since</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase History */}
          <div className="card">
            <div className="card-header">
              <h3>Purchase History</h3>
            </div>
            <div className="card-body">
              <table className="data-table" id="purchase-history-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {customerPurchaseHistory.map((ph) => (
                    <tr key={ph.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{ph.id}</td>
                      <td>{ph.date}</td>
                      <td style={{ fontWeight: 500 }}>{ph.product}</td>
                      <td>{ph.quantity}</td>
                      <td style={{ fontWeight: 600 }}>{formatCurrency(ph.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content animate-in">
      {/* Stats Row */}
      <div className="customer-stats-row" id="customer-stats">
        <div className="cust-stat-card">
          <Users size={22} style={{ color: 'var(--primary-500)' }} />
          <div>
            <span className="cust-stat-value">{customers.length}</span>
            <span className="cust-stat-label">Total Customers</span>
          </div>
        </div>
        <div className="cust-stat-card">
          <UserCheck size={22} style={{ color: 'var(--accent-500)' }} />
          <div>
            <span className="cust-stat-value">{activeCount}</span>
            <span className="cust-stat-label">Active</span>
          </div>
        </div>
        <div className="cust-stat-card">
          <ShoppingBag size={22} style={{ color: 'var(--warning-500)' }} />
          <div>
            <span className="cust-stat-value">{formatCurrency(totalSpentAll)}</span>
            <span className="cust-stat-label">Total Revenue</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="card" id="customers-section">
        <div className="card-header">
          <h3>Customer Directory</h3>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >Grid</button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >Table</button>
          </div>
        </div>
        <div className="card-body">
          <div className="toolbar">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                className="form-input"
                style={{ paddingLeft: '40px', width: '280px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="customer-search"
              />
            </div>
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              id="customer-status-filter"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="toolbar-right">
              <button className="btn btn-secondary btn-sm" id="export-customers-btn">
                <Download size={16} /> Export
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)} id="add-customer-btn">
                <Plus size={16} /> Add Customer
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="customer-grid" id="customer-grid">
              {filtered.map((c) => (
                <div key={c.id} className="customer-card" onClick={() => setSelectedCustomer(c)}>
                  <div className="customer-card-top">
                    <div className="customer-avatar">
                      {c.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className={`status-dot ${c.status === 'active' ? 'active' : 'inactive'}`}></span>
                  </div>
                  <h4 className="customer-card-name">{c.name}</h4>
                  <p className="customer-card-email">{c.email}</p>
                  <div className="customer-card-stats">
                    <div>
                      <span className="cc-stat-val">{c.totalPurchases}</span>
                      <span className="cc-stat-lbl">Orders</span>
                    </div>
                    <div>
                      <span className="cc-stat-val">{formatCurrency(c.totalSpent)}</span>
                      <span className="cc-stat-lbl">Spent</span>
                    </div>
                  </div>
                  <div className="customer-card-footer">
                    <span className="cc-last-purchase">Last: {c.lastPurchase}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="data-table" id="customer-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Purchase</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>
                          {c.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td style={{ fontWeight: 600 }}>{c.totalPurchases}</td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(c.totalSpent)}</td>
                    <td>{c.lastPurchase}</td>
                    <td>
                      <span className={`badge ${c.status === 'active' ? 'success' : 'neutral'}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="View" onClick={() => setSelectedCustomer(c)}><Eye size={15} /></button>
                        <button className="action-btn" title="Edit"><Edit2 size={15} /></button>
                        <button className="action-btn danger" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Customer</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Enter full name" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="email@example.com" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input type="text" className="form-input" placeholder="City, State" value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Add Customer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
