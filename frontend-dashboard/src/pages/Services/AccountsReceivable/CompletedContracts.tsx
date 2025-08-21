import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Input from "../../../components/form/input/InputField";
import { EyeIcon, CopyIcon } from "../../../icons";

interface ContractItem {
  id: number;
  customerName: string;
  serviceDescription: string;
  validFromDate: string;
  validTillDate: string;
  serviceRate: string;
  currency: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Generate dummy data for pagination testing
const generateDummyData = (count: number): ContractItem[] => {
  const customers = [
    "Tech Solutions Inc.", "Digital Marketing Pro", "Startup Ventures", 
    "E-commerce Solutions", "Consulting Corp", "Global Enterprises",
    "Innovation Labs", "Future Systems", "Smart Solutions", "NextGen Tech"
  ];
  
  const serviceDescriptions = [
    "Website Development and Maintenance Services",
    "Digital Marketing and SEO Campaign Management",
    "Mobile Application Development and Support",
    "E-commerce Platform Setup and Optimization",
    "Business Consulting and Strategy Development",
    "Cloud Infrastructure and DevOps Services",
    "Data Analytics and Business Intelligence",
    "Cybersecurity and IT Security Services",
    "Customer Support and Help Desk Services",
    "Software Testing and Quality Assurance"
  ];
  
  const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    customerName: customers[index % customers.length],
    serviceDescription: serviceDescriptions[index % serviceDescriptions.length],
    validFromDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    validTillDate: new Date(2024, Math.floor(Math.random() * 12) + 6, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    serviceRate: (Math.floor(Math.random() * 1000) + 50).toString(),
    currency: currencies[index % currencies.length]
  }));
};

export default function CompletedContracts() {
  const navigate = useNavigate();
  const [data, setData] = useState<ContractItem[]>([]);
  const [filteredData, setFilteredData] = useState<ContractItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 50,
    hasNextPage: false,
    hasPreviousPage: false
  });

  // Simulate API call to fetch data
  const fetchContracts = async (page: number = 1, search: string = '', currency: string = 'all') => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate dummy data (simulating 250 total items)
    const totalItems = 250;
    const allData = generateDummyData(totalItems);
    
    // Apply filters
    let filtered = allData.filter(item => {
      const matchesSearch = 
        item.customerName.toLowerCase().includes(search.toLowerCase()) ||
        item.serviceDescription.toLowerCase().includes(search.toLowerCase());
      
      const matchesCurrency = currency === 'all' || item.currency === currency;
      
      return matchesSearch && matchesCurrency;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / pagination.itemsPerPage);
    const startIndex = (page - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);

    setData(paginatedData);
    setFilteredData(paginatedData);
    setPagination({
      currentPage: page,
      totalPages,
      totalItems: filtered.length,
      itemsPerPage: 50,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    });
    
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    fetchContracts();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    fetchContracts(1, searchTerm, currencyFilter);
  }, [searchTerm, currencyFilter]);

  const handleAddNew = () => {
    navigate('/services/accounts-receivable/contracts/add-contract');
  };

  const handleEdit = (id: number) => {
    console.log('Edit completed contract with id:', id);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    setFilteredData(prev => prev.filter(item => item.id !== id));
  };

  const handleView = (id: number) => {
    console.log('View completed contract with id:', id);
  };

  const handleDuplicate = (id: number) => {
    console.log('Copy completed contract with id:', id);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    fetchContracts(page, searchTerm, currencyFilter);
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      handlePageChange(pagination.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.hasPreviousPage) {
      handlePageChange(pagination.currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(pagination.totalPages);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Accounts Receivable - Completed Contracts Management"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Completed Contracts" />
      
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Completed Contracts
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              View and manage completed client contracts
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/services/accounts-receivable/completed-contracts')}
              size="md"
              variant="primary"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completed
            </Button>
            <Button
              onClick={() => navigate('/services/accounts-receivable/draft-contracts')}
              size="md"
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Draft
            </Button>
            <Button
              onClick={() => navigate('/services/accounts-receivable/pending-approval-contracts')}
              size="md"
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pending Approval
            </Button>
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
            Add Contract
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
                  placeholder="Search customers, services..."
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
                    Currency
                  </label>
                  <select
                    value={currencyFilter}
                    onChange={(e) => setCurrencyFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All Currencies</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
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
                    Id
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Customer Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Service Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Valid From Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Valid Till Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Service Rate
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Currency
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
                {loading ? (
                  <TableRow>
                    <TableCell className="px-5 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading completed contracts...</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                  </TableRow>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.id}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-800 text-theme-sm dark:text-white/90">
                          {item.customerName}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="max-w-xs">
                          <span className="text-gray-800 text-theme-sm dark:text-white/90 leading-relaxed">
                            {item.serviceDescription}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.validFromDate}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.validTillDate}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                          {item.serviceRate}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.currency}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleView(item.id)}
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            View
                          </Button>
                          <Button
                            onClick={() => handleDuplicate(item.id)}
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                          >
                            Copy
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
                        <p className="text-lg font-medium">No completed contracts found</p>
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
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination Section */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Pagination Info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
              {pagination.totalItems} completed contracts
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* First Page */}
              <Button
                onClick={handleFirstPage}
                size="sm"
                variant="outline"
                disabled={!pagination.hasPreviousPage}
                className="h-8 w-8 p-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </Button>

              {/* Previous Page */}
              <Button
                onClick={handlePreviousPage}
                size="sm"
                variant="outline"
                disabled={!pagination.hasPreviousPage}
                className="h-8 w-8 p-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  size="sm"
                  variant={page === pagination.currentPage ? "primary" : "outline"}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ))}

              {/* Next Page */}
              <Button
                onClick={handleNextPage}
                size="sm"
                variant="outline"
                disabled={!pagination.hasNextPage}
                className="h-8 w-8 p-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>

              {/* Last Page */}
              <Button
                onClick={handleLastPage}
                size="sm"
                variant="outline"
                disabled={!pagination.hasNextPage}
                className="h-8 w-8 p-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
