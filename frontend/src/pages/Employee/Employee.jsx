import "./Employee.css";

function Employee() {
  return (
    <>
      <div className="split-container">
        {/* Form Section */}
        <div className="form-section">
          <h3 className="section-header">Add / Edit Employee</h3>
          <form id="employeeForm">
            <input type="hidden" id="db_id" />

            <div className="form-group">
              <label>Name</label>
              <input type="text" name="e_name" placeholder="Full Name" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="e_mail" placeholder="email@example.com" required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="e_phone" placeholder="Phone Number" required />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="gender-radio-group">
                <label>
                  <input type="radio" name="employee_gender" value="Male" required /> Male
                </label>
                <label>
                  <input type="radio" name="employee_gender" value="Female" required /> Female
                </label>
                <label>
                  <input type="radio" name="employee_gender" value="Other" required /> Other
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Designation</label>
              <select name="e_designation" id="designationDropdown" required>
                <option value="">Select Designation</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <input type="date" name="e_joining" required />
            </div>

            <div className="form-group">
              <label>Initial Salary</label>
              <input type="number" name="e_initialsalary" placeholder="0.00" required />
            </div>

            <div className="action-buttons">
              <button type="submit" className="btn btn-primary flex-1">
                Save Employee
              </button>
              <button type="button" id="resetBtn" className="btn btn-secondary hidden">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="list-section">
          <h3 className="section-header">Employee List</h3>
          <div className="table-responsive">
            <table id="employeeTable" className="display w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="employeeTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Employee;
