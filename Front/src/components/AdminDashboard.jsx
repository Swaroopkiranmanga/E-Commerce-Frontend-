import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaUser,
  FaCaretDown,
  FaHome,
  FaCog,
  FaBox,
  FaUsers,
} from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import "./AdminDashboard.css";

const AdminDashboard = ({ homeContent }) => {
  const { logout } = useAuth0();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return homeContent; 
      case "Product List":
        return <div>View and manage your Product List here.</div>;
      case "Categories":
        return <div>Explore and manage Product Categories here.</div>;
      case "Customers":
        return <div>Manage your Customers.</div>;
      case "Notifications":
        return <div>View all Notifications.</div>;
      case "Settings":
        return <div>Adjust your Settings here.</div>;
      default:
        return <div>Select a menu item to view content.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">Menu</div>
          <nav className="sidebar-nav">
            <ul>
              <li
                className={`menu-item ${
                  activeMenu === "Dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("Dashboard")}
              >
                <FaHome className="menu-icon" /> Dashboard
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Product List" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("Product List")}
              >
                <FaBox className="menu-icon" /> Product List
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Categories" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("Categories")}
              >
                <FaBox className="menu-icon" /> Categories
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Customers" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("Customers")}
              >
                <FaUsers className="menu-icon" /> Customers
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Notifications" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("Notifications")}
              >
                <FaBell className="menu-icon" /> Notifications
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Settings" ? "active" : ""
                }`}
                onClick={() => setActiveMenu("Settings")}
              >
                <FaCog className="menu-icon" /> Settings
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Section */}
        <div className="logout-section">
          <button
            onClick={() => logout({ returnTo: "http://localhost:5173" })}
            className="logout-button"
          >
            <FaUser className="menu-icon" /> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="content">
        {/* Header */}
        <nav className="header">
          <div className="header-container">
            <div className="header-title">NeedsForU</div>
            <div className="header-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <FaSearch className="search-icon" />
              </div>
              <FaBell className="action-icon" />
              <div className="user-profile">
                <span>Admin</span>
                <FaCaretDown />
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Content */}
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
