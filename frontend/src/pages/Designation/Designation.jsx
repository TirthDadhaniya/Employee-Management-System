import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Designation.css";
import Navbar from "../../components/Navbar/Navbar";

function fetchDesignations() {
  return fetch("http://localhost:3000/designations")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching designations:", error);
      return [];
    });
}

function Designation() {
  const [designation, setDesignation] = useState({
    name: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDesignation({
      ...designation,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", designation);
    try {
      const res = await fetch("http://localhost:3000/designations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(designation),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Designation added:", data);
        setDesignation({ name: "" }); // Clear form
        // navigate(0); // Refresh the page to show updated list
      }
    } catch (error) {
      console.error("Error adding designation:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="split-container">
        {/* Add Designation Form */}
        <section className="form-section">
          <h3 className="section-header">Add New Designation</h3>
          <form id="designationForm" onSubmit={onSubmit}>
            <div className="form-group">
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

            <div className="action-buttons">
              <button type="submit" className="btn btn-primary flex-1">
                Add Designation
              </button>
            </div>
          </form>
        </section>

        {/* Designation List */}
        <section className="list-section">
          <h3 className="section-header">Current Designations</h3>
          <div className="table-responsive">
            <table id="designationTable" className="display w-100">
              <thead>
                <tr>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="designationTableBody"></tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
export default Designation;
