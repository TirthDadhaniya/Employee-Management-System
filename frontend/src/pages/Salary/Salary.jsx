import { useState } from "react";

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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(salary);
  };
  return (
    <>
      <div class="split-container">
        {/* <!-- Salary Form --> */}
        <div class="form-section">
          <h3 class="section-header">Add / Edit Salary</h3>
          <form id="salaryForm">
            <input type="hidden" name="salary_id" id="salary_id" />

            <div class="form-group">
              <label>Employee</label>
              <select name="e_id" id="employeeDropdown" required>
                <option value="">Select Employee</option>
              </select>
            </div>

            <div class="form-group">
              <label>Year</label>
              <select name="year" id="yearDropdown" required>
                <option value="">Select Year</option>
              </select>
            </div>

            <div class="form-group">
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

            <div class="form-group">
              <label>Salary Amount</label>
              <input type="number" name="salary" placeholder="0.00" required min="0" />
            </div>

            <div class="action-buttons">
              <button type="submit" class="btn btn-primary flex-1">
                Save Entry
              </button>
              <button type="button" id="resetBtn" class="btn btn-secondary hidden">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* <!-- Salary List --> */}
        <div class="list-section">
          <h3 class="section-header">Salary Revenue History</h3>
          <div class="table-responsive">
            <table id="salaryTable" class="display w-100">
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
