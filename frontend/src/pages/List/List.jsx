import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./List.css";

function List() {
  const [employees, setEmployees] = useState([]);

  async function fetchEmployees() {
    try {
      const res = await fetch("http://localhost:3000/employees");
      const data = await res.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Edit logic
  const handleEditEmployee = (empId) => {
    console.log("Edit clicked for:", empId);
    try {
      // Fetch employee data and populate the form for editing
    } catch (error) {
      console.error("Error fetching employee data for edit:", error);
    }
  };

  // Delete logic
  const handleDeleteEmployee = async (empId) => {
    console.log("Delete clicked for:", empId);
    try {
      await fetch(`http://localhost:3000/employees/${empId}`, {
        method: "DELETE",
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const [salary, setSalary] = useState([]);

  async function fetchSalary() {
    try {
      const res = await fetch("http://localhost:3000/salary-entries");
      const data = await res.json();
      setSalary(data.data);
    } catch (error) {
      console.error("Error fetching salary entries:", error);
    }
  }

  useEffect(() => {
    fetchSalary();
  }, []);

  // Edit logic
  const handleEditSalary = (salaryId) => {
    console.log("Edit clicked for:", salaryId);
    try {
      // Fetch salary data and populate the form for editing
    } catch (error) {
      console.error("Error fetching salary data for edit:", error);
    }
  };

  // Delete logic
  const handleDeleteSalary = async (salaryId) => {
    console.log("Delete clicked for:", salaryId);
    try {
      await fetch(`http://localhost:3000/salary-entries/${salaryId}`, {
        method: "DELETE",
      });
      fetchSalary();
    } catch (error) {
      console.error("Error deleting salary entry:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="split-container">
        <section className="list-section flex-1">
          <h3 className="section-header">All Employees</h3>
          <div className="table-responsive">
            <table id="employeeTable" className="display w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Designation</th>
                  <th>Joining Date</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="employeeTableBody">
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.e_name}</td>
                    <td>{emp.e_mail}</td>
                    <td>{emp.e_phone}</td>
                    <td>{emp.employee_gender}</td>
                    <td>{emp.e_designation?.name || "N/A"}</td>
                    <td>{new Date(emp.e_dateOfJoining).toLocaleDateString()}</td>
                    <td>{emp.e_initialsalary}</td>
                    <td>
                      <button onClick={() => handleEditEmployee(emp._id)}>Edit</button>
                      <button onClick={() => handleDeleteEmployee(emp._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br className="mt-20" />

          <h3 className="section-header">All Salary Entries</h3>
          {/* <div className="filter-container">
            <div className="filter-row">
              {/* Employee Filter */}
          {/* 
              <div className="filter-col-grow">
                <label className="filter-label">Employee</label>
                <select name="e_id" id="employeeDropdown" className="filter-input">
                  <option value="">All Employees</option>
                </select>
              </div>

              {/* From Date */}
          {/* 
              <div className="filter-col-auto">
                <label className="filter-label">From</label>
                <div className="date-inputs">
                  <select id="fromMonth" className="month-input">
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <select id="fromYear" className="year-input">
                    <option value="">Year</option>
                  </select>
                </div>
              </div>

              {/* To Date */}
          {/* 
              <div className="filter-col-auto">
                <label className="filter-label">To</label>
                <div className="date-inputs">
                  <select id="toMonth" className="month-input">
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <select id="toYear" className="year-input">
                    <option value="">Year</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
          {/* 
              <div className="filter-actions">
                <button id="searchBtn" className="btn btn-primary btn-search">
                  Search
                </button>
                <button id="resetFilter" className="btn btn-secondary btn-clear">
                  Clear
                </button>
              </div>
            </div>
          </div> */}
          <div className="table-responsive">
            <table id="salaryTable" className="display w-100">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="salaryTableBody">
                {salary.map((s) => (
                  <tr key={s._id}>
                    <td>{s.e_id?.e_name || "Unknown / Deleted"}</td>
                    <td>{s.month}</td>
                    <td>{s.year}</td>
                    <td>{s.salary}</td>
                    <td>
                      <button onClick={() => handleEditSalary(s._id)}>Edit</button>
                      <button onClick={() => handleDeleteSalary(s._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
export default List;
