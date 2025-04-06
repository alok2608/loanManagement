
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  CreditCard, 
  PieChart, 
  Bell, 
  MessageCircle, 
  User as UserIcon,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <Link to="/" className="text-green-800 font-bold text-xl mr-10">
          CREDIT APP
        </Link>
        
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="flex items-center text-green-800 px-3 py-2 rounded-md">
            <Home className="mr-1 h-5 w-5" />
            <span>Home</span>
          </Link>
          
          <Link to="/payments" className="flex items-center text-gray-600 hover:text-green-800 px-3 py-2 rounded-md">
            <CreditCard className="mr-1 h-5 w-5" />
            <span>Payments</span>
          </Link>
          
          <Link to="/budget" className="flex items-center text-gray-600 hover:text-green-800 px-3 py-2 rounded-md">
            <PieChart className="mr-1 h-5 w-5" />
            <span>Budget</span>
          </Link>
          
          <Link to="/card" className="flex items-center text-gray-600 hover:text-green-800 px-3 py-2 rounded-md">
            <CreditCard className="mr-1 h-5 w-5" />
            <span>Card</span>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-600">
          <MessageCircle className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1">
              {user && (
                <>
                  <UserIcon className="h-5 w-5 text-green-700" />
                  <span className="text-green-700">{user.role === "admin" ? "Admin" : user.role === "verifier" ? "Verifier" : "User"}</span>
                  <ChevronDown className="h-4 w-4 text-green-700" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="w-full cursor-pointer">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
