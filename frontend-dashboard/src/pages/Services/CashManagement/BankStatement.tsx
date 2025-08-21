import React from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function BankStatement() {
  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Cash Management - Bank Statement"
      />
      <PageBreadcrumb pageTitle="Cash Management - Bank Statement" />
      
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Bank Statement
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              This Service is not supported
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The Bank Statement service is currently under development and will be available soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

