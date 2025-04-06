
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import LoanApplicationForm from "@/components/loans/LoanApplicationForm";

const ApplyLoanPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <LoanApplicationForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplyLoanPage;
