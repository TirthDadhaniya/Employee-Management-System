import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Employee.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import EmployeeTable from "../../components/Table/EmployeeTable";

function Employee() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const employeeId = searchParams.get("id");

  const [designations, setDesignations] = useState([]);

  const [employee, setEmployee] = useState({
    db_id: "", // Hidden field
    e_name: "",
    e_mail: "",
    e_phone: "",
    e_gender: "",
    e_designation: "",
    e_dateOfJoining: "",
    e_initialSalary: "",
  });

  useEffect(() => {
    async function fetchDesignations() {
      try {
        const res = await axios.get("http://localhost:3000/designations");
        setDesignations(res.data.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    }
    fetchDesignations();
  }, []);

  useEffect(() => {
    if (employeeId) {
      async function fetchEmployeeToEdit() {
        try {
          const res = await axios.get(`http://localhost:3000/employees/${employeeId}`);
          const data = res.data.data;

          setEmployee({
            db_id: data._id, // Set the hidden ID
            e_name: data.e_name,
            e_mail: data.e_mail,
            e_phone: data.e_phone,
            e_gender: data.e_gender,
            e_designation: data.e_designation?._id || data.e_designation, // Handle populated ID
            e_dateOfJoining: data.e_dateOfJoining ? data.e_dateOfJoining.split("T")[0] : "",
            e_initialSalary: data.e_initialSalary,
          });
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      }
      fetchEmployeeToEdit();
    }
  }, [employeeId]);

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

    const url = isEditing ? `http://localhost:3000/employees/${employee.db_id}` : `http://localhost:3000/employees`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await axios({
        url: url,
        method: method,
        data: employee,
      });

      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Employee Updated!" : "Employee Added!");
        setEmployee({
          db_id: "",
          e_name: "",
          e_mail: "",
          e_phone: "",
          e_gender: "",
          e_designation: "",
          e_dateOfJoining: "",
          e_initialSalary: "",
        });
        navigate("/employee");
      }
    } catch (err) {
      console.error("Connection failed:", err);
      alert(err.response?.data?.error || "Server is down or unreachable.");
    }
  };

  return (
    <>
      <Header />
      <div className={styles["split-container"]}>
        {/* Form Section */}
        <section className={styles["form-section"]}>
          <h3 className={styles["section-header"]}>Add / Edit Employee</h3>
          <form id="employeeForm" onSubmit={onSubmit}>
            <input type="hidden" name="db_id" id="db_id" value={employee.db_id} />

            <div className={styles["form-group"]}>
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

            <div className={styles["form-group"]}>
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

            <div className={styles["form-group"]}>
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

            <div className={styles["form-group"]}>
              <label>Gender</label>
              <div className={styles["gender-radio-group"]}>
                <label>
                  <input
                    type="radio"
                    name="e_gender"
                    value="Male"
                    onChange={handleInput}
                    checked={employee.e_gender === "Male"}
                    required
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="e_gender"
                    value="Female"
                    onChange={handleInput}
                    checked={employee.e_gender === "Female"}
                    required
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="e_gender"
                    value="Other"
                    onChange={handleInput}
                    checked={employee.e_gender === "Other"}
                    required
                  />{" "}
                  Other
                </label>
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label>Designation</label>
              <select
                name="e_designation"
                id="designationDropdown"
                value={employee.e_designation}
                onChange={handleInput}
                required
              >
                <option value="">Select Designation</option>
                {designations.map((designation) => (
                  <option key={designation._id} value={designation._id}>
                    {designation.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Date of Joining</label>
              <input
                type="date"
                name="e_dateOfJoining"
                value={employee.e_dateOfJoining}
                onChange={handleInput}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Initial Salary</label>
              <input
                type="number"
                name="e_initialSalary"
                value={employee.e_initialSalary}
                placeholder="0.00"
                onChange={handleInput}
                min="0"
                required
              />
            </div>

            <div className={styles["action-buttons"]}>
              <Button text="Save Employee" type="submit" variant="primary" />
            </div>
          </form>
        </section>

        {/* List Section */}
        <section className={styles["list-section"]}>
          <EmployeeTable title="All Employees" />
        </section>
      </div>
    </>
  );
}
export default Employee;
