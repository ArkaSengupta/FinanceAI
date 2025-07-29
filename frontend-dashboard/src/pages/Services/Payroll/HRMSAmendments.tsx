import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";

export default function HRMSAmendments() {
  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Payroll - HRMS Amendments Service Page"
      />
      <PageBreadcrumb pageTitle="Payroll - HRMS Amendments" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <div className="flex items-center justify-between gap-5">
            <Button size="sm" variant="primary">
            View Amendment data
            </Button>
            <Button size="md" variant="primary">
            Upload Amendment data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 