import React, { useState } from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import DatePicker from "../../../components/form/date-picker.tsx";

export default function AccountingSystem() {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);
    // Handle form submission logic here
  };

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="IndAS FS - Accounting System Service Page"
      />
      <PageBreadcrumb pageTitle="IndAS FS - Accounting System" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Generate Trial Balance
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Configure and generate trial balance reports
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* From Date */}
              <div>
                <Label htmlFor="from-date">Select From Date</Label>
                <DatePicker
                  id="from-date"
                  label=""
                  placeholder="Select from date"
                  onChange={(dates, currentDateString) => {
                    handleInputChange('fromDate', currentDateString);
                  }}
                />
              </div>

              {/* To Date */}
              <div>
                <Label htmlFor="to-date">Select To Date</Label>
                <DatePicker
                  id="to-date"
                  label=""
                  placeholder="Select to date"
                  onChange={(dates, currentDateString) => {
                    handleInputChange('toDate', currentDateString);
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                size="md" 
                variant="primary"
                className="min-w-[200px]"
              >
                Generate Trial Balance
              </Button>
            </div>
          </Form>

          {/* Form Data Display (for debugging) */}
          {/* <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Form Data (Development Only):
            </h3>
            <pre className="text-xs text-gray-600 dark:text-gray-400">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div> */}
        </div>
      </div>
    </div>
  );
} 