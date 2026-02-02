import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      db_id: "",
      e_name: "",
      e_mail: "",
      e_phone: "",
      e_gender: "",
      e_designation: "",
      e_dateOfJoining: "",
      e_initialSalary: "",
    },
  });

  const selectedGender = watch("e_gender");

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

          setValue("db_id", data._id);
          setValue("e_name", data.e_name);
          setValue("e_mail", data.e_mail);
          setValue("e_phone", data.e_phone);
          setValue("e_gender", data.e_gender);
          setValue("e_designation", data.e_designation?._id || data.e_designation);
          setValue("e_dateOfJoining", data.e_dateOfJoining ? data.e_dateOfJoining.split("T")[0] : "");
          setValue("e_initialSalary", data.e_initialSalary);
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      }
      fetchEmployeeToEdit();
    } else {
      reset({
        db_id: "",
        e_name: "",
        e_mail: "",
        e_phone: "",
        e_gender: "",
        e_designation: "",
        e_dateOfJoining: "",
        e_initialSalary: "",
      });
    }
  }, [employeeId, setValue, reset]);

  const onSubmit = async (data) => {
    // Determine if we are Adding or Editing
    const isEditing = data.db_id && data.db_id !== "";

    const url = isEditing ? `http://localhost:3000/employees/${data.db_id}` : `http://localhost:3000/employees`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await axios({
        url: url,
        method: method,
        data: data,
      });

      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Employee Updated!" : "Employee Added!");
        reset({
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
          <form id="employeeForm" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("db_id")} />

            <div className={styles["form-group"]}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className={errors.e_name ? styles["input-error"] : ""}
                {...register("e_name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
              />
              {errors.e_name && <span className={styles["error-message"]}>{errors.e_name.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className={errors.e_mail ? styles["input-error"] : ""}
                {...register("e_mail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.e_mail && <span className={styles["error-message"]}>{errors.e_mail.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone Number"
                className={errors.e_phone ? styles["input-error"] : ""}
                {...register("e_phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Please enter a valid phone number (10-15 digits)",
                  },
                })}
              />
              {errors.e_phone && <span className={styles["error-message"]}>{errors.e_phone.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Gender</label>
              <div className={styles["gender-radio-group"]}>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    {...register("e_gender", { required: "Please select a gender" })}
                    checked={selectedGender === "Male"}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    {...register("e_gender", { required: "Please select a gender" })}
                    checked={selectedGender === "Female"}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    {...register("e_gender", { required: "Please select a gender" })}
                    checked={selectedGender === "Other"}
                  />{" "}
                  Other
                </label>
              </div>
              {errors.e_gender && <span className={styles["error-message"]}>{errors.e_gender.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Designation</label>
              <select
                id="designationDropdown"
                className={errors.e_designation ? styles["input-error"] : ""}
                {...register("e_designation", { required: "Please select a designation" })}
              >
                <option value="">Select Designation</option>
                {designations.map((designation) => (
                  <option key={designation._id} value={designation._id}>
                    {designation.name}
                  </option>
                ))}
              </select>
              {errors.e_designation && <span className={styles["error-message"]}>{errors.e_designation.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Date of Joining</label>
              <input
                type="date"
                className={errors.e_dateOfJoining ? styles["input-error"] : ""}
                {...register("e_dateOfJoining", {
                  required: "Date of joining is required",
                })}
              />
              {errors.e_dateOfJoining && <span className={styles["error-message"]}>{errors.e_dateOfJoining.message}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label>Initial Salary</label>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                className={errors.e_initialSalary ? styles["input-error"] : ""}
                {...register("e_initialSalary", {
                  required: "Initial salary is required",
                  min: {
                    value: 0,
                    message: "Salary cannot be negative",
                  },
                })}
              />
              {errors.e_initialSalary && <span className={styles["error-message"]}>{errors.e_initialSalary.message}</span>}
            </div>

            <div className={styles["action-buttons"]}>
              <Button text={isSubmitting ? "Saving..." : "Save Employee"} type="submit" variant="primary" disabled={isSubmitting} />
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
