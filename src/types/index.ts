
export type UserRole = "admin" | "verifier" | "borrower";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  userAvatar: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "verified" | "rejected" | "approved";
  purpose: string;
  loanType: "Debt Net" | "Credit Net" | "Fully Paid" | "Other";
  dateApplied: string;
  timeApplied: string;
  description: string;
}

export interface DashboardStats {
  activeUsers: number;
  borrowers: number;
  cashDisbursed: number;
  cashReceived: number;
  savings: number;
  repaidLoans: number;
  otherAccounts: number;
  totalLoans: number;
}
