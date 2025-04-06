
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UnauthorizedPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="rounded-full bg-red-100 p-3 mx-auto w-fit mb-4">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. This area requires higher privileges.
        </p>
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            {user ? (
              <>You are logged in as <span className="font-medium">{user.name}</span> with role <span className="font-medium">{user.role}</span>.</>
            ) : (
              "You are not logged in."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
