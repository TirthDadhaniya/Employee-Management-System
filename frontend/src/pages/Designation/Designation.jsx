import { useState } from "react";
import "./Designation.css";

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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(designation);
  };

  return (
    <>
      <div class="split-container">
        {/* <!-- Add Designation Form --> */}
        <section class="form-section">
          <h3 class="section-header">Add New Designation</h3>
          <form id="designationForm" onSubmit={onSubmit}>
            <div class="form-group">
              <label for="name">Designation Name</label>
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

            <div class="action-buttons">
              <button type="submit" class="btn btn-primary flex-1">
                Add Designation
              </button>
            </div>
          </form>
        </section>

        {/* <!-- Designation List --> */}
        <section class="list-section">
          <h3 class="section-header">Current Designations</h3>
          <div class="table-responsive">
            <table id="designationTable" class="display w-100">
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
