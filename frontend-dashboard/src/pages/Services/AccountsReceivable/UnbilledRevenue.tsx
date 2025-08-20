import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import Badge from "../../../components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Input from "../../../components/form/input/InputField";

interface UnbilledRevenueItem {
  id: number;
  contractNumber: string;
  clientName: string;
  projectName: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdBy: string;
  lastModified: string;
}

// Sample data for the table
const initialData: UnbilledRevenueItem[] = [
  {
    id: 1,
    contractNumber: "CON-2024-001",
    clientName: "Tech Solutions Inc.",
    projectName: "Website Development",
    amount: "₹50,000",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "pending",
    createdBy: "John Doe",
    lastModified: "2024-01-20"
  },
  {
    id: 2,
    contractNumber: "CON-2024-002",
    clientName: "Digital Marketing Pro",
    projectName: "SEO Campaign",
    amount: "₹75,000",
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    status: "approved",
    createdBy: "Jane Smith",
    lastModified: "2024-01-25"
  },
  {
    id: 3,
    contractNumber: "CON-2024-003",
    clientName: "Startup Ventures",
    projectName: "Mobile App Development",
    amount: "₹1,20,000",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    status: "draft",
    createdBy: "Mike Johnson",
    lastModified: "2024-02-05"
  },
  {
    id: 4,
    contractNumber: "CON-2024-004",
    clientName: "E-commerce Solutions",
    projectName: "Online Store Setup",
    amount: "₹90,000",
    startDate: "2024-02-10",
    endDate: "2024-03-10",
    status: "rejected",
    createdBy: "Sarah Wilson",
    lastModified: "2024-02-15"
  },
  {
    id: 5,
    contractNumber: "CON-2024-005",
    clientName: "Consulting Corp",
    projectName: "Business Analysis",
    amount: "₹60,000",
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    status: "pending",
    createdBy: "David Brown",
    lastModified: "2024-02-20"
  }
];

export default function UnbilledRevenue() {
  const navigate = useNavigate();
  const [data, setData] = useState<UnbilledRevenueItem[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter data based on search term and status filter
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'light';
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'light';
    }
  };

  const handleAddNew = () => {
    navigate('/services/accounts-receivable/unbilled-revenue/add-unbilled-revenue');
  };

  const handleEdit = (id: number) => {
    // Handle edit functionality
    console.log('Edit item with id:', id);
  };

  const handleDelete = (id: number) => {
    // Handle delete functionality
    setData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Accounts Receivable - Unbilled Revenue Management"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Unbilled Revenue" />
      
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Unbilled Revenue Management
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Manage and track unbilled revenue items
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            size="md"
            variant="primary"
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="Search contracts, clients, projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Button */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                size="md"
                variant="outline"
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters
              </Button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/[0.05]">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Contract Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Client Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Project Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Period
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Created By
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Last Modified
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.contractNumber}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-800 text-theme-sm dark:text-white/90">
                          {item.clientName}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-800 text-theme-sm dark:text-white/90">
                          {item.projectName}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                          {item.amount}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="text-gray-600 text-theme-xs dark:text-gray-400">
                          <div>{item.startDate}</div>
                          <div>to {item.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge
                          size="sm"
                          color={getStatusBadgeColor(item.status)}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.createdBy}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-xs dark:text-gray-400">
                          {item.lastModified}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleEdit(item.id)}
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                                 ) : (
                   <TableRow>
                     <TableCell className="px-5 py-8 text-center">
                       <div className="text-gray-500 dark:text-gray-400">
                         <svg className="mx-auto h-12 w-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                         </svg>
                         <p className="text-lg font-medium">No unbilled revenue items found</p>
                         <p className="text-sm">Try adjusting your search or filter criteria</p>
                       </div>
                     </TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                   </TableRow>
                 )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredData.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {filteredData.filter(item => item.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pending Approval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {filteredData.filter(item => item.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{filteredData.reduce((sum, item) => sum + parseInt(item.amount.replace(/[^\d]/g, '')), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
