import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
    path: "/",
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "User Profile",
  //   path: "/profile",
  // },
  // {
  //   name: "Forms",
  //   icon: <ListIcon />,
  //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  // },
  // {
  //   name: "Tables",
  //   icon: <TableIcon />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  // },
  // {
  //   name: "Pages",
  //   icon: <PageIcon />,
  //   subItems: [
  //     { name: "Blank Page", path: "/blank", pro: false },
  //     { name: "404 Error", path: "/error-404", pro: false },
  //   ],
  // },
];

const othersItems: NavItem[] = [
  {
    name: "Accounts Receivable",
    icon: <ListIcon />,
    subItems: [
      { name: "Contracts", path: "/services/accounts-receivable/completed-contracts" },
      { name: "Invoices", path: "/services/accounts-receivable/completed-invoices" },
      { name: "Debit/Credit Notes", path: "/services/accounts-receivable/completed-debit-credit-notes" },
      { name: "Unbilled Revenue", path: "/services/accounts-receivable/completed-unbilled-revenue" },
      { name: "Deferred Revenue", path: "/services/accounts-receivable/deferred-revenue" },
      { name: "Invoice Accounting", path: "/services/accounts-receivable/invoice-accounting" },
      // { name: "Receipts", path: "/services/accounts-receivable/receipts" },
      { name: "GST Portal Upload", path: "/services/accounts-receivable/gst-portal-upload" },
      // { name: "Tax Validations", path: "/services/accounts-receivable/tax-validations" },
      { name: "Exception Reporting", path: "/services/accounts-receivable/exception-reporting" },
      { name: "Revenue Dashboard", path: "/services/accounts-receivable/revenue-dashboard" },
    ],
  },
  {
    name: "Accounts Payable",
    icon: <ListIcon />,
    subItems: [
      { name: "Contracts/Bills Payable", path: "/services/accounts-payable/contracts-bills-payable" },
      { name: "Debit/Credit Notes", path: "/services/accounts-payable/debit-credit-notes" },
      { name: "Payables Accounting", path: "/services/accounts-payable/payables-accounting" },
      { name: "3 way Matching", path: "/services/accounts-payable/3-way-matching" },
      { name: "Exceptions", path: "/services/accounts-payable/exceptions" },
      { name: "Payment Generation", path: "/services/accounts-payable/payment-generation" },
      { name: "Payment Accounting", path: "/services/accounts-payable/payment-accounting" },
      { name: "Followups", path: "/services/accounts-payable/followups" },
      { name: "Payables Analytics", path: "/services/accounts-payable/payables-analytics" },
    ],
  },
  {
    name: "Cash Management",
    icon: <ListIcon />,
    subItems: [
      { name: "Bank Statement", path: "/services/cash-management/bank-statement" },
      { name: "Payments", path: "/services/cash-management/payments" },
      { name: "Cash Flow", path: "/services/cash-management/cash-flow" }
    ],
  },
  {
    name: "Inventory Management",
    icon: <ListIcon />,
    subItems: [
    ],
  },
  {
    name: "Payroll",
    icon: <ListIcon />,
    subItems: [
      { name: "HRMS Data Analytics", path: "/services/payroll/hrms-data-analytics" },
      { name: "HRMS Amendments", path: "/services/payroll/hrms-amendments" },
      { name: "Payroll Accounting", path: "/services/payroll/payroll-accounting" },
      { name: "Payroll Compliances", path: "/services/payroll/payroll-compliances" },
      { name: "Payroll Analytics", path: "/services/payroll/payroll-analytics" },
    ],
  },
  {
    name: "Compliances",
    icon: <ListIcon />,
    subItems: [
      { name: "Compliances Calendar", path: "/services/compliances/compliances-calendar" },
      { name: "Compliances Team", path: "/services/compliances/compliances-team" },
      { name: "Tracker", path: "/services/compliances/tracker" },
      { name: "Exceptions", path: "/services/compliances/exceptions" },
      { name: "Non Compliance", path: "/services/compliances/non-compliance" },
      { name: "Report", path: "/services/compliances/report" },
      { name: "Compliances Analytics", path: "/services/compliances/compliances-analytics" },
    ],
  },
  {
    name: "Financial Statements",
    icon: <ListIcon />,
    subItems: [
      { name: "Accounting System", path: "/services/financial-statements/accounting-system" },
      { name: "Additional Inputs", path: "/services/financial-statements/additional-inputs" },
      { name: "Provisions", path: "/services/financial-statements/provisions" },
      { name: "Deferred Income", path: "/services/financial-statements/deferred-income" },
      { name: "Adjustments", path: "/services/financial-statements/adjustments" },
      { name: "Journal Entries", path: "/services/financial-statements/journal-entries" },
      { name: "Generate Financials", path: "/services/financial-statements/generate-financials" },
      { name: "Intra-Company Analysis", path: "/services/financial-statements/intra-company-analysis" },
      { name: "Industry Analysis", path: "/services/financial-statements/industry-analysis" },
    ],
  },
  {
    name: "Budgets",
    icon: <ListIcon />,
    subItems: [
      { name: "Objectives, Assumptions & Targets", path: "/services/budgets/objectives-assumptions-targets" },
      { name: "Review past performance", path: "/services/budgets/review-past-performance" },
      { name: "Income Identification", path: "/services/budgets/income-identification" },
      { name: "Expense Identification", path: "/services/budgets/expense-identification" },
      { name: "Income & Expense Analysis", path: "/services/budgets/income-expense-analysis" },
      { name: "Generate Budget", path: "/services/budgets/generate-budget" },
      { name: "Responsibility Mapping", path: "/services/budgets/responsibility-mapping" },
      { name: "Review & Monitor", path: "/services/budgets/review-monitor" },
      { name: "Budget Analytics", path: "/services/budgets/budget-analytics" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo_new.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark_new.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon_new.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Services"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
      {/* Copyright at the bottom */}
      <div className="mt-auto py-4 text-center text-xs text-gray-400">
        &copy; 2015 Script Infinite | All rights reserved.
      </div>
    </aside>
  );
};

export default AppSidebar;
