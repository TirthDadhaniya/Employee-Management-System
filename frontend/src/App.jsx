import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth-pages/Login.jsx";
import Register from "./pages/Auth-pages/Register.jsx";
import List from "./pages/List/List.jsx";
import Employee from "./pages/Employee/Employee.jsx";
import Designation from "./pages/Designation/Designation.jsx";
import Salary from "./pages/Salary/Salary.jsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<List />} />
          <Route path="/designation" element={<Designation />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/salary" element={<Salary />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
