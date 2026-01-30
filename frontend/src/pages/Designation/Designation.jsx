import { useState } from "react";
import { useEffect } from "react";
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

  const [designation, setDesignation] = useState({
    name: "",
  });

  useEffect(() => {
    if (designationId) {
      async function fetchDesignationToEdit() {
        try {
          const res = await axios.get(`http://localhost:3000/designations/${designationId}`);
          setDesignation({
            name: res.data.data.name,
          });
        } catch (error) {
          console.error("Error fetching designation details:", error);
        }
      }
      fetchDesignationToEdit();
    }
  }, [designationId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDesignation({
      ...designation,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isEditing = designationId && designationId !== "";

    const url = isEditing
      ? `http://localhost:3000/designations/${designationId}`
      : `http://localhost:3000/designations`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await axios({
        url: url,
        method: method,
        data: designation,
      });

      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Designation Updated!" : "Designation Added!");
        setDesignation({ name: "" });
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
          <form id="designationForm" onSubmit={onSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="name">Designation Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Software Engineer"
                required
                value={designation.name}
                onChange={handleInput}
              />
            </div>

            <div className={styles["action-buttons"]}>
              <Button text="Add Designation" type="submit" variant="primary" />
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
