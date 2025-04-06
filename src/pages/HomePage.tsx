
import React from "react";
import { Link } from "react-router-dom";
import { 
  BanknoteIcon, 
  ArrowRight, 
  Search, 
  CreditCard, 
  BarChart2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-white py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 md:mr-8">
              <div className="bg-green-700 inline-flex items-center justify-center p-3 rounded-md">
                <BanknoteIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="mt-2 text-3xl font-bold text-green-900">₦ 0.0</h1>
              <p className="text-green-600 uppercase text-xs font-semibold">DEFICIT</p>
            </div>
            
            <div>
              <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                Get A Loan
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-4 px-4 sm:px-6">
          <div className="flex overflow-x-auto rounded-t-md border-t border-x border-gray-200">
            <Link 
              to="/borrow" 
              className="flex-1 text-center py-3 px-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
            >
              Borrow Cash
            </Link>
            <Link 
              to="/transact" 
              className="flex-1 text-center py-3 px-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
            >
              Transact
            </Link>
            <Link 
              to="/deposit" 
              className="flex-1 text-center py-3 px-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200"
            >
              Deposit Cash
            </Link>
          </div>
          
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search for loans" 
            />
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Applied Loans</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Sort</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Officer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?u=john" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">John Okoh</div>
                          <div className="text-sm text-gray-500">Updated 1 day ago</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">50,000.00</div>
                      <div className="text-xs text-gray-500">Net Debt Int</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">June 09, 2021</div>
                      <div className="text-xs text-gray-500">5:30 PM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <BarChart2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?u=john2" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">John Okoh</div>
                          <div className="text-sm text-gray-500">Updated 2 days ago</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">100,000.00</div>
                      <div className="text-xs text-gray-500">Net Debt Int</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">June 07, 2021</div>
                      <div className="text-xs text-gray-500">3:30 PM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Verified
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <BarChart2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <ArrowRight className="h-5 w-5 transform rotate-180" />
                      </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
