import "./assets/css/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./frontend/layout/MainLayout";

// Frontend Pages
import Home from "./frontend/pages/Home";
import SmsServicePage from "./frontend/pages/sms/SmsServicePage";
import EnquiryPage from "./frontend/pages/Enquiry";
import CheckReport from "./frontend/pages/CheckReportPage";
import LoginPage from "./frontend/pages/Login";
import NotFoundPage from "./frontend/pages/NotFoundPage";
import ResetPasswordPage from "./frontend/pages/ResetPassword";
import SubscriptionPlans from "./frontend/components/SubscriptionPlans/SubscriptionPlans";

// Backend Pages
import AdminLayout from "./backend/admin/AdminLayout";
import AdminPageDashboard from "./backend/admin/pages/AdminPageDashboard";
import AdminPageEnquiries from "./backend/admin/pages/AdminPageEnquiry";
import Settings from "./backend/admin/pages/AdminPageSettings";
import ProtectedRoute from "./backend/auth/protectRoute/ProtectRoute";
import AdminSmsOrder from "./backend/admin/pages/AdminSmsOrders";
function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminPageDashboard />} />
            <Route path="sms-order" element={<AdminSmsOrder />} />
            <Route path="enquiry" element={<AdminPageEnquiries />} />

            
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Main Site Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sms-service" element={<SmsServicePage />} />
          <Route path="/check-report" element={<CheckReport />} />
          <Route path="/pricing" element={<SubscriptionPlans />} />
          <Route path="/enquiry" element={<EnquiryPage />} />

          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
