import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./pages/Employee/Employee.jsx";
import Designation from "./pages/Designation/Designation.jsx";
import List from "./pages/List/List.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Salary from "./pages/Salary/Salary.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/designation" element={<Designation />} />
          <Route path="/list" element={<List />} />
          <Route path="/salary" element={<Salary />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
