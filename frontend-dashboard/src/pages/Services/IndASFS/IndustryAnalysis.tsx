import React, { useState } from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import DatePicker from "../../../components/form/date-picker.tsx";

export default function IndustryAnalysis() {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reportType: '',
    reportFormat: ''
  });

  const reportTypeOptions = [
    { value: "chart", label: "Chart" },
    { value: "drill-down", label: "Drill Down" },
    { value: "trend", label: "Trend" }
  ];

  const reportFormatOptions = [
    { value: "view", label: "View" },
    { value: "excel", label: "Excel" },
    { value: "pdf", label: "PDF" }
  ];

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
        description="IndAS FS - Industry Analysis Service Page"
      />
      <PageBreadcrumb pageTitle="IndAS FS - Industry Analysis" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Generate Industry Analytics
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Configure and generate industry analysis reports
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Report Type */}
              <div>
                <Label htmlFor="report-type">Select Report Type</Label>
                <Select
                  options={reportTypeOptions}
                  placeholder="Select report type"
                  onChange={(value) => handleInputChange('reportType', value)}
                  className="dark:bg-gray-900"
                />
              </div>

              {/* Report Format */}
              <div>
                <Label htmlFor="report-format">Select Report Format</Label>
                <Select
                  options={reportFormatOptions}
                  placeholder="Select report format"
                  onChange={(value) => handleInputChange('reportFormat', value)}
                  className="dark:bg-gray-900"
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
                Generate Industry Analytics
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