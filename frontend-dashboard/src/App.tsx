import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CompletedContracts from "./pages/Services/AccountsReceivable/CompletedContracts";
import DraftContracts from "./pages/Services/AccountsReceivable/DraftContracts";
import PendingApprovalContracts from "./pages/Services/AccountsReceivable/PendingApprovalContracts";
import AddContract from "./pages/Services/AccountsReceivable/AddContract";
import AddInvoice from "./pages/Services/AccountsReceivable/AddInvoice";
import AddUnbilledRevenue from "./pages/Services/AccountsReceivable/AddUnbilledRevenue";
import AddDebitCreditNotes from "./pages/Services/AccountsReceivable/AddDebitCreditNotes";
import CompletedInvoices from "./pages/Services/AccountsReceivable/CompletedInvoices";
import DraftInvoices from "./pages/Services/AccountsReceivable/DraftInvoices";
import PendingApprovalInvoices from "./pages/Services/AccountsReceivable/PendingApprovalInvoices";
import CompletedUnbilledRevenue from "./pages/Services/AccountsReceivable/CompletedUnbilledRevenue";
import DraftUnbilledRevenue from "./pages/Services/AccountsReceivable/DraftUnbilledRevenue";
import PendingApprovalUnbilledRevenue from "./pages/Services/AccountsReceivable/PendingApprovalUnbilledRevenue";
import CompletedDebitCreditNotes from "./pages/Services/AccountsReceivable/CompletedDebitCreditNotes";
import DraftDebitCreditNotes from "./pages/Services/AccountsReceivable/DraftDebitCreditNotes";
import PendingApprovalDebitCreditNotes from "./pages/Services/AccountsReceivable/PendingApprovalDebitCreditNotes";
import InvoiceTriggers from "./pages/Services/AccountsReceivable/InvoiceTriggers";
import DebitCreditNotes from "./pages/Services/AccountsReceivable/DebitCreditNotes";
import InvoiceGeneration from "./pages/Services/AccountsReceivable/InvoiceGeneration";
import InvoiceAccounting from "./pages/Services/AccountsReceivable/InvoiceAccounting";
import GSTPortalUpload from "./pages/Services/AccountsReceivable/GSTPortalUpload";
import TaxValidations from "./pages/Services/AccountsReceivable/TaxValidations";
import ExceptionReporting from "./pages/Services/AccountsReceivable/ExceptionReporting";
import RevenueDashboard from "./pages/Services/AccountsReceivable/RevenueDashboard";
import Receipts from "./pages/Services/AccountsReceivable/Receipts";
import UnbilledRevenue from "./pages/Services/AccountsReceivable/UnbilledRevenue";
import DeferredRevenue from "./pages/Services/AccountsReceivable/DeferredRevenue";
import ContractsBillsPayable from "./pages/Services/AccountsPayable/ContractsBillsPayable";
import DebitCreditNotesAP from "./pages/Services/AccountsPayable/DebitCreditNotes";
import PayablesAccounting from "./pages/Services/AccountsPayable/PayablesAccounting";
import ThreeWayMatching from "./pages/Services/AccountsPayable/ThreeWayMatching";
import ExceptionsAP from "./pages/Services/AccountsPayable/Exceptions";
import PaymentGeneration from "./pages/Services/AccountsPayable/PaymentGeneration";
import PaymentAccounting from "./pages/Services/AccountsPayable/PaymentAccounting";
import Followups from "./pages/Services/AccountsPayable/Followups";
import PayablesAnalytics from "./pages/Services/AccountsPayable/PayablesAnalytics";
import HRMSDataAnalytics from "./pages/Services/Payroll/HRMSDataAnalytics";
import HRMSAmendments from "./pages/Services/Payroll/HRMSAmendments";
import PayrollAccounting from "./pages/Services/Payroll/PayrollAccounting";
import PayrollCompliances from "./pages/Services/Payroll/PayrollCompliances";
import PayrollAnalytics from "./pages/Services/Payroll/PayrollAnalytics";
import CompliancesCalendar from "./pages/Services/Compliances/CompliancesCalendar";
import CompliancesTeam from "./pages/Services/Compliances/CompliancesTeam";
import Tracker from "./pages/Services/Compliances/Tracker";
import ExceptionsCompliances from "./pages/Services/Compliances/Exceptions";
import NonCompliance from "./pages/Services/Compliances/NonCompliance";
import Report from "./pages/Services/Compliances/Report";
import CompliancesAnalytics from "./pages/Services/Compliances/CompliancesAnalytics";
import AccountingSystem from "./pages/Services/IndASFS/AccountingSystem";
import AdditionalInputs from "./pages/Services/IndASFS/AdditionalInputs";
import Provisions from "./pages/Services/IndASFS/Provisions";
import DeferredIncome from "./pages/Services/IndASFS/DeferredIncome";
import Adjustments from "./pages/Services/IndASFS/Adjustments";
import JournalEntries from "./pages/Services/IndASFS/JournalEntries";
import GenerateFinancials from "./pages/Services/IndASFS/GenerateFinancials";
import IntraCompanyAnalysis from "./pages/Services/IndASFS/IntraCompanyAnalysis";
import IndustryAnalysis from "./pages/Services/IndASFS/IndustryAnalysis";
import ObjectivesAssumptionsTargets from "./pages/Services/Budgets/ObjectivesAssumptionsTargets";
import ReviewPastPerformance from "./pages/Services/Budgets/ReviewPastPerformance";
import IncomeIdentification from "./pages/Services/Budgets/IncomeIdentification";
import ExpenseIdentification from "./pages/Services/Budgets/ExpenseIdentification";
import IncomeExpenseAnalysis from "./pages/Services/Budgets/IncomeExpenseAnalysis";
import GenerateBudget from "./pages/Services/Budgets/GenerateBudget";
import ResponsibilityMapping from "./pages/Services/Budgets/ResponsibilityMapping";
import ReviewMonitor from "./pages/Services/Budgets/ReviewMonitor";
import BudgetAnalytics from "./pages/Services/Budgets/BudgetAnalytics";
import BankStatement from "./pages/Services/CashManagement/BankStatement";
import Payments from "./pages/Services/CashManagement/Payments";
import CashFlow from "./pages/Services/CashManagement/CashFlow";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout - Protected Routes */}
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

            {/* Services */}
            <Route path="/services/accounts-receivable/completed-contracts" element={<CompletedContracts />} />
            <Route path="/services/accounts-receivable/draft-contracts" element={<DraftContracts />} />
            <Route path="/services/accounts-receivable/pending-approval-contracts" element={<PendingApprovalContracts />} />
                    <Route path="/services/accounts-receivable/contracts/add-contract" element={<AddContract />} />
        <Route path="/services/accounts-receivable/invoices/add-invoice" element={<AddInvoice />} />
        <Route path="/services/accounts-receivable/unbilled-revenue/add-unbilled-revenue" element={<AddUnbilledRevenue />} />
        <Route path="/services/accounts-receivable/debit-credit-notes/add-debit-credit-notes" element={<AddDebitCreditNotes />} />
        <Route path="/services/accounts-receivable/invoice-triggers" element={<InvoiceTriggers />} />
            <Route path="/services/accounts-receivable/debit-credit-notes" element={<DebitCreditNotes />} />
            <Route path="/services/accounts-receivable/invoice-generation" element={<InvoiceGeneration />} />
            <Route path="/services/accounts-receivable/invoice-accounting" element={<InvoiceAccounting />} />
            <Route path="/services/accounts-receivable/gst-portal-upload" element={<GSTPortalUpload />} />
            <Route path="/services/accounts-receivable/tax-validations" element={<TaxValidations />} />
            <Route path="/services/accounts-receivable/exception-reporting" element={<ExceptionReporting />} />
            <Route path="/services/accounts-receivable/revenue-dashboard" element={<RevenueDashboard />} />
            <Route path="/services/accounts-receivable/receipts" element={<Receipts />} />
            <Route path="/services/accounts-receivable/unbilled-revenue" element={<UnbilledRevenue />} />
            <Route path="/services/accounts-receivable/deferred-revenue" element={<DeferredRevenue />} />
            <Route path="/services/accounts-receivable/completed-invoices" element={<CompletedInvoices />} />
            <Route path="/services/accounts-receivable/draft-invoices" element={<DraftInvoices />} />
            <Route path="/services/accounts-receivable/pending-approval-invoices" element={<PendingApprovalInvoices />} />
            <Route path="/services/accounts-receivable/completed-unbilled-revenue" element={<CompletedUnbilledRevenue />} />
            <Route path="/services/accounts-receivable/draft-unbilled-revenue" element={<DraftUnbilledRevenue />} />
            <Route path="/services/accounts-receivable/pending-approval-unbilled-revenue" element={<PendingApprovalUnbilledRevenue />} />
            <Route path="/services/accounts-receivable/completed-debit-credit-notes" element={<CompletedDebitCreditNotes />} />
            <Route path="/services/accounts-receivable/draft-debit-credit-notes" element={<DraftDebitCreditNotes />} />
            <Route path="/services/accounts-receivable/pending-approval-debit-credit-notes" element={<PendingApprovalDebitCreditNotes />} />
            {/* Accounts Payable Services */}
            <Route path="/services/accounts-payable/contracts-bills-payable" element={<ContractsBillsPayable />} />
            <Route path="/services/accounts-payable/debit-credit-notes" element={<DebitCreditNotesAP />} />
            <Route path="/services/accounts-payable/payables-accounting" element={<PayablesAccounting />} />
            <Route path="/services/accounts-payable/3-way-matching" element={<ThreeWayMatching />} />
            <Route path="/services/accounts-payable/exceptions" element={<ExceptionsAP />} />
            <Route path="/services/accounts-payable/payment-generation" element={<PaymentGeneration />} />
            <Route path="/services/accounts-payable/payment-accounting" element={<PaymentAccounting />} />
            <Route path="/services/accounts-payable/followups" element={<Followups />} />
            <Route path="/services/accounts-payable/payables-analytics" element={<PayablesAnalytics />} />
            {/* Payroll Services */}
            <Route path="/services/payroll/hrms-data-analytics" element={<HRMSDataAnalytics />} />
            <Route path="/services/payroll/hrms-amendments" element={<HRMSAmendments />} />
            <Route path="/services/payroll/payroll-accounting" element={<PayrollAccounting />} />
            <Route path="/services/payroll/payroll-compliances" element={<PayrollCompliances />} />
            <Route path="/services/payroll/payroll-analytics" element={<PayrollAnalytics />} />
            {/* Compliances Services */}
            <Route path="/services/compliances/compliances-calendar" element={<CompliancesCalendar />} />
            <Route path="/services/compliances/compliances-team" element={<CompliancesTeam />} />
            <Route path="/services/compliances/tracker" element={<Tracker />} />
            <Route path="/services/compliances/exceptions" element={<ExceptionsCompliances />} />
            <Route path="/services/compliances/non-compliance" element={<NonCompliance />} />
            <Route path="/services/compliances/report" element={<Report />} />
            <Route path="/services/compliances/compliances-analytics" element={<CompliancesAnalytics />} />
            {/* Financial Statements Services */}
            <Route path="/services/financial-statements/accounting-system" element={<AccountingSystem />} />
            <Route path="/services/financial-statements/additional-inputs" element={<AdditionalInputs />} />
            <Route path="/services/financial-statements/provisions" element={<Provisions />} />
            <Route path="/services/financial-statements/deferred-income" element={<DeferredIncome />} />
            <Route path="/services/financial-statements/adjustments" element={<Adjustments />} />
            <Route path="/services/financial-statements/journal-entries" element={<JournalEntries />} />
            <Route path="/services/financial-statements/generate-financials" element={<GenerateFinancials />} />
            <Route path="/services/financial-statements/intra-company-analysis" element={<IntraCompanyAnalysis />} />
            <Route path="/services/financial-statements/industry-analysis" element={<IndustryAnalysis />} />
            {/* Budgets Services */}
            <Route path="/services/budgets/objectives-assumptions-targets" element={<ObjectivesAssumptionsTargets />} />
            <Route path="/services/budgets/review-past-performance" element={<ReviewPastPerformance />} />
            <Route path="/services/budgets/income-identification" element={<IncomeIdentification />} />
            <Route path="/services/budgets/expense-identification" element={<ExpenseIdentification />} />
            <Route path="/services/budgets/income-expense-analysis" element={<IncomeExpenseAnalysis />} />
            <Route path="/services/budgets/generate-budget" element={<GenerateBudget />} />
            <Route path="/services/budgets/responsibility-mapping" element={<ResponsibilityMapping />} />
            <Route path="/services/budgets/review-monitor" element={<ReviewMonitor />} />
            <Route path="/services/budgets/budget-analytics" element={<BudgetAnalytics />} />
            {/* Cash Management Services */}
            <Route path="/services/cash-management/bank-statement" element={<BankStatement />} />
            <Route path="/services/cash-management/payments" element={<Payments />} />
            <Route path="/services/cash-management/cash-flow" element={<CashFlow />} />
          </Route>

          {/* Auth Layout - Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
