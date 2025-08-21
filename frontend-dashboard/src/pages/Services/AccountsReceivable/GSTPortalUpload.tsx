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

interface GSTInvoiceItem {
  id: number;
  gstin: string;
  invoiceNo: string;
  invoiceDate: string;
  customerName: string;
  taxableValue: string;
  hsn: string;
  gstRate: string;
  igst: string;
  cgst: string;
  sgst: string;
  invoiceValue: string;
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
const generateDummyData = (count: number): GSTInvoiceItem[] => {
  const customerNames = [
    "Tech Solutions Inc.", "Digital Marketing Pro", "Startup Ventures", 
    "E-commerce Solutions", "Consulting Corp", "Global Enterprises",
    "Innovation Labs", "Future Systems", "Smart Solutions", "NextGen Tech"
  ];
  
  const hsnCodes = [
    "998314", "998315", "998316", "998317", "998318", 
    "998319", "998320", "998321", "998322", "998323"
  ];

  return Array.from({ length: count }, (_, index) => {
    const taxableValue = Math.floor(Math.random() * 100000) + 1000;
    const gstRate = Math.random() > 0.5 ? 18 : 12;
    const gstAmount = (taxableValue * gstRate) / 100;
    
    // Determine if it's inter-state (IGST) or intra-state (CGST+SGST)
    const isInterState = Math.random() > 0.5;
    
    let igst, cgst, sgst;
    if (isInterState) {
      // Inter-state: Full GST as IGST
      igst = gstAmount;
      cgst = 0;
      sgst = 0;
    } else {
      // Intra-state: Split GST as CGST and SGST (50% each)
      igst = 0;
      const halfGstAmount = gstAmount / 2;
      cgst = halfGstAmount;
      sgst = halfGstAmount; // Ensure SGST is exactly equal to CGST
    }
    
    const cess = Math.random() > 0.8 ? Math.floor(Math.random() * 1000) : 0;
    const invoiceValue = taxableValue + gstAmount + cess;
    
    return {
      id: index + 1,
      gstin: `27AABCT${String(index + 1).padStart(4, '0')}1Z5`,
      invoiceNo: `INV-${String(index + 1).padStart(6, '0')}`,
      invoiceDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      customerName: customerNames[index % customerNames.length],
      taxableValue: taxableValue.toLocaleString(),
      hsn: hsnCodes[index % hsnCodes.length],
      gstRate: `${gstRate}%`,
      igst: igst.toLocaleString(),
      cgst: cgst.toLocaleString(),
      sgst: sgst.toLocaleString(),
      invoiceValue: invoiceValue.toLocaleString()
    };
  });
};

export default function GSTPortalUpload() {
  const [data, setData] = useState<GSTInvoiceItem[]>([]);
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
  const fetchGSTInvoices = async (page: number = 1) => {
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
    fetchGSTInvoices();
  }, []);

  const handleUpload = () => {
    console.log('Upload to GST Portal functionality');
    console.log('Data to upload:', data);
    // Handle upload to GST Portal logic here
  };

  const handleView = (id: number) => {
    console.log('View GST invoice with id:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Edit GST invoice with id:', id);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    fetchGSTInvoices(page);
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
        description="Accounts Receivable - GST Portal Upload Management"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - GST Portal Upload" />
      
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              GST Portal Upload
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              View GST invoices for portal upload
            </p>
          </div>
          
          <Button
            onClick={handleUpload}
            size="md"
            variant="primary"
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            UPLOAD
          </Button>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[1200px]">
              <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    GSTIN
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Invoice No.
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Invoice Date
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
                    Taxable Value
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    HSN
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    GST Rate
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    IGST
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    CGST
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    SGST
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Invoice Value
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {loading ? (
                  <TableRow>
                    <TableCell className="px-5 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading GST invoices...</span>
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
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.gstin}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.invoiceNo}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.invoiceDate}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <div className="max-w-xs">
                          <span className="text-gray-800 text-theme-sm dark:text-white/90 leading-relaxed">
                            {item.customerName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                          ₹{item.taxableValue}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                          {item.hsn}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Badge size="sm" color="primary">
                          {item.gstRate}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className={`font-semibold text-theme-sm ${
                          item.igst !== '0' 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-400'
                        }`}>
                          ₹{item.igst}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className={`font-semibold text-theme-sm ${
                          item.cgst !== '0' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-400'
                        }`}>
                          ₹{item.cgst}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className={`font-semibold text-theme-sm ${
                          item.sgst !== '0' 
                            ? 'text-purple-600 dark:text-purple-400' 
                            : 'text-gray-400'
                        }`}>
                          ₹{item.sgst}
                        </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-bold text-gray-900 text-theme-sm dark:text-white">
                          ₹{item.invoiceValue}
                        </span>
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
                        <p className="text-lg font-medium">No GST invoices found</p>
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
                    <TableCell className="px-5 py-8">{null}</TableCell>
                    <TableCell className="px-5 py-8">{null}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
          </div>
        </div>

        {/* Pagination Section */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Pagination Info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
              {pagination.totalItems} GST invoices
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