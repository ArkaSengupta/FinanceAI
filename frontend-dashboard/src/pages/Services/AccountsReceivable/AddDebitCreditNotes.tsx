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
  rate: string;
  quantity: string;
  taxableValue: string;
  hsnSac: string;
  igstRate: string;
  cgstRate: string;
  sgstRate: string;
  igstAmount: string;
  cgstAmount: string;
  sgstAmount: string;
  noteAmount: string;
}

interface DebitCreditNoteFormData {
  noteDate: string;
  customerName: string;
  dueDate: string;
  noteType: string;
  reason: string;
  referenceInvoiceNumber: string;
  lineItems: LineItem[];
}

export default function AddDebitCreditNotes() {
  const navigate = useNavigate();
  
  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  const [formData, setFormData] = useState<DebitCreditNoteFormData>({
    noteDate: getCurrentDate(),
    customerName: '',
    dueDate: '',
    noteType: '',
    reason: '',
    referenceInvoiceNumber: '',
    lineItems: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the current line item being edited
  const [currentLineItem, setCurrentLineItem] = useState<LineItem>({
    id: '',
    serviceDesc: '',
    serviceStartDate: '',
    serviceEndDate: '',
    rate: '',
    quantity: '',
    taxableValue: '',
    hsnSac: '',
    igstRate: '',
    cgstRate: '',
    sgstRate: '',
    igstAmount: '',
    cgstAmount: '',
    sgstAmount: '',
    noteAmount: ''
  });

  // Customer options
  const customerOptions = [
    { value: "customer1", label: "ABC Corporation" },
    { value: "customer2", label: "XYZ Industries" },
    { value: "customer3", label: "Tech Solutions Ltd" },
    { value: "customer4", label: "Global Enterprises" },
    { value: "customer5", label: "Innovation Labs" }
  ];

  // Note type options
  const noteTypeOptions = [
    { value: "debit", label: "Debit Note" },
    { value: "credit", label: "Credit Note" }
  ];

  // Reason options
  const reasonOptions = [
    { value: "price_adjustment", label: "Price Adjustment" },
    { value: "quantity_correction", label: "Quantity Correction" },
    { value: "service_cancellation", label: "Service Cancellation" },
    { value: "tax_correction", label: "Tax Correction" },
    { value: "discount", label: "Discount" },
    { value: "other", label: "Other" }
  ];

  // Service description options with HSN/SAC, Rate, and Tax mapping
  const serviceOptions = [
    { value: "web_development", label: "Web Development Services", hsnSac: "998314", rate: "5000", igst: "18", cgst: "9", sgst: "9" },
    { value: "consulting", label: "Business Consulting", hsnSac: "998315", rate: "3000", igst: "18", cgst: "9", sgst: "9" },
    { value: "maintenance", label: "Software Maintenance", hsnSac: "998316", rate: "2000", igst: "18", cgst: "9", sgst: "9" },
    { value: "training", label: "Training Services", hsnSac: "998317", rate: "1500", igst: "18", cgst: "9", sgst: "9" },
    { value: "support", label: "Technical Support", hsnSac: "998318", rate: "1000", igst: "18", cgst: "9", sgst: "9" },
    { value: "design", label: "UI/UX Design", hsnSac: "998319", rate: "2500", igst: "18", cgst: "9", sgst: "9" },
    { value: "testing", label: "Software Testing", hsnSac: "998320", rate: "1800", igst: "18", cgst: "9", sgst: "9" },
    { value: "hosting", label: "Cloud Hosting", hsnSac: "998321", rate: "800", igst: "18", cgst: "9", sgst: "9" }
  ];

  const handleInputChange = (field: keyof DebitCreditNoteFormData, value: string) => {
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
      rate: currentLineItem.rate,
      quantity: currentLineItem.quantity,
      taxableValue: currentLineItem.taxableValue,
      hsnSac: currentLineItem.hsnSac,
      igstRate: currentLineItem.igstRate,
      cgstRate: currentLineItem.cgstRate,
      sgstRate: currentLineItem.sgstRate,
      igstAmount: currentLineItem.igstAmount,
      cgstAmount: currentLineItem.cgstAmount,
      sgstAmount: currentLineItem.sgstAmount,
      noteAmount: currentLineItem.noteAmount
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
      rate: '',
      quantity: '',
      taxableValue: '',
      hsnSac: '',
      igstRate: '',
      cgstRate: '',
      sgstRate: '',
      igstAmount: '',
      cgstAmount: '',
      sgstAmount: '',
      noteAmount: ''
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
          
          // Auto-populate HSN/SAC, Rate, and Tax rates based on service description
          if (field === 'serviceDesc') {
            const selectedService = serviceOptions.find(service => service.value === value);
            if (selectedService) {
              updatedItem.hsnSac = selectedService.hsnSac;
              updatedItem.rate = selectedService.rate;
              updatedItem.igstRate = selectedService.igst;
              updatedItem.cgstRate = selectedService.cgst;
              updatedItem.sgstRate = selectedService.sgst;
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
      
      console.log('Debit/Credit Note data submitted for approval:', formData);
      
      // Navigate back to notes list
      navigate('/services/accounts-receivable/completed-debit-credit-notes');
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Debit/Credit Note saved as draft:', formData);
      
      // Navigate back to notes list
      navigate('/services/accounts-receivable/draft-debit-credit-notes');
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/services/accounts-receivable/completed-debit-credit-notes');
  };

  // Calculate amounts when quantity or rate changes
  const calculateAmounts = (quantity: string, rate: string, igstRate: string, cgstRate: string, sgstRate: string) => {
    const qty = parseFloat(quantity) || 0;
    const rateValue = parseFloat(rate) || 0;
    const igstRateValue = parseFloat(igstRate) || 0;
    const cgstRateValue = parseFloat(cgstRate) || 0;
    const sgstRateValue = parseFloat(sgstRate) || 0;
    
    const taxableValue = qty * rateValue;
    const igstAmount = (taxableValue * igstRateValue) / 100;
    const cgstAmount = (taxableValue * cgstRateValue) / 100;
    const sgstAmount = (taxableValue * sgstRateValue) / 100;
    const noteAmount = taxableValue + igstAmount + cgstAmount + sgstAmount;
    
    return {
      taxableValue: taxableValue.toFixed(2),
      igstAmount: igstAmount.toFixed(2),
      cgstAmount: cgstAmount.toFixed(2),
      sgstAmount: sgstAmount.toFixed(2),
      noteAmount: noteAmount.toFixed(2)
    };
  };

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Accounts Receivable - Add New Debit/Credit Note"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Add New Debit/Credit Note" />
      
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1000px]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Add New Debit/Credit Note
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create a new debit or credit note for your client
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="space-y-6">
            {/* Note Header */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Note Details
              </h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="noteDate">Note Date *</Label>
                  <DatePicker
                    id="noteDate"
                    label=""
                    placeholder="Select note date"
                    onChange={(dates, currentDateString) => {
                      // Only allow dates from today onwards
                      const selectedDate = new Date(currentDateString);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      if (selectedDate >= today) {
                        handleInputChange('noteDate', currentDateString);
                      } else {
                        alert('Note date cannot be backdated. Please select today or a future date.');
                      }
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

                <div>
                  <Label htmlFor="noteType">Note Type *</Label>
                  <Select
                    options={noteTypeOptions}
                    placeholder="Select note type"
                    defaultValue={formData.noteType}
                    onChange={(value) => handleInputChange('noteType', value)}
                    className="dark:bg-gray-900"
                  />
                </div>

                <div>
                  <Label htmlFor="reason">Reason *</Label>
                  <Select
                    options={reasonOptions}
                    placeholder="Select reason"
                    defaultValue={formData.reason}
                    onChange={(value) => handleInputChange('reason', value)}
                    className="dark:bg-gray-900"
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <DatePicker
                    id="dueDate"
                    label=""
                    placeholder="Select due date"
                    onChange={(dates, currentDateString) => {
                      handleInputChange('dueDate', currentDateString);
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="referenceInvoiceNumber">Reference Invoice Number *</Label>
                  <Input
                    type="text"
                    placeholder="Enter reference invoice number"
                    value={formData.referenceInvoiceNumber}
                    onChange={(e) => handleInputChange('referenceInvoiceNumber', e.target.value)}
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
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Service Description */}
                  <div>
                    <Label>Service Description *</Label>
                    <Select
                      options={serviceOptions}
                      placeholder="Select service"
                      defaultValue={currentLineItem.serviceDesc}
                      onChange={(value) => {
                        const selectedService = serviceOptions.find(s => s.value === value);
                        const amounts = calculateAmounts(
                          currentLineItem.quantity, 
                          selectedService?.rate || '0',
                          selectedService?.igst || '0',
                          selectedService?.cgst || '0',
                          selectedService?.sgst || '0'
                        );
                        setCurrentLineItem(prev => ({
                          ...prev,
                          serviceDesc: value,
                          rate: selectedService?.rate || '',
                          hsnSac: selectedService?.hsnSac || '',
                          igstRate: selectedService?.igst || '',
                          cgstRate: selectedService?.cgst || '',
                          sgstRate: selectedService?.sgst || '',
                          taxableValue: amounts.taxableValue,
                          igstAmount: amounts.igstAmount,
                          cgstAmount: amounts.cgstAmount,
                          sgstAmount: amounts.sgstAmount,
                          noteAmount: amounts.noteAmount
                        }));
                      }}
                      className="dark:bg-gray-800"
                    />
                  </div>

                  {/* Service Start Date */}
                  <div>
                    <Label>Service Start Date *</Label>
                    <DatePicker
                      id="serviceStartDate"
                      label=""
                      placeholder="Select start date"
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
                      id="serviceEndDate"
                      label=""
                      placeholder="Select end date"
                      onChange={(dates, currentDateString) => {
                        setCurrentLineItem(prev => ({
                          ...prev,
                          serviceEndDate: currentDateString
                        }));
                      }}
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
                        const amounts = calculateAmounts(
                          currentLineItem.quantity, 
                          e.target.value, 
                          currentLineItem.igstRate,
                          currentLineItem.cgstRate,
                          currentLineItem.sgstRate
                        );
                        setCurrentLineItem(prev => ({
                          ...prev,
                          rate: e.target.value,
                          taxableValue: amounts.taxableValue,
                          igstAmount: amounts.igstAmount,
                          cgstAmount: amounts.cgstAmount,
                          sgstAmount: amounts.sgstAmount,
                          noteAmount: amounts.noteAmount
                        }));
                      }}
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      value={currentLineItem.quantity}
                      onChange={(e) => {
                        const amounts = calculateAmounts(
                          e.target.value, 
                          currentLineItem.rate, 
                          currentLineItem.igstRate,
                          currentLineItem.cgstRate,
                          currentLineItem.sgstRate
                        );
                        setCurrentLineItem(prev => ({
                          ...prev,
                          quantity: e.target.value,
                          taxableValue: amounts.taxableValue,
                          igstAmount: amounts.igstAmount,
                          cgstAmount: amounts.cgstAmount,
                          sgstAmount: amounts.sgstAmount,
                          noteAmount: amounts.noteAmount
                        }));
                      }}
                    />
                  </div>

                  {/* Taxable Value */}
                  <div>
                    <Label>Taxable Value</Label>
                    <Input
                      type="text"
                      placeholder="Calculated taxable value"
                      value={currentLineItem.taxableValue}
                      onChange={(e) => {
                        setCurrentLineItem(prev => ({
                          ...prev,
                          taxableValue: e.target.value
                        }));
                      }}
                      disabled
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

                  {/* IGST Amount */}
                  <div>
                    <Label>IGST Amount</Label>
                    <Input
                      type="text"
                      placeholder="IGST Amount"
                      value={currentLineItem.igstAmount}
                      onChange={(e) => {
                        setCurrentLineItem(prev => ({
                          ...prev,
                          igstAmount: e.target.value
                        }));
                      }}
                      disabled
                    />
                  </div>

                  {/* CGST Amount */}
                  <div>
                    <Label>CGST Amount</Label>
                    <Input
                      type="text"
                      placeholder="CGST Amount"
                      value={currentLineItem.cgstAmount}
                      onChange={(e) => {
                        setCurrentLineItem(prev => ({
                          ...prev,
                          cgstAmount: e.target.value
                        }));
                      }}
                      disabled
                    />
                  </div>

                  {/* SGST Amount */}
                  <div>
                    <Label>SGST Amount</Label>
                    <Input
                      type="text"
                      placeholder="SGST Amount"
                      value={currentLineItem.sgstAmount}
                      onChange={(e) => {
                        setCurrentLineItem(prev => ({
                          ...prev,
                          sgstAmount: e.target.value
                        }));
                      }}
                      disabled
                    />
                  </div>

                  {/* Note Amount */}
                  <div>
                    <Label>Note Amount</Label>
                    <Input
                      type="text"
                      placeholder="Total note amount"
                      value={currentLineItem.noteAmount}
                      onChange={(e) => {
                        setCurrentLineItem(prev => ({
                          ...prev,
                          noteAmount: e.target.value
                        }));
                      }}
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>* Fill in the line item details above and click "Add Line Item" to add it to the table. Rate, HSN/SAC, and tax rates will be auto-populated based on the selected service. Tax amounts will be calculated automatically.</p>
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
                            Service Start Date
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Service End Date
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
                            Quantity
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Taxable Value
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
                            IGST Amount
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            CGST Amount
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            SGST Amount
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Note Amount
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
                                {item.rate || 'Not set'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.quantity || 'Not set'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.taxableValue || 'Calculated'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.hsnSac || 'Auto-populated'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.igstAmount || 'Calculated'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.cgstAmount || 'Calculated'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.sgstAmount || 'Calculated'}
                              </span>
                            </TableCell>
                            <TableCell className="px-5 py-4 text-start">
                              <span className="text-gray-800 text-theme-sm dark:text-white/90">
                                {item.noteAmount || 'Calculated'}
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
