import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      salary_id: "",
      e_id: "",
      year: "",
      month: "",
      salary: "",
    },
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

          setValue("salary_id", data._id);
          setValue("e_id", data.e_id?._id || data.e_id);
          setValue("year", data.year);
          setValue("month", data.month);
          setValue("salary", data.salary);
        } catch (error) {
          console.error("Error fetching salary details:", error);
        }
      }
      fetchSalaryToEdit();
    } else {
      reset({
        salary_id: "",
        e_id: "",
        year: "",
        month: "",
        salary: "",
      });
    }
  }, [salaryId, setValue, reset]);

  const onSubmit = async (data) => {
    // Determine if we are Adding or Editing
    const isEditing = data.salary_id && data.salary_id !== "";

    const url = isEditing
      ? `http://localhost:3000/salary-entries/${data.salary_id}`
      : `http://localhost:3000/salary-entries`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await axios({
        url: url,
        method: method,
        data: data,
      });

      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Salary Updated!" : "Salary Added!");
        reset({
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
          <form id="salaryForm" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("salary_id")} />

            <div className={styles["form-group"]}>
              <label>Employee</label>
              <select
                id="employeeDropdown"
                className={errors.e_id ? styles["input-error"] : ""}
                {...register("e_id", { required: "Please select an employee" })}
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.e_name}
                  </option>
                ))}
              </select>
              {errors.e_id && <span className={styles["error-message"]}>{errors.e_id.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Year</label>
              <select
                id="yearDropdown"
                className={errors.year ? styles["input-error"] : ""}
                {...register("year", { required: "Please select a year" })}
              >
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && <span className={styles["error-message"]}>{errors.year.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Month</label>
              <select
                id="monthDropdown"
                className={errors.month ? styles["input-error"] : ""}
                {...register("month", { required: "Please select a month" })}
              >
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
              {errors.month && <span className={styles["error-message"]}>{errors.month.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Salary Amount</label>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                className={errors.salary ? styles["input-error"] : ""}
                {...register("salary", {
                  required: "Salary amount is required",
                  min: {
                    value: 0,
                    message: "Salary cannot be negative",
                  },
                })}
              />
              {errors.salary && <span className={styles["error-message"]}>{errors.salary.message}</span>}
            </div>

            <div className={styles["action-buttons"]}>
              <Button text={isSubmitting ? "Saving..." : "Save Entry"} type="submit" variant="primary" disabled={isSubmitting} />
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
