import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";

export default function DeferredIncome() {
  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="IndAS FS - Deferred Income Service Page"
      />
      <PageBreadcrumb pageTitle="IndAS FS - Deferred Income" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          
          <div className="mt-6 flex items-center justify-between gap-5">
            <Button size="md" variant="primary">
              Enter Deferred Income
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 