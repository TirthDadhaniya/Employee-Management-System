import Navbar from "../../components/Navbar/Navbar";
import "./List.css";

function List() {
  return (
    <>
      <Navbar />
      <div className="split-container">
        <section className="list-section flex-1">
          <h3 className="section-header">All Salary Entries</h3>
          <div className="filter-container">
            <div className="filter-row">
              {/* Employee Filter */}
              <div className="filter-col-grow">
                <label className="filter-label">Employee</label>
                <select name="e_id" id="employeeDropdown" className="filter-input">
                  <option value="">All Employees</option>
                </select>
              </div>

              {/* From Date */}
              <div className="filter-col-auto">
                <label className="filter-label">From</label>
                <div className="date-inputs">
                  <select id="fromMonth" className="month-input">
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <select id="fromYear" className="year-input">
                    <option value="">Year</option>
                  </select>
                </div>
              </div>

              {/* To Date */}
              <div className="filter-col-auto">
                <label className="filter-label">To</label>
                <div className="date-inputs">
                  <select id="toMonth" className="month-input">
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <select id="toYear" className="year-input">
                    <option value="">Year</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="filter-actions">
                <button id="searchBtn" className="btn btn-primary btn-search">
                  Search
                </button>
                <button id="resetFilter" className="btn btn-secondary btn-clear">
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table id="salaryTable" className="display w-100">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="salaryTableBody"></tbody>
            </table>
          </div>

          <br className="mt-20" />

          <h3 className="section-header">All Employees</h3>
          <div className="table-responsive">
            <table id="employeeTable" className="display w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Designation</th>
                  <th>Joining Date</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="employeeTableBody"></tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
export default List;
