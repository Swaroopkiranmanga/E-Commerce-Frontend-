import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaUser,
  FaCaretDown,
  FaBars,
  FaHome,
  FaCog,
  FaBox,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const Admin = () => {
  const { logout } = useAuth0();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <div>Welcome to the Dashboard!</div>;
      case "Product List":
        return <div>View and manage your Product List here.</div>;
      case "Categories":
        return <div>Explore and manage Product Categories here.</div>;
      case "Sales":
        return <div>Check your Sales data.</div>;
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
    <div className="bg-gray-50 flex h-screen">
      
      <aside className="w-64 bg-gray-800 text-white h-full flex flex-col justify-between">
        <div>
          <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
            Menu
          </div>
          <nav className="mt-4">
            <ul>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Dashboard" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Dashboard")}
              >
                <FaHome className="inline-block mr-2" /> Dashboard
              </li>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Product List" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Product List")}
              >
                <FaBox className="inline-block mr-2" /> Product List
              </li>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Categories" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Categories")}
              >
                <FaBox className="inline-block mr-2" /> Categories
              </li>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Sales" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Sales")}
              >
                <FaDollarSign className="inline-block mr-2" /> Sales
              </li>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Customers" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Customers")}
              >
                <FaUsers className="inline-block mr-2" /> Customers
              </li>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Notifications" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Notifications")}
              >
                <FaBell className="inline-block mr-2" /> Notifications
              </li>
              <li
                className={`p-4 hover:bg-gray-700 cursor-pointer ${
                  activeMenu === "Settings" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveMenu("Settings")}
              >
                <FaCog className="inline-block mr-2" /> Settings
              </li>
            </ul>
          </nav>
        </div>

       
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => logout({ returnTo: "http://localhost:5173" })}
            className="w-full text-left hover:bg-gray-700 p-2 rounded"
          >
            <FaUser className="inline-block mr-2" /> Log out
          </button>
        </div>
      </aside>

    
      <div className="flex-1">
        
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">NeedsForU</div>
            <div className="space-x-4 flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border rounded-full px-4 py-2 focus:outline-none"
                />
                <FaSearch className="absolute top-2 right-4 text-gray-500" />
              </div>
              <FaBell className="text-xl text-gray-600 cursor-pointer hover:text-gray-800" />
              <div className="flex items-center cursor-pointer space-x-2">
                <span className="text-gray-600">Admin</span>
                <FaCaretDown className="text-gray-600" />
              </div>
            </div>
          </div>
        </nav>

      
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
