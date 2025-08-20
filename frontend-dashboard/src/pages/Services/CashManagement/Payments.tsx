import React from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Payments() {
  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Cash Management - Payments"
      />
      <PageBreadcrumb pageTitle="Cash Management - Payments" />
      
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
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Payments
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              This Service is not supported
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The Payments service is currently under development and will be available soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
