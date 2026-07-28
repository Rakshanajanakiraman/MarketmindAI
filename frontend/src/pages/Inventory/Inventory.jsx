import { useState } from 'react';
import {
  Search, Plus, Download, Edit2, Trash2, AlertTriangle,
  Package, CheckCircle, XCircle, Filter,
} from 'lucide-react';
import { inventoryItems, formatCurrency, categories } from '../../data/mockData';
import './Inventory.css';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: '', sku: '', price: '', stock: '', minStock: '',
  });

  const filtered = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const inStockCount = inventoryItems.filter((i) => i.status === 'in-stock').length;
  const lowStockCount = inventoryItems.filter((i) => i.status === 'low-stock').length;
  const outOfStockCount = inventoryItems.filter((i) => i.status === 'out-of-stock').length;
  const totalValue = inventoryItems.reduce((s, i) => s + (i.price * i.stock), 0);

  const statusIcon = (status) => {
    switch (status) {
      case 'in-stock': return <CheckCircle size={14} />;
      case 'low-stock': return <AlertTriangle size={14} />;
      case 'out-of-stock': return <XCircle size={14} />;
      default: return null;
    }
  };

  const statusBadgeClass = (status) => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'danger';
      default: return 'neutral';
    }
  };

  const stockPercentage = (stock, minStock) => {
    const ratio = Math.min(stock / (minStock * 3), 1);
    return Math.round(ratio * 100);
  };

  const stockBarColor = (stock, minStock) => {
    if (stock === 0) return 'danger';
    if (stock <= minStock) return 'warning';
    return 'accent';
  };

  return (
    <div className="page-content animate-in">
      {/* Inventory Stats */}
      <div className="inventory-stats" id="inventory-stats">
        <div className="inv-stat-card">
          <Package size={22} style={{ color: 'var(--primary-500)' }} />
          <div>
            <span className="inv-stat-value">{inventoryItems.length}</span>
            <span className="inv-stat-label">Total Products</span>
          </div>
        </div>
        <div className="inv-stat-card">
          <CheckCircle size={22} style={{ color: 'var(--accent-500)' }} />
          <div>
            <span className="inv-stat-value">{inStockCount}</span>
            <span className="inv-stat-label">In Stock</span>
          </div>
        </div>
        <div className="inv-stat-card">
          <AlertTriangle size={22} style={{ color: 'var(--warning-500)' }} />
          <div>
            <span className="inv-stat-value">{lowStockCount}</span>
            <span className="inv-stat-label">Low Stock</span>
          </div>
        </div>
        <div className="inv-stat-card">
          <XCircle size={22} style={{ color: 'var(--danger-500)' }} />
          <div>
            <span className="inv-stat-value">{outOfStockCount}</span>
            <span className="inv-stat-label">Out of Stock</span>
          </div>
        </div>
        <div className="inv-stat-card highlight">
          <div>
            <span className="inv-stat-label">Total Inventory Value</span>
            <span className="inv-stat-value large">{formatCurrency(totalValue)}</span>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card" id="inventory-table-section">
        <div className="card-header">
          <h3>Product Catalog</h3>
        </div>
        <div className="card-body">
          <div className="toolbar">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products or SKU..."
                className="form-input"
                style={{ paddingLeft: '40px', width: '280px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="inventory-search"
              />
            </div>
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              id="inventory-status-filter"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select
              className="form-select"
              style={{ width: '160px' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              id="inventory-category-filter"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <div className="toolbar-right">
              <button className="btn btn-secondary btn-sm" id="export-inventory-btn">
                <Download size={16} /> Export
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)} id="add-product-btn">
                <Plus size={16} /> Add Product
              </button>
            </div>
          </div>

          <table className="data-table" id="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className={item.status === 'out-of-stock' ? 'row-faded' : ''}>
                  <td style={{ fontWeight: 500 }}>{item.name}</td>
                  <td><code className="sku-code">{item.sku}</code></td>
                  <td><span className="badge neutral">{item.category}</span></td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(item.price)}</td>
                  <td>
                    <div className="stock-cell">
                      <div className="stock-numbers">
                        <span className="stock-qty">{item.stock}</span>
                        <span className="stock-min">/ min: {item.minStock}</span>
                      </div>
                      <div className="progress-bar" style={{ height: '5px', width: '80px' }}>
                        <div
                          className={`progress-fill ${stockBarColor(item.stock, item.minStock)}`}
                          style={{ width: `${stockPercentage(item.stock, item.minStock)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${statusBadgeClass(item.status)}`}>
                      {statusIcon(item.status)}
                      {item.status === 'in-stock' ? 'In Stock' : item.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.lastUpdated}</td>
                  <td>
                    <div className="action-buttons">
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input type="text" className="form-input" placeholder="Enter product name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input type="text" className="form-input" placeholder="XX-XXX-000" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input type="number" className="form-input" placeholder="0.00" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Stock</label>
                  <input type="number" className="form-input" placeholder="0" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Minimum Stock Level</label>
                <input type="number" className="form-input" placeholder="0" value={newProduct.minStock} onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
