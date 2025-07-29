import React, { useState } from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import DatePicker from "../../../components/form/date-picker.tsx";

export default function PayrollCompliances() {
  const [ptaxFormData, setPtaxFormData] = useState({
    fromDate: '',
    toDate: '',
    inputFile: null as File | null
  });

  const [esiFormData, setEsiFormData] = useState({
    fromDate: '',
    toDate: '',
    inputFile: null as File | null
  });

  const handlePtaxInputChange = (field: string, value: string | File | null) => {
    setPtaxFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEsiInputChange = (field: string, value: string | File | null) => {
    setEsiFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePtaxSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('P.Tax form submitted with data:', ptaxFormData);
    // Handle form submission logic here
  };

  const handleEsiSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('ESI form submitted with data:', esiFormData);
    // Handle form submission logic here
  };

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Payroll - Payroll Compliances Service Page"
      />
      <PageBreadcrumb pageTitle="Payroll - Payroll Compliances" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1200px]">
          
          {/* P.Tax Form */}
          <div className="mb-12">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generate P.Tax
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Configure and generate P.Tax reports
              </p>
            </div>

            <Form onSubmit={handlePtaxSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* From Date */}
                <div>
                  <Label htmlFor="ptax-from-date">Select From Date</Label>
                  <DatePicker
                    id="ptax-from-date"
                    label=""
                    placeholder="Select from date"
                    onChange={(dates, currentDateString) => {
                      handlePtaxInputChange('fromDate', currentDateString);
                    }}
                  />
                </div>

                {/* To Date */}
                <div>
                  <Label htmlFor="ptax-to-date">Select To Date</Label>
                  <DatePicker
                    id="ptax-to-date"
                    label=""
                    placeholder="Select to date"
                    onChange={(dates, currentDateString) => {
                      handlePtaxInputChange('toDate', currentDateString);
                    }}
                  />
                </div>
              </div>

              {/* Input File */}
              <div>
                <Label htmlFor="ptax-input-file">Input file</Label>
                <Input
                  type="file"
                  id="ptax-input-file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handlePtaxInputChange('inputFile', file);
                  }}
                  className="dark:bg-gray-900"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="md" 
                  variant="primary"
                  className="min-w-[200px]"
                >
                  Generate P.Tax
                </Button>
              </div>
            </Form>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-gray-200 dark:border-gray-700"></div>

          {/* ESI Form */}
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generate ESI
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Configure and generate ESI reports
              </p>
            </div>

            <Form onSubmit={handleEsiSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* From Date */}
                <div>
                  <Label htmlFor="esi-from-date">Select From Date</Label>
                  <DatePicker
                    id="esi-from-date"
                    label=""
                    placeholder="Select from date"
                    onChange={(dates, currentDateString) => {
                      handleEsiInputChange('fromDate', currentDateString);
                    }}
                  />
                </div>

                {/* To Date */}
                <div>
                  <Label htmlFor="esi-to-date">Select To Date</Label>
                  <DatePicker
                    id="esi-to-date"
                    label=""
                    placeholder="Select to date"
                    onChange={(dates, currentDateString) => {
                      handleEsiInputChange('toDate', currentDateString);
                    }}
                  />
                </div>
              </div>

              {/* Input File */}
              <div>
                <Label htmlFor="esi-input-file">Input file</Label>
                <Input
                  type="file"
                  id="esi-input-file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleEsiInputChange('inputFile', file);
                  }}
                  className="dark:bg-gray-900"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="md" 
                  variant="primary"
                  className="min-w-[200px]"
                >
                  Generate ESI
                </Button>
              </div>
            </Form>
          </div>

          {/* Form Data Display (for debugging) */}
          {/* <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Form Data (Development Only):
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400">P.Tax Form:</h4>
                <pre className="text-xs text-gray-600 dark:text-gray-400">
                  {JSON.stringify(ptaxFormData, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400">ESI Form:</h4>
                <pre className="text-xs text-gray-600 dark:text-gray-400">
                  {JSON.stringify(esiFormData, null, 2)}
                </pre>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
} 