
import React, { useState } from "react";
import { LoanApplication, UserRole } from "@/types";
import { MoreVertical, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLoan } from "@/context/LoanContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoanTableProps {
  title: string;
  loans: LoanApplication[];
  isLoading?: boolean;
}

const LoanTable: React.FC<LoanTableProps> = ({ title, loans, isLoading = false }) => {
  const { user, hasPermission } = useAuth();
  const { verifyLoan, rejectLoan, approveLoan } = useLoan();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLoans = loans.filter(loan => 
    loan.userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedLoans = filteredLoans.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredLoans.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      pending: { bg: "bg-yellow-500", text: "text-white" },
      verified: { bg: "bg-green-500", text: "text-white" },
      rejected: { bg: "bg-red-500", text: "text-white" },
      approved: { bg: "bg-blue-600", text: "text-white" },
    };

    const config = statusConfig[status.toLowerCase()] || { bg: "bg-gray-500", text: "text-white" };

    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs uppercase font-medium`}>
        {status}
      </span>
    );
  };

  const handleAction = async (action: "verify" | "reject" | "approve", loanId: string) => {
    try {
      if (action === "verify") {
        await verifyLoan(loanId);
      } else if (action === "reject") {
        await rejectLoan(loanId);
      } else if (action === "approve") {
        await approveLoan(loanId);
      }
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search loans..."
              className="pl-8 h-9 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" variant="outline" className="h-9">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm" variant="outline" className="h-9">
            Sort
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="sr-only">More</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedLoans.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No loans found
                </td>
              </tr>
            ) : (
              paginatedLoans.map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={loan.userAvatar}
                          alt={loan.userFullName}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {loan.purpose}
                        </div>
                        <div className="text-sm text-gray-500">
                          {loan.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{loan.userFullName}</div>
                    <div className="text-xs text-gray-500">{loan.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{loan.dateApplied}</div>
                    <div className="text-xs text-gray-500">{loan.timeApplied}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {loan.status === "pending" && hasPermission("verifier") && (
                      <Button 
                        onClick={() => handleAction("verify", loan.id)} 
                        className="bg-yellow-500 hover:bg-yellow-600">
                        Pending
                      </Button>
                    )}
                    {loan.status === "verified" && hasPermission("admin") && (
                      <Button
                        onClick={() => handleAction("approve", loan.id)}
                        className="bg-green-500 hover:bg-green-600 text-white">
                        Verified
                      </Button>
                    )}
                    {loan.status === "approved" && (
                      <Button 
                        disabled 
                        className="bg-blue-600 text-white opacity-100 cursor-default">
                        Approved
                      </Button>
                    )}
                    {loan.status === "rejected" && (
                      <Button 
                        disabled 
                        className="bg-red-500 text-white opacity-100 cursor-default">
                        Rejected
                      </Button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(`/loans/${loan.id}`, "_blank")}>
                          View Details
                        </DropdownMenuItem>
                        {loan.status === "pending" && hasPermission("verifier") && (
                          <>
                            <DropdownMenuItem onClick={() => handleAction("verify", loan.id)}>
                              Verify
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("reject", loan.id)}>
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {loan.status === "verified" && hasPermission("admin") && (
                          <>
                            <DropdownMenuItem onClick={() => handleAction("approve", loan.id)}>
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("reject", loan.id)}>
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * rowsPerPage, filteredLoans.length)}
            </span>{" "}
            of <span className="font-medium">{filteredLoans.length}</span> results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            className="form-select text-sm border-gray-300 rounded-md"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-700">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoanTable;
