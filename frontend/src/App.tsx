import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./context/authContext";
import "./App.css";
import Users from "./components/dashboard/Users";
import UserForm from "./components/dashboard/UserForm";
import AdminPage from "./pages/Dashboards/AdminPage";
import SuperAdminPage from "./pages/Dashboards/SuperAdminPage";
import CreateDepartment from "./components/dashboard/CreateDepartment";
import LoginPage from "./pages/Login/Login";
import ChangePasswordPage from "./pages/Passwords/ChangePasswordPage";
import ForgotPasswordPage from "./pages/Passwords/ForgotPasswordPage";
import VerifyOTPPage from "./pages/Passwords/VerifyOTPPage";
import ResetPasswordPage from "./pages/Passwords/ResetPasswordPage";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/change-password/:id" element={<ChangePasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/super-admin" element={<SuperAdminPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userForm" element={<UserForm />} />
            <Route path="/createDepartment" element={<CreateDepartment />} />

          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
