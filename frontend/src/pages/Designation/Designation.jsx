import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import styles from "./Designation.module.css";
import Button from "../../components/Button/Button";
import DesignationTable from "../../components/Table/DesignationTable";

function Designation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const designationId = searchParams.get("id");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (designationId) {
      async function fetchDesignationToEdit() {
        try {
          const res = await axios.get(`http://localhost:3000/designations/${designationId}`);
          setValue("name", res.data.data.name);
        } catch (error) {
          console.error("Error fetching designation details:", error);
        }
      }
      fetchDesignationToEdit();
    } else {
      reset({ name: "" });
    }
  }, [designationId, setValue, reset]);

  const onSubmit = async (data) => {
    const isEditing = designationId && designationId !== "";

    const url = isEditing
      ? `http://localhost:3000/designations/${designationId}`
      : `http://localhost:3000/designations`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await axios({
        url: url,
        method: method,
        data: data,
      });

      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Designation Updated!" : "Designation Added!");
        reset({ name: "" });
        navigate("/designation");
      }
    } catch (error) {
      console.error("Error submitting designation:", error);
      alert(error.response?.data?.message || "Failed to save designation.");
    }
  };

  return (
    <>
      <Header />
      <div className={styles["split-container"]}>
        {/* Add Designation Form */}
        <section className={styles["form-section"]}>
          <h3 className={styles["section-header"]}>Add New Designation</h3>
          <form id="designationForm" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["form-group"]}>
              <label htmlFor="name">Designation Name</label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Software Engineer"
                className={errors.name ? styles["input-error"] : ""}
                {...register("name", {
                  required: "Designation name is required",
                  minLength: {
                    value: 2,
                    message: "Designation name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Designation name cannot exceed 50 characters",
                  },
                })}
              />
              {errors.name && <span className={styles["error-message"]}>{errors.name.message}</span>}
            </div>

            <div className={styles["action-buttons"]}>
              <Button text={isSubmitting ? "Saving..." : "Add Designation"} type="submit" variant="primary" disabled={isSubmitting} />
            </div>
          </form>
        </section>

        {/* Designation List */}
        <section className={styles["list-section"]}>
          <DesignationTable title="Current Designations" />
        </section>
      </div>
    </>
  );
}
export default Designation;
