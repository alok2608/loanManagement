
import React, { useMemo } from "react";
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  LineChart, 
  PiggyBank, 
  BarChart, 
  Building 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import Chart from "@/components/dashboard/Chart";
import RecoveryCard from "@/components/dashboard/RecoveryCard";
import LoanTable from "@/components/loans/LoanTable";
import { useLoan } from "@/context/LoanContext";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { loans, dashboardStats } = useLoan();
  const { user } = useAuth();
  
  // Sample chart data
  const loansReleasedData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: (i + 1).toString(),
      value: Math.floor(Math.random() * 700) + 100,
    }));
  }, []);

  const outstandingLoansData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: (i + 1).toString(),
      value: Math.floor(Math.random() * 700) + 100,
    }));
  }, []);
  
  const repaymentsCollectedData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: (i + 1).toString(),
      value: Math.floor(Math.random() * 9) + 1,
    }));
  }, []);

  const recentLoans = useMemo(() => {
    return loans.slice(0, 7);
  }, [loans]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              icon={<Users size={24} />} 
              value={dashboardStats.activeUsers} 
              label="ACTIVE USERS" 
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
            <StatCard 
              icon={<LineChart size={24} />} 
              value={dashboardStats.cashReceived.toLocaleString()} 
              label="CASH RECEIVED" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
              icon={<Building size={24} />} 
              value={dashboardStats.otherAccounts} 
              label="OTHER ACCOUNTS" 
            />
            <StatCard 
              icon={<DollarSign size={24} />} 
              value={dashboardStats.totalLoans} 
              label="LOANS" 
            />
          </div>

          <LoanTable title="Recent Loans" loans={recentLoans} />

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <RecoveryCard 
              title="Rate of Recovery (Open, Fully Paid, Default Loans)" 
              description="Percentage of the loan amount that is paid for all loans" 
              percentage={45} 
              color="bg-orange-500 text-white"
            />
            <RecoveryCard 
              title="Rate of Recovery (Open Loans)" 
              description="Percentage of the due amount that is paid for open loans until today" 
              percentage={35} 
              color="bg-green-600 text-white"
            />
          </div>

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

export default DashboardPage;
