import { useState } from "react";
import "./Employee.css";

function Employee() {
  const [employee, setEmployee] = useState({
    db_id: "", // Hidden field
    e_name: "",
    e_mail: "",
    e_phone: "",
    employee_gender: "",
    e_designation: "",
    e_joining: "",
    e_initialsalary: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
  };

  return (
    <>
      <div className="split-container">
        {/* Form Section */}
        <div className="form-section">
          <h3 className="section-header">Add / Edit Employee</h3>
          <form id="employeeForm" onSubmit={onSubmit}>
            <input type="hidden" name="db_id" id="db_id" />

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="e_name"
                placeholder="Full Name"
                required
                value={employee.e_name}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="e_mail"
                placeholder="email@example.com"
                required
                value={employee.e_mail}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="e_phone"
                placeholder="Phone Number"
                required
                value={employee.e_phone}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="gender-radio-group">
                <label>
                  <input
                    type="radio"
                    name="employee_gender"
                    value="Male"
                    onChange={handleInput}
                    checked={employee.employee_gender === "Male"}
                    required
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="employee_gender"
                    value="Female"
                    onChange={handleInput}
                    checked={employee.employee_gender === "Female"}
                    required
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="employee_gender"
                    value="Other"
                    onChange={handleInput}
                    checked={employee.employee_gender === "Other"}
                    required
                  />{" "}
                  Other
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Designation</label>
              <select
                name="e_designation"
                id="designationDropdown"
                value={employee.e_designation}
                onChange={handleInput}
                required
              >
                <option value="">Select Designation</option>
                {/* <option value="ahd">Ahmedabad</option> */}
              </select>
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <input type="date" name="e_joining" value={employee.e_joining} onChange={handleInput} required />
            </div>

            <div className="form-group">
              <label>Initial Salary</label>
              <input
                type="number"
                name="e_initialsalary"
                value={employee.e_initialsalary}
                placeholder="0.00"
                onChange={handleInput}
                required
              />
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
