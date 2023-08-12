import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/login/login";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import SuperAdminPage from "./pages/AdminDashboard/SuperAdminPage"
import './App.css';
import UserForm from "./components/dashboard/UserForm";
import CreateDepartment from "./components/dashboard/CreateDepartment";
import Users from "./components/dashboard/Users";

function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />        
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/create-admin" element={<SuperAdminPage />} />
          <Route path="/userForm" element={<UserForm />} />
          <Route path="/createDepartment" element={<CreateDepartment />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
