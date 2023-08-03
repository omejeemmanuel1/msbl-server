import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/login/login";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";

function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />        
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
