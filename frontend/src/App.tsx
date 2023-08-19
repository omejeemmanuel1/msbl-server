import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/login/login";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import SuperAdminPage from "./pages/AdminDashboard/SuperAdminPage";
import "./App.css";
import UserForm from "./components/adminDashboard/UserForm";
import CreateDepartment from "./components/adminDashboard/CreateDepartment";
import Users from "./components/adminDashboard/Users";
import DataProvider from "./context/authContext";
import InitiatorPage from "./pages/InitiatorDashboard/InitiatorPage";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/super-admin" element={<SuperAdminPage />} />
            <Route path="/userForm" element={<UserForm />} />
            <Route path="/createDepartment" element={<CreateDepartment />} />
            <Route path="/users" element={<Users />} />
            <Route path="/InitiatorDashboard" element={<InitiatorPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
