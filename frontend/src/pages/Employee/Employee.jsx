import { useEffect, useState } from "react";
import "./Employee.css";
import Header from "../../components/Header/Header";

function Employee() {
  const [designations, setDesignations] = useState([]); // For Employee Form

  useEffect(() => {
    async function fetchDesignations() {
      try {
        const res = await fetch("http://localhost:3000/employees/designations");
        const data = await res.json();
        setDesignations(data.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    }
    fetchDesignations();
  }, []);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    // Determine if we are Adding or Editing
    const isEditing = employee.db_id && employee.db_id !== "";

    // 2. Set the URL and Method accordingly
    // If editing, we add the ID to the URL (e.g., /api/employees/123)
    const url = isEditing ? `http://localhost:3000/employees/${employee.db_id}` : `http://localhost:3000/employees`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee), // Send the whole state object
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEditing ? "Employee Updated!" : "Employee Added!");

        // 3. Reset form after successful save
        setEmployee({
          db_id: "",
          e_name: "",
          e_mail: "",
          e_phone: "",
          employee_gender: "",
          e_designation: "",
          e_joining: "",
          e_initialsalary: "",
        });

        // Optional: If you have a list function, call it here to refresh the table
        // fetchEmployees();
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
      <Header />
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
