
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Sliders,
  BookOpen,
  Briefcase,
  PieChart,
  KeyRound,
  Wallet,
  Package,
  FileSignature,
  Calendar,
  Cog,
  LogOut,
  UserRoundPlus
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Borrowers", icon: <Users size={20} />, path: "/borrowers" },
    { name: "Loans", icon: <FileText size={20} />, path: "/loans" },
    { name: "Repayments", icon: <CreditCard size={20} />, path: "/repayments" },
    { name: "Loan Parameters", icon: <Sliders size={20} />, path: "/loan-parameters" },
    { name: "Accounting", icon: <BookOpen size={20} />, path: "/accounting" },
    { name: "Reports", icon: <PieChart size={20} />, path: "/reports" },
    { name: "Collateral", icon: <Briefcase size={20} />, path: "/collateral" },
    { name: "Access Configuration", icon: <KeyRound size={20} />, path: "/access-configuration", adminOnly: true },
    { name: "Admin Management", icon: <UserRoundPlus size={20} />, path: "/admin-management", adminOnly: true },
    { name: "Savings", icon: <Wallet size={20} />, path: "/savings" },
    { name: "Expenses", icon: <Package size={20} />, path: "/expenses" },
    { name: "E-signature", icon: <FileSignature size={20} />, path: "/e-signature" },
    { name: "Investor Accounts", icon: <Users size={20} />, path: "/investor-accounts" },
    { name: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
    { name: "Settings", icon: <Cog size={20} />, path: "/settings" },
  ];

  return (
    <div className="bg-green-900 text-white h-screen w-64 flex flex-col">
      <div className="p-4 border-b border-green-800 flex items-center space-x-3">
        <div className="bg-green-700 rounded-full p-2">
          <Users size={20} />
        </div>
        <div>
          <p className="font-medium">Alok patel</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            if (item.adminOnly && user?.role !== "admin") {
              return null;
            }
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-green-800 text-white"
                      : "text-green-100 hover:bg-green-800 hover:text-white"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-green-800">
        <button
          onClick={logout}
          className="flex items-center text-green-100 hover:text-white w-full px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
