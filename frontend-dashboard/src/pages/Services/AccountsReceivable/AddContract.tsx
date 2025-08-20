import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import DatePicker from "../../../components/form/date-picker.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface LineItem {
  id: string;
  serviceDesc: string;
  serviceStartDate: string;
  serviceEndDate: string;
  deliveryFrequency: string;
  billingFrequency: string;
  rate: string;
  billingCurrency: string;
  hsnSac: string;
  igstRate: string;
}

interface ContractFormData {
  contractDate: string;
  customerName: string;
  lineItems: LineItem[];
}

export default function AddContract() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContractFormData>({
    contractDate: '',
    customerName: '',
    lineItems: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the current line item being edited
  const [currentLineItem, setCurrentLineItem] = useState<LineItem>({
    id: '',
    serviceDesc: '',
    serviceStartDate: '',
    serviceEndDate: '',
    deliveryFrequency: '',
    billingFrequency: '',
    rate: '',
    billingCurrency: '',
    hsnSac: '',
    igstRate: ''
  });

  // Customer options
  const customerOptions = [
    { value: "customer1", label: "ABC Corporation" },
    { value: "customer2", label: "XYZ Industries" },
    { value: "customer3", label: "Tech Solutions Ltd" },
    { value: "customer4", label: "Global Enterprises" },
    { value: "customer5", label: "Innovation Labs" }
  ];

  // Service description options with HSN/SAC and IGST mapping
  const serviceOptions = [
    { value: "web_development", label: "Web Development Services", hsnSac: "998314", igstRate: "18" },
    { value: "consulting", label: "Business Consulting", hsnSac: "998315", igstRate: "18" },
    { value: "maintenance", label: "Software Maintenance", hsnSac: "998316", igstRate: "18" },
    { value: "training", label: "Training Services", hsnSac: "998317", igstRate: "18" },
    { value: "support", label: "Technical Support", hsnSac: "998318", igstRate: "18" },
    { value: "design", label: "UI/UX Design", hsnSac: "998319", igstRate: "18" },
    { value: "testing", label: "Software Testing", hsnSac: "998320", igstRate: "18" },
    { value: "hosting", label: "Cloud Hosting", hsnSac: "998321", igstRate: "18" }
  ];

  const deliveryFrequencyOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" }
  ];

  const billingFrequencyOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" }
  ];

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CHF", label: "CHF - Swiss Franc" }
  ];

  const handleInputChange = (field: keyof ContractFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLineItem = () => {
    // Only add if service description is selected
    if (!currentLineItem.serviceDesc) {
      alert('Please select a service description first.');
      return;
    }

    const newLineItem: LineItem = {
      id: Date.now().toString(),
      serviceDesc: currentLineItem.serviceDesc,
      serviceStartDate: currentLineItem.serviceStartDate,
      serviceEndDate: currentLineItem.serviceEndDate,
      deliveryFrequency: currentLineItem.deliveryFrequency,
      billingFrequency: currentLineItem.billingFrequency,
      rate: currentLineItem.rate,
      billingCurrency: currentLineItem.billingCurrency,
      hsnSac: currentLineItem.hsnSac,
      igstRate: currentLineItem.igstRate
    };

    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newLineItem]
    }));

    // Reset the current line item form
    setCurrentLineItem({
      id: '',
      serviceDesc: '',
      serviceStartDate: '',
      serviceEndDate: '',
      deliveryFrequency: '',
      billingFrequency: '',
      rate: '',
      billingCurrency: '',
      hsnSac: '',
      igstRate: ''
    });
  };

  const removeLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Auto-populate HSN/SAC and IGST Rate based on service description
          if (field === 'serviceDesc') {
            const selectedService = serviceOptions.find(service => service.value === value);
            if (selectedService) {
              updatedItem.hsnSac = selectedService.hsnSac;
              updatedItem.igstRate = selectedService.igstRate;
            }
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contract data submitted for approval:', formData);
      
      // Navigate back to contracts list
      navigate('/services/accounts-receivable/completed-contracts');
    } catch (error) {
      console.error('Error submitting contract:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contract saved as draft:', formData);
      
      // Navigate back to contracts list
      navigate('/services/accounts-receivable/draft-contracts');
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/services/accounts-receivable/completed-contracts');
  };

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Accounts Receivable - Add New Contract"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Add New Contract" />
      
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1000px]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Add New Contract
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create a new contract for your client
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="space-y-6">
            {/* Contract Header */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Contract Details
              </h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="contractDate">Contract Date *</Label>
                  <DatePicker
                    id="contractDate"
                    label=""
                    placeholder="Select contract date"
                    onChange={(dates, currentDateString) => {
                      handleInputChange('contractDate', currentDateString);
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Select
                    options={customerOptions}
                    placeholder="Select customer"
                    defaultValue={formData.customerName}
                    onChange={(value) => handleInputChange('customerName', value)}
                    className="dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

                         {/* Line Items */}
             <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
               <div className="mb-4 flex items-center justify-between">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                   Line Items
                 </h3>
                 <Button
                   type="button"
                   onClick={addLineItem}
                   size="sm"
                   variant="primary"
                   className="flex items-center gap-2"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                   </svg>
                   Add Line Item
                 </Button>
               </div>

                               {/* Add Line Item Form */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                  <h4 className="mb-4 text-md font-semibold text-gray-900 dark:text-white">
                    Add New Line Item
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                         {/* Service Description */}
                     <div>
                       <Label>Service Description *</Label>
                       <Select
                         options={serviceOptions}
                         placeholder="Select service"
                         defaultValue={currentLineItem.serviceDesc}
                         onChange={(value) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             serviceDesc: value,
                             hsnSac: serviceOptions.find(s => s.value === value)?.hsnSac || '',
                             igstRate: serviceOptions.find(s => s.value === value)?.igstRate || ''
                           }));
                         }}
                         className="dark:bg-gray-800"
                       />
                     </div>

                                         {/* Service Start Date */}
                     <div>
                       <Label>Service Start Date *</Label>
                       <DatePicker
                         id="new-start-date"
                         label=""
                         placeholder="Start date"
                         onChange={(dates, currentDateString) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             serviceStartDate: currentDateString
                           }));
                         }}
                       />
                     </div>

                     {/* Service End Date */}
                     <div>
                       <Label>Service End Date *</Label>
                       <DatePicker
                         id="new-end-date"
                         label=""
                         placeholder="End date"
                         onChange={(dates, currentDateString) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             serviceEndDate: currentDateString
                           }));
                         }}
                       />
                     </div>

                     {/* Delivery Frequency */}
                     <div>
                       <Label>Delivery Frequency *</Label>
                       <Select
                         options={deliveryFrequencyOptions}
                         placeholder="Select frequency"
                         defaultValue={currentLineItem.deliveryFrequency}
                         onChange={(value) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             deliveryFrequency: value
                           }));
                         }}
                         className="dark:bg-gray-800"
                       />
                     </div>

                     {/* Billing Frequency */}
                     <div>
                       <Label>Billing Frequency *</Label>
                       <Select
                         options={billingFrequencyOptions}
                         placeholder="Select frequency"
                         defaultValue={currentLineItem.billingFrequency}
                         onChange={(value) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             billingFrequency: value
                           }));
                         }}
                         className="dark:bg-gray-800"
                       />
                     </div>

                     {/* Rate */}
                     <div>
                       <Label>Rate *</Label>
                       <Input
                         type="number"
                         placeholder="Enter rate"
                         value={currentLineItem.rate}
                         onChange={(e) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             rate: e.target.value
                           }));
                         }}
                       />
                     </div>

                     {/* Billing Currency */}
                     <div>
                       <Label>Billing Currency *</Label>
                       <Select
                         options={currencyOptions}
                         placeholder="Select currency"
                         defaultValue={currentLineItem.billingCurrency}
                         onChange={(value) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             billingCurrency: value
                           }));
                         }}
                         className="dark:bg-gray-800"
                       />
                     </div>

                     {/* HSN/SAC */}
                     <div>
                       <Label>HSN/SAC</Label>
                       <Input
                         type="text"
                         placeholder="HSN/SAC Code"
                         value={currentLineItem.hsnSac}
                         onChange={(e) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             hsnSac: e.target.value
                           }));
                         }}
                         disabled
                       />
                     </div>

                     {/* IGST Rate */}
                     <div>
                       <Label>IGST Rate (%)</Label>
                       <Input
                         type="text"
                         placeholder="IGST Rate"
                         value={currentLineItem.igstRate}
                         onChange={(e) => {
                           setCurrentLineItem(prev => ({
                             ...prev,
                             igstRate: e.target.value
                           }));
                         }}
                         disabled
                       />
                     </div>
                  </div>

                                     <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                     <p>* Fill in the line item details above and click "Add Line Item" to add it to the table. HSN/SAC and IGST Rate will be auto-populated based on the selected service.</p>
                   </div>
                </div>

                {/* Line Items Table */}
                {formData.lineItems.length > 0 && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                      <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                          <TableRow>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              #
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Service Description
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Start Date
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              End Date
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Delivery Freq.
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Billing Freq.
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Rate
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Currency
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              HSN/SAC
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              IGST Rate
                            </TableCell>
                            <TableCell
                              isHeader
                              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                          {formData.lineItems.map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                  {index + 1}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {serviceOptions.find(s => s.value === item.serviceDesc)?.label || 'Not selected'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {item.serviceStartDate || 'Not set'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {item.serviceEndDate || 'Not set'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {deliveryFrequencyOptions.find(f => f.value === item.deliveryFrequency)?.label || 'Not selected'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {billingFrequencyOptions.find(f => f.value === item.billingFrequency)?.label || 'Not selected'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {item.rate || 'Not set'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {currencyOptions.find(c => c.value === item.billingCurrency)?.label || 'Not selected'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {item.hsnSac || 'Auto-populated'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                  {item.igstRate ? `${item.igstRate}%` : 'Auto-populated'}
                                </span>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-start">
                                <Button
                                  type="button"
                                  onClick={() => removeLineItem(item.id)}
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {formData.lineItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <svg className="mx-auto h-12 w-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No line items added</p>
                    <p className="text-sm">Click "Add Line Item" to start adding services</p>
                  </div>
                )}
             </div>

                         {/* Action Buttons */}
             <div className="flex justify-end space-x-4 pt-6">
               <Button
                 type="button"
                 onClick={handleCancel}
                 size="md"
                 variant="outline"
                 className="min-w-[120px]"
                 disabled={isSubmitting}
               >
                 Cancel
               </Button>
               <Button
                 type="button"
                 onClick={handleSaveDraft}
                 size="md"
                 variant="outline"
                 className="min-w-[120px]"
                 disabled={isSubmitting}
               >
                 {isSubmitting ? 'Saving...' : 'Save as Draft'}
               </Button>
               <Button
                 type="submit"
                 size="md"
                 variant="primary"
                 className="min-w-[120px]"
                 disabled={isSubmitting || formData.lineItems.length === 0}
               >
                 {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
               </Button>
             </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
