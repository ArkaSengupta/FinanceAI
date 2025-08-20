import React, { useState } from 'react';
import { pageMetaTitle } from "../../../components/common/pageMetaVars";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import DatePicker from "../../../components/form/date-picker.tsx";
import Select from "../../../components/form/Select";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function RevenueDashboard() {
  const [dateRanges, setDateRanges] = useState({
    revenueTrend: { from: '', to: '' },
    revenueComposition: { from: '', to: '' },
    clientwiseRevenue: { from: '', to: '' },
    servicewiseRevenue: { from: '', to: '' }
  });

  const [periods, setPeriods] = useState({
    revenueTrend: 'month',
    clientwiseRevenue: 'month',
    servicewiseRevenue: 'month'
  });

  const [revenueBy, setRevenueBy] = useState('clients');

  const periodOptions = [
    { value: "month", label: "Month" },
    { value: "year", label: "Year" }
  ];

  const revenueByOptions = [
    { value: "clients", label: "Clients" },
    { value: "industry", label: "Industry" },
    { value: "service", label: "Service" },
    { value: "location", label: "Location" }
  ];

  const handleDateChange = (chartName: string, field: 'from' | 'to', value: string) => {
    setDateRanges(prev => ({
      ...prev,
      [chartName]: {
        ...prev[chartName as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handlePeriodChange = (chartName: string, value: string) => {
    setPeriods(prev => ({
      ...prev,
      [chartName]: value
    }));
  };

  const handleRevenueByChange = (value: string) => {
    setRevenueBy(value);
  };

  // Bar Chart Options (for Revenue Trend, Clientwise Revenue, Servicewise Revenue)
  const getBarChartOptions = (period: string): ApexOptions => {
    const monthCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const yearCategories = ["2019", "2020", "2021", "2022", "2023", "2024"];
    
    return {
      colors: ["#465fff"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "bar",
        height: 200,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: period === 'month' ? monthCategories : yearCategories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          formatter: (val: number) => `${val}`,
        },
      },
    };
  };

  // Pie Chart Options (for Revenue Composition)
  const pieChartOptions: ApexOptions = {
    colors: ["#465fff", "#9CB9FF", "#FF6B6B", "#4ECDC4"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      height: 200,
    },
    labels: ["Services", "Products", "Consulting", "Support"],
    legend: {
      position: "bottom",
      fontSize: "12px",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
    },
  };

  // Bar Chart Series with different data for month and year
  const getBarChartSeries = (period: string, chartType: string) => {
    const monthData = {
      revenueTrend: [168, 385, 201, 298, 187, 195, 245, 312, 278, 189, 234, 267],
      clientwiseRevenue: [45, 67, 89, 123, 78, 92, 156, 134, 98, 112, 145, 167],
      servicewiseRevenue: [234, 189, 267, 312, 245, 278, 198, 223, 289, 256, 234, 298]
    };

    const yearData = {
      revenueTrend: [2019, 2020, 2021, 2022, 2023, 2024],
      clientwiseRevenue: [2019, 2020, 2021, 2022, 2023, 2024],
      servicewiseRevenue: [2019, 2020, 2021, 2022, 2023, 2024]
    };

    const data = period === 'month' ? monthData[chartType as keyof typeof monthData] : yearData[chartType as keyof typeof yearData];
    
    return [
      {
        name: "Revenue",
        data: data,
      },
    ];
  };

  const pieChartSeries = [35, 25, 25, 15];

  return (
    <div>
      <PageMeta
        title={pageMetaTitle}
        description="Accounts Receivable - Revenue Dashboard Service Page"
      />
      <PageBreadcrumb pageTitle="Accounts Receivable - Revenue Dashboard" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Revenue Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Comprehensive revenue analytics and insights
            </p>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Revenue Trend - Bar Chart */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Trend
                </h3>
                <div className="flex items-center space-x-2">
                  <Select
                    options={periodOptions}
                    placeholder="Period"
                    defaultValue={periods.revenueTrend}
                    onChange={(value) => handlePeriodChange('revenueTrend', value)}
                    className="w-24 dark:bg-gray-900"
                  />
                  <DatePicker
                    id="revenue-trend-from"
                    label=""
                    placeholder="From"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('revenueTrend', 'from', currentDateString);
                    }}
                  />
                  <DatePicker
                    id="revenue-trend-to"
                    label=""
                    placeholder="To"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('revenueTrend', 'to', currentDateString);
                    }}
                  />
                </div>
              </div>
              <div className="h-[200px]">
                <Chart 
                  options={getBarChartOptions(periods.revenueTrend)} 
                  series={getBarChartSeries(periods.revenueTrend, 'revenueTrend')} 
                  type="bar" 
                  height={200} 
                />
              </div>
            </div>

            {/* Revenue Composition - Pie Chart */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Composition
                </h3>
                <div className="flex items-center space-x-2">
                  <Select
                    options={revenueByOptions}
                    placeholder="Revenue By"
                    defaultValue={revenueBy}
                    onChange={(value) => handleRevenueByChange(value)}
                    className="w-32 dark:bg-gray-900"
                  />
                  <DatePicker
                    id="revenue-composition-from"
                    label=""
                    placeholder="From"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('revenueComposition', 'from', currentDateString);
                    }}
                  />
                  <DatePicker
                    id="revenue-composition-to"
                    label=""
                    placeholder="To"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('revenueComposition', 'to', currentDateString);
                    }}
                  />
                </div>
              </div>
              <div className="h-[200px]">
                <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={200} />
              </div>
            </div>

            {/* Clientwise Revenue - Bar Chart */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Clientwise Revenue
                </h3>
                <div className="flex items-center space-x-2">
                  <Select
                    options={periodOptions}
                    placeholder="Period"
                    defaultValue={periods.clientwiseRevenue}
                    onChange={(value) => handlePeriodChange('clientwiseRevenue', value)}
                    className="w-24 dark:bg-gray-900"
                  />
                  <DatePicker
                    id="clientwise-revenue-from"
                    label=""
                    placeholder="From"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('clientwiseRevenue', 'from', currentDateString);
                    }}
                  />
                  <DatePicker
                    id="clientwise-revenue-to"
                    label=""
                    placeholder="To"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('clientwiseRevenue', 'to', currentDateString);
                    }}
                  />
                </div>
              </div>
              <div className="h-[200px]">
                <Chart 
                  options={getBarChartOptions(periods.clientwiseRevenue)} 
                  series={getBarChartSeries(periods.clientwiseRevenue, 'clientwiseRevenue')} 
                  type="bar" 
                  height={200} 
                />
              </div>
            </div>

            {/* Servicewise Revenue - Bar Chart */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Servicewise Revenue
                </h3>
                <div className="flex items-center space-x-2">
                  <Select
                    options={periodOptions}
                    placeholder="Period"
                    defaultValue={periods.servicewiseRevenue}
                    onChange={(value) => handlePeriodChange('servicewiseRevenue', value)}
                    className="w-24 dark:bg-gray-900"
                  />
                  <DatePicker
                    id="servicewise-revenue-from"
                    label=""
                    placeholder="From"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('servicewiseRevenue', 'from', currentDateString);
                    }}
                  />
                  <DatePicker
                    id="servicewise-revenue-to"
                    label=""
                    placeholder="To"
                    onChange={(dates, currentDateString) => {
                      handleDateChange('servicewiseRevenue', 'to', currentDateString);
                    }}
                  />
                </div>
              </div>
              <div className="h-[200px]">
                <Chart 
                  options={getBarChartOptions(periods.servicewiseRevenue)} 
                  series={getBarChartSeries(periods.servicewiseRevenue, 'servicewiseRevenue')} 
                  type="bar" 
                  height={200} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
