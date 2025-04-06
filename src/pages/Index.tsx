
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">CREDIT APP</h1>
          <p className="text-gray-600 mt-2">Login to manage loan applications</p>
        </div>
        <LoginForm />
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Demo accounts are available for testing:</p>
          <ul className="mt-2">
            <li><strong>Admin:</strong> admin@example.com / password</li>
            <li><strong>Verifier:</strong> verifier@example.com / password</li>
            <li><strong>Borrower:</strong> borrower@example.com / password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
