import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import SalaryTable from "../../components/Table/SalaryTable";
import styles from "./Salary.module.css";

function Salary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const salaryId = searchParams.get("id");

  const [employees, setEmployees] = useState([]);

  const [salary, setSalary] = useState({
    salary_id: "",
    e_id: "",
    year: "",
    month: "",
    salary: "",
  });

  useEffect(() => {
    async function getEmployees() {
      try {
        const res = await axios.get("http://localhost:3000/employees/dropdown");
        setEmployees(res.data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    getEmployees();
  }, []);

  useEffect(() => {
    if (salaryId) {
      async function fetchSalaryToEdit() {
        try {
          const res = await axios.get(`http://localhost:3000/salary-entries/${salaryId}`);
          const data = res.data.data;

          setSalary({
            salary_id: data._id,
            e_id: data.e_id?._id || data.e_id,
            year: data.year,
            month: data.month,
            salary: data.salary,
          });
        } catch (error) {
          console.error("Error fetching salary details:", error);
        }
      }
      fetchSalaryToEdit();
    }
  }, [salaryId]);

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

    const url = isEditing
      ? `http://localhost:3000/salary-entries/${salary.salary_id}`
      : `http://localhost:3000/salary-entries`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await axios({
        url: url,
        method: method,
        data: salary,
      });

      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Salary Updated!" : "Salary Added!");
        setSalary({
          salary_id: "",
          e_id: "",
          year: "",
          month: "",
          salary: "",
        });
        navigate("/salary");
      }
    } catch (err) {
      console.error("Connection failed:", err);
      alert(err.response?.data?.message || "Server is down or unreachable.");
    }
  };

  return (
    <>
      <Header />
      <div className={styles["split-container"]}>
        {/* Salary Form */}
        <section className={styles["form-section"]}>
          <h3 className={styles["section-header"]}>Add / Edit Salary</h3>
          <form id="salaryForm" onSubmit={onSubmit}>
            <input type="hidden" name="salary_id" id="salary_id" value={salary.salary_id} />

            <div className={styles["form-group"]}>
              <label>Employee</label>
              <select name="e_id" id="employeeDropdown" onChange={handleInput} value={salary.e_id} required>
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.e_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Year</label>
              <select name="year" id="yearDropdown" required onChange={handleInput} value={salary.year}>
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Month</label>
              <select name="month" id="monthDropdown" required onChange={handleInput} value={salary.month}>
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label>Salary Amount</label>
              <input
                type="number"
                name="salary"
                placeholder="0.00"
                required
                min="0"
                onChange={handleInput}
                value={salary.salary}
              />
            </div>

            <div className={styles["action-buttons"]}>
              <Button text="Save Entry" type="submit" variant="primary" />
            </div>
          </form>
        </section>

        {/* List Section */}
        <section className={styles["list-section"]}>
          <SalaryTable title="All Salary Entries" />
        </section>
      </div>
    </>
  );
}
export default Salary;
