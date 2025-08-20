import React, { useState, useEffect } from 'react';
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

interface DeferredRevenueItem {
  id: number;
  date: string;
  accountNo: string;
  accountName: string;
  voucherNo: string;
  debitCredit: 'debit' | 'credit';
  referenceNo: string;
  debitAmount: string;
  creditAmount: string;
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
const generateDummyData = (count: number): DeferredRevenueItem[] => {
  const accountNames = [
    "Deferred Revenue - Software Licenses",
    "Deferred Revenue - Maintenance Services", 
    "Deferred Revenue - Consulting Fees",
    "Deferred Revenue - Training Programs",
    "Deferred Revenue - Support Services",
    "Deferred Revenue - Implementation",
    "Deferred Revenue - Custom Development",
    "Deferred Revenue - Cloud Services",
    "Deferred Revenue - Professional Services",
    "Deferred Revenue - Annual Subscriptions"
  ];
  
  const referenceNumbers = [
    "REF-2024-001", "REF-2024-002", "REF-2024-003", "REF-2024-004", "REF-2024-005",
    "REF-2024-006", "REF-2024-007", "REF-2024-008", "REF-2024-009", "REF-2024-010"
  ];

  return Array.from({ length: count }, (_, index) => {
    const isDebit = Math.random() > 0.5;
    const amount = (Math.floor(Math.random() * 100000) + 1000).toLocaleString();
    
    return {
      id: index + 1,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      accountNo: `ACC-${String(index + 1).padStart(4, '0')}`,
      accountName: accountNames[index % accountNames.length],
      voucherNo: `VOU-${String(index + 1).padStart(6, '0')}`,
      debitCredit: isDebit ? 'debit' : 'credit',
      referenceNo: referenceNumbers[index % referenceNumbers.length],
      debitAmount: isDebit ? amount : '0',
      creditAmount: isDebit ? '0' : amount
    };
  });
};

export default function DeferredRevenue() {
  const [data, setData] = useState<DeferredRevenueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  
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
  const fetchDeferredRevenue = async (page: number = 1) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate dummy data (simulating 200 total items)
    const totalItems = 200;
    const allData = generateDummyData(totalItems);

    // Calculate pagination
    const totalPages = Math.ceil(allData.length / pagination.itemsPerPage);
    const startIndex = (page - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    const paginatedData = allData.slice(startIndex, endIndex);

    setData(paginatedData);
    setPagination({
      currentPage: page,
      totalPages,
      totalItems: allData.length,
      itemsPerPage: 50,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    });
    
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    fetchDeferredRevenue();
  }, []);



  const handlePostToTally = () => {
    console.log('Post to Tally functionality');
    console.log('Selected Data:', selectedData);
    // Handle posting to Tally logic here
  };

  const handleView = (id: number) => {
    console.log('View deferred revenue item with id:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit deferred revenue item with id:', id);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // Selection handlers
  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === data.length) {
      // If all are selected, deselect all
      setSelectedItems(new Set());
    } else {
      // Select all items on current page
      setSelectedItems(new Set(data.map(item => item.id)));
    }
  };

  // Get selected data objects
  const selectedData = data.filter(item => selectedItems.has(item.id));

  // Pagination handlers
  const handlePageChange = (page: number) => {
    fetchDeferredRevenue(page);
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
        description="Accounts Receivable - Deferred Revenue Management"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Deferred Revenue" />
      
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Deferred Revenue Management
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              View and manage deferred revenue entries
            </p>
          </div>
          
          <Button
            onClick={handlePostToTally}
            size="md"
            variant="primary"
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            POST TO TALLY
          </Button>
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
                     <div className="flex items-center">
                       <input
                         type="checkbox"
                         checked={data.length > 0 && selectedItems.size === data.length}
                         onChange={handleSelectAll}
                         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                       />
                       <span className="ml-2">Selected</span>
                     </div>
                   </TableCell>
                   <TableCell
                     isHeader
                     className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                   >
                     Date
                   </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Account No.
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Account Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Voucher No.
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Debit/Credit
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Reference No.
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Debit Amount
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Credit Amount
                  </TableCell>
                  
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                 {loading ? (
                   <TableRow>
                     <TableCell className="px-5 py-8">{null}</TableCell>
                     <TableCell className="px-5 py-8 text-center">
                       <div className="flex items-center justify-center">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                         <span className="ml-2 text-gray-600 dark:text-gray-400">Loading deferred revenue entries...</span>
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
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                        />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.date}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.accountNo}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="max-w-xs">
                          <span className="text-gray-800 text-theme-sm dark:text-white/90 leading-relaxed">
                            {item.accountName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.voucherNo}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge
                          size="sm"
                          color={item.debitCredit === 'debit' ? 'error' : 'success'}
                        >
                          {item.debitCredit.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.referenceNo}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className={`font-semibold text-theme-sm ${
                          item.debitAmount !== '0' 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-400'
                        }`}>
                          ₹{item.debitAmount}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className={`font-semibold text-theme-sm ${
                          item.creditAmount !== '0' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-400'
                        }`}>
                          ₹{item.creditAmount}
                        </span>
                      </TableCell>
                      
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <svg className="mx-auto h-12 w-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium">No deferred revenue entries found</p>
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

        {/* Pagination Section */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Pagination Info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
              {pagination.totalItems} deferred revenue entries
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

                 {/* Summary Section */}
         <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
             <div className="text-center">
               <div className="text-2xl font-bold text-gray-900 dark:text-white">
                 {selectedData.length}
               </div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Total Entries Selected</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                 ₹{selectedData.reduce((sum, item) => sum + parseInt(item.debitAmount.replace(/[^\d]/g, '')), 0).toLocaleString()}
               </div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Total Debit</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                 ₹{selectedData.reduce((sum, item) => sum + parseInt(item.creditAmount.replace(/[^\d]/g, '')), 0).toLocaleString()}
               </div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Total Credit</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                 {selectedData.filter(item => item.debitCredit === 'debit').length}
               </div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Debit Entries</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                 {selectedData.filter(item => item.debitCredit === 'credit').length}
               </div>
               <div className="text-sm text-gray-600 dark:text-gray-400">Credit Entries</div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
