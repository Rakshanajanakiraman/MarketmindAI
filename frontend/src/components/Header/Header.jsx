import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import './Header.css';

const pageTitles = {
  '/': 'Dashboard',
  '/sales': 'Sales Management',
  '/inventory': 'Inventory Management',
  '/customers': 'Customer Directory',
  '/ai-insights': 'AI Insights',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="header" id="main-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="header-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products, customers..."
            className="search-input"
            id="global-search"
          />
        </div>
        <button className="header-notification" id="notifications-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="header-profile" id="user-profile">
          <div className="avatar">AD</div>
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Owner</span>
          </div>
          <ChevronDown size={16} className="profile-chevron" />
        </div>
      </div>
    </header>
  );
}
