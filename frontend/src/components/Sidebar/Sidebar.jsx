import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Brain,
  FileBarChart,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sales', label: 'Sales', icon: ShoppingCart },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/ai-insights', label: 'AI Insights', icon: Brain },
  { path: '/reports', label: 'Reports', icon: FileBarChart },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar" id="main-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Sparkles size={20} />
        </div>
        <div className="brand-text">
          <span className="brand-name">MarketMind</span>
          <span className="brand-tag">AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">MAIN MENU</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {isActive && <ChevronRight size={16} className="nav-arrow" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <div className="sidebar-upgrade">
          <div className="upgrade-glow"></div>
          <Sparkles size={18} className="upgrade-icon" />
          <p className="upgrade-title">AI Powered</p>
          <p className="upgrade-desc">Intelligent insights for your business growth</p>
        </div>
        <NavLink to="/settings" className="nav-item" id="nav-settings">
          <Settings size={20} className="nav-icon" />
          <span className="nav-label">Settings</span>
        </NavLink>
        <button className="nav-item" id="nav-logout">
          <LogOut size={20} className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
