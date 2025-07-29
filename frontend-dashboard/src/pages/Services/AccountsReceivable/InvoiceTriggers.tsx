import React from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";

export default function InvoiceTriggers() {
  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Accounts Receivable - Invoice Triggers Service Page"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Invoice Triggers" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          
          <div className="mt-6 flex items-center justify-center gap-5">
            <Button size="md" variant="primary">
              Validate invoice triggers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 