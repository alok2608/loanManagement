
import React, { createContext, useContext, useState, useEffect } from "react";
import { LoanApplication, User, DashboardStats } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface LoanContextProps {
  loans: LoanApplication[];
  dashboardStats: DashboardStats;
  applyForLoan: (loanData: Partial<LoanApplication>) => Promise<void>;
  verifyLoan: (loanId: string) => Promise<void>;
  rejectLoan: (loanId: string) => Promise<void>;
  approveLoan: (loanId: string) => Promise<void>;
}

const LoanContext = createContext<LoanContextProps | undefined>(undefined);

// Mock data
const generateMockLoans = (): LoanApplication[] => {
  const statuses: ("pending" | "verified" | "rejected" | "approved")[] = ["pending", "verified", "rejected", "approved"];
  const purposes = ["Contact Email not Linked", "Adding Images to Featured Posts", "When will I be charged this month?", "Payment not going through", "Unable to add replies", "Downtime since last week", "Referral Bonus"];
  const loanTypes: ("Debt Net" | "Credit Net" | "Fully Paid" | "Other")[] = ["Debt Net", "Credit Net", "Fully Paid", "Other"];
  const names = ["Tom Cruise", "Matt Damon", "Robert Downey", "Christian Bale", "Henry Cavil", "Chris Evans", "Sam Smith"];
  const avatars = ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3", "https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6", "https://i.pravatar.cc/150?u=7"];
  
  return Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 10));
    
    return {
      id: `loan-${i + 1}`,
      userId: `user-${i + 1}`,
      userFullName: names[i % names.length],
      userEmail: `user${i + 1}@example.com`,
      userAvatar: avatars[i % avatars.length],
      amount: Math.floor(Math.random() * 4 + 1) * 50000,
      createdAt: date,
      updatedAt: date,
      status: statuses[i % statuses.length],
      purpose: purposes[i % purposes.length],
      loanType: loanTypes[i % loanTypes.length],
      dateApplied: format(date, "MMM dd, yyyy"),
      timeApplied: format(date, "h:mm aa"),
      description: `Submitted ${Math.floor(Math.random() * 5) + 1} days ago`,
    };
  });
};

const initialStats: DashboardStats = {
  activeUsers: 200,
  borrowers: 100,
  cashDisbursed: 550000,
  cashReceived: 1000000,
  savings: 450000,
  repaidLoans: 30,
  otherAccounts: 10,
  totalLoans: 50
};

export const LoanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(initialStats);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock loans when the component mounts
    setLoans(generateMockLoans());
  }, []);

  const applyForLoan = async (loanData: Partial<LoanApplication>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) throw new Error("You must be logged in to apply for a loan");
      
      const newLoan: LoanApplication = {
        id: `loan-${loans.length + 1}`,
        userId: user.id,
        userFullName: user.name,
        userEmail: user.email,
        userAvatar: user.avatarUrl || "https://i.pravatar.cc/150?u=default",
        amount: loanData.amount || 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending",
        purpose: loanData.purpose || "General Purpose",
        loanType: loanData.loanType || "Debt Net",
        dateApplied: format(new Date(), "MMM dd, yyyy"),
        timeApplied: format(new Date(), "h:mm aa"),
        description: "Submitted just now",
      };
      
      setLoans(prevLoans => [newLoan, ...prevLoans]);
      toast.success("Loan application submitted successfully");
    } catch (error) {
      console.error("Error applying for loan:", error);
      toast.error("Failed to submit loan application");
      throw error;
    }
  };

  const verifyLoan = async (loanId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoans(prevLoans => 
        prevLoans.map(loan => 
          loan.id === loanId 
            ? { ...loan, status: "verified", updatedAt: new Date() } 
            : loan
        )
      );
      
      toast.success("Loan application verified successfully");
    } catch (error) {
      console.error("Error verifying loan:", error);
      toast.error("Failed to verify loan application");
      throw error;
    }
  };

  const rejectLoan = async (loanId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoans(prevLoans => 
        prevLoans.map(loan => 
          loan.id === loanId 
            ? { ...loan, status: "rejected", updatedAt: new Date() } 
            : loan
        )
      );
      
      toast.success("Loan application rejected");
    } catch (error) {
      console.error("Error rejecting loan:", error);
      toast.error("Failed to reject loan application");
      throw error;
    }
  };

  const approveLoan = async (loanId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoans(prevLoans => 
        prevLoans.map(loan => 
          loan.id === loanId 
            ? { ...loan, status: "approved", updatedAt: new Date() } 
            : loan
        )
      );
      
      toast.success("Loan application approved");
    } catch (error) {
      console.error("Error approving loan:", error);
      toast.error("Failed to approve loan application");
      throw error;
    }
  };

  return (
    <LoanContext.Provider value={{ 
      loans, 
      dashboardStats, 
      applyForLoan, 
      verifyLoan, 
      rejectLoan, 
      approveLoan 
    }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
};
