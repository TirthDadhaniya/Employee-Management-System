import { useState } from "react";
import "./Salary.css";
import Navbar from "../../components/Navbar/Navbar";

function Salary() {
  const [salary, setSalary] = useState({
    salary_id: "",
    e_id: "",
    year: "",
    month: "",
    salary: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Determine if we are Adding or Editing
    const isEditing = salary.salary_id && salary.salary_id !== "";

    // 2. Set the URL and Method accordingly
    // If editing, we add the ID to the URL
    const url = isEditing
      ? `http://localhost:3000/salary-entries/${salary.salary_id}`
      : `http://localhost:3000/salary-entries`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salary), // Send the whole state object
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEditing ? "Salary Updated!" : "Salary Added!");

        // 3. Reset form after successful save
        setSalary({
          salary_id: "",
          e_id: "",
          year: "",
          month: "",
          salary: "",
        });

        // Optional: If you have a list function, call it here to refresh the table
        // fetchSalary();
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error("Connection failed:", err);
      alert("Server is down or unreachable.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="split-container">
        {/* <!-- Salary Form --> */}
        <div className="form-section">
          <h3 className="section-header">Add / Edit Salary</h3>
          <form id="salaryForm">
            <input type="hidden" name="salary_id" id="salary_id" />

            <div className="form-group">
              <label>Employee</label>
              <select name="e_id" id="employeeDropdown" required>
                <option value="">Select Employee</option>
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <select name="year" id="yearDropdown" required>
                <option value="">Select Year</option>
              </select>
            </div>

            <div className="form-group">
              <label>Month</label>
              <select name="month" id="monthDropdown" required>
                <option value="">Select Month</option>
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
            </div>

            <div className="form-group">
              <label>Salary Amount</label>
              <input type="number" name="salary" placeholder="0.00" required min="0" />
            </div>

            <div className="action-buttons">
              <button type="submit" className="btn btn-primary flex-1">
                Save Entry
              </button>
              <button type="button" id="resetBtn" className="btn btn-secondary hidden">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* <!-- Salary List --> */}
        <div className="list-section">
          <h3 className="section-header">Salary Revenue History</h3>
          <div className="table-responsive">
            <table id="salaryTable" className="display w-100">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="salaryTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Salary;
