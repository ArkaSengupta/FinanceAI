import React from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function CashFlow() {
  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Cash Management - Cash Flow"
      />
      <PageBreadcrumb pageTitle="Cash Management - Cash Flow" />
      
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="text-center py-16">
            <div className="mb-6">
              <svg 
                className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cash Flow
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              This Service is not supported
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The Cash Flow service is currently under development and will be available soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

