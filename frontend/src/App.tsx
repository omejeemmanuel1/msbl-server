import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./context/authContext";
import "./App.css";
import UserForm from "./components/adminDashboard/UserForm";
import CreateDepartment from "./components/adminDashboard/CreateDepartment";
import Users from "./components/adminDashboard/Users";
import InitiatorPage from "./pages/InitiatorDashboard/InitiatorPage";
import SingleRequest from "./components/singleRequest/SingleRequest";
import ChangePasswordPage from "./pages/Passwords/ChangePasswordPage";
import ForgotPasswordPage from "./pages/Passwords/ForgotPasswordPage";
import LoginPage from "./pages/login/login";
import VerifyOTPPage from "./pages/Passwords/VerifyOTPPage";
import ResetPasswordPage from "./pages/Passwords/ResetPasswordPage";
import SuperAdminPage from "./pages/Dashboards/SuperAdminPage";
import AdminPage from "./pages/Dashboards/AdminPage";
import SearchResultsPage from "./components/searchComponent/SearchResultPage";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/super-admin" element={<SuperAdminPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userForm" element={<UserForm />} />
            <Route path="/createDepartment" element={<CreateDepartment />} />
            <Route path="/users" element={<Users />} />
            <Route path="/initiatorDashboard" element={<InitiatorPage />} />
            <Route path="/singleRequest/:_id" element={<SingleRequest />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
