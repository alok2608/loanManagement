
import React from "react";
import { 
  BanknoteIcon, 
  Users, 
  DollarSign, 
  LineChart, 
  PiggyBank, 
  BarChart
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import Chart from "@/components/dashboard/Chart";
import LoanTable from "@/components/loans/LoanTable";
import { useLoan } from "@/context/LoanContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoansPage = () => {
  const { loans, dashboardStats } = useLoan();
  const { user } = useAuth();
  
  // Filter loans based on status and role
  const pendingLoans = loans.filter(loan => loan.status === "pending");
  const verifiedLoans = loans.filter(loan => loan.status === "verified");
  const approvedLoans = loans.filter(loan => loan.status === "approved");
  const rejectedLoans = loans.filter(loan => loan.status === "rejected");
  
  // Sample chart data
  const loansReleasedData = Array.from({ length: 12 }, (_, i) => ({
    name: (i + 1).toString(),
    value: Math.floor(Math.random() * 700) + 100,
  }));

  const outstandingLoansData = Array.from({ length: 12 }, (_, i) => ({
    name: (i + 1).toString(),
    value: Math.floor(Math.random() * 700) + 100,
  }));
  
  const repaymentsCollectedData = Array.from({ length: 12 }, (_, i) => ({
    name: (i + 1).toString(),
    value: Math.floor(Math.random() * 9) + 1,
  }));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard &gt; Loans</h1>
            <Link to="/apply-loan">
              <Button className="bg-green-600 hover:bg-green-700">
                Apply for Loan
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard 
              icon={<BanknoteIcon size={24} />} 
              value={dashboardStats.totalLoans} 
              label="LOANS" 
            />
            <StatCard 
              icon={<Users size={24} />} 
              value={dashboardStats.borrowers} 
              label="BORROWERS" 
            />
            <StatCard 
              icon={<DollarSign size={24} />} 
              value={dashboardStats.cashDisbursed.toLocaleString()} 
              label="CASH DISBURSED" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard 
              icon={<PiggyBank size={24} />} 
              value={dashboardStats.savings.toLocaleString()} 
              label="SAVINGS" 
            />
            <StatCard 
              icon={<BarChart size={24} />} 
              value={dashboardStats.repaidLoans} 
              label="REPAID LOANS" 
            />
            <StatCard 
              icon={<LineChart size={24} />} 
              value={dashboardStats.cashReceived.toLocaleString()} 
              label="CASH RECEIVED" 
            />
          </div>

          <LoanTable title="Applied Loans" loans={loans} />

          <Chart 
            title="Loans Released Monthly" 
            data={loansReleasedData} 
            type="area" 
            color="rgba(132, 204, 22, 0.5)"
            borderColor="#84cc16"
          />

          <Chart 
            title="Total Outstanding Open Loans - Monthly" 
            data={outstandingLoansData} 
            type="bar" 
            color="#3b82f6"
          />

          <Chart 
            title="Number of Repayments Collected - Monthly" 
            data={repaymentsCollectedData} 
            type="bar" 
            color="#dc2626"
          />
        </main>
      </div>
    </div>
  );
};

export default LoansPage;
