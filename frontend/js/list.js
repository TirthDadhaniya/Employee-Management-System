const API_BASE_URL = "http://localhost:3000";

let employeeTable;
let salaryTable;

$(document).ready(function () {
  renderYears();
  fetchEmployees();
  fetchSalaryEntries();

  $(document).on("click", ".delete-employee", function () {
    const eID = $(this).data("id");
    deleteEmployee(eID);
  });

  $(document).on("click", ".delete-salary", function () {
    const sID = $(this).data("id");
    deleteSalaryEntry(sID);
  });
});

async function fetchEmployees() {
  $.ajax({
    url: `${API_BASE_URL}/employees`,
    method: "GET",
    success: function (response) {
      if (employeeTable) {
        employeeTable.destroy();
      }

      const employees = response.data;
      let rows = "";

      employees.forEach((e) => {
        const initialSal = e.e_initialSalary !== undefined ? e.e_initialSalary : e.e_initialsalary || 0;
        const joining = e.e_dateOfJoining
          ? new Date(e.e_dateOfJoining).toLocaleDateString()
          : e.e_joining
            ? new Date(e.e_joining).toLocaleDateString()
            : "";

        rows += `
          <tr>
            <td>${e.e_name}</td>
            <td>${e.e_mail}</td>
            <td>${e.e_phone}</td>
            <td>${e.e_gender}</td>
            <td>${e.e_designation ? e.e_designation.name : "N/A"}</td>
            <td>${joining}</td>
            <td>${initialSal}</td>
            <td>
              <div class="action-buttons">
                <a class="btn btn-primary btn-sm" href="employee.html?id=${e._id}">Edit</a>
                <button class="btn btn-danger btn-sm delete-employee" data-id="${e._id}">Delete</button>
              </div>
            </td>
          </tr>
        `;
      });

      $("#employeeTableBody").html(rows);

      employeeTable = new DataTable("#employeeTable", {
        responsive: true,
        pageLength: 10,
        order: [[0, "asc"]],
        lengthMenu: [5, 10, 15, 20, 30, 50, 100, -1],
        language: {
          searchPlaceholder: "Search employees...",
          emptyTable: "No employees found",
        },
      });
    },
    error: function (err) {
      console.error(err);
      alert("Failed to load employees");
    },
  });
}

function deleteEmployee(eID) {
  if (!confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  $.ajax({
    url: `${API_BASE_URL}/employees/${eID}`,
    method: "DELETE",
    success: function () {
      alert("Employee deleted successfully");
      fetchEmployees();
    },
    error: function (err) {
      console.error(err);
      alert("Failed to delete employee");
    },
  });
}

async function fetchSalaryEntries() {
  await fetchEmployeesName();

  $.ajax({
    url: `${API_BASE_URL}/salary-entries`,
    method: "GET",
    success: function (response) {
      if (salaryTable) {
        salaryTable.destroy();
      }

      const list = response.data;
      let rows = "";
      const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      list.forEach((s) => {
        const empName = s.e_id ? s.e_id.e_name : "Unknown/Deleted";

        rows += `
                    <tr>
                        <td>${empName}</td>
                        <td>${monthNames[s.month]}</td>
                        <td>${s.year}</td>
                        <td>${s.salary}</td>
                        <td>
                            <div class="action-buttons">
                                <a class="btn btn-primary btn-sm" href="salary.html?id=${s._id}">Edit</a>
                                <button class="btn btn-danger btn-sm delete-salary" data-id="${s._id}">Delete</button>
                            </div>
                        </td>
                    </tr>
                `;
      });

      $("#salaryTableBody").html(rows);

      salaryTable = new DataTable("#salaryTable", {
        responsive: true,
        pageLength: 10,
        order: [
          [2, "desc"],
          [1, "desc"],
        ],
        language: {
          searchPlaceholder: "Search salaries...",
          emptyTable: "No salary entries found",
        },
      });
    },
    error: function (err) {
      console.error(err);
      alert("Failed to load salary entries");
    },
  });
}

$(document).on("click", "#searchBtn", () => {
  const selectedEmployee = $("#employeeDropdown").val();
  const fromMonth = $("#fromMonth").val();
  const fromYear = $("#fromYear").val();
  const toMonth = $("#toMonth").val();
  const toYear = $("#toYear").val();

  // Validate From Date pairs
  if ((fromMonth && !fromYear) || (!fromMonth && fromYear)) {
    alert("Please select both Month and Year for 'From' date");
    return;
  }

  // Validate To Date pairs
  if ((toMonth && !toYear) || (!toMonth && toYear)) {
    alert("Please select both Month and Year for 'To' date");
    return;
  }

  // Logic: "If i select from only ... if i select from and to both"
  // If user selects From (M+Y) but NOT To, it shows from that date to now/future.
  // If user selects To (M+Y) but NOT From, it shows everything up to that date.
  // If user select From and To, it shows range.

  let queryParams = [];
  if (selectedEmployee) queryParams.push(`e_id=${selectedEmployee}`);
  if (fromMonth) queryParams.push(`from_month=${fromMonth}`);
  if (fromYear) queryParams.push(`from_year=${fromYear}`);
  if (toMonth) queryParams.push(`to_month=${toMonth}`);
  if (toYear) queryParams.push(`to_year=${toYear}`);

  const queryString = queryParams.length > 0 ? "?" + queryParams.join("&") : "";

  $.ajax({
    url: `${API_BASE_URL}/salary-entries${queryString}`,
    method: "GET",
    success: function (response) {
      if (salaryTable) {
        salaryTable.destroy();
      }

      const list = response.data;
      let rows = "";
      const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      list.forEach((s) => {
        const empName = s.e_id ? s.e_id.e_name : "Unknown/Deleted";

        rows += `
                    <tr>
                        <td>${empName}</td>
                        <td>${monthNames[s.month]}</td>
                        <td>${s.year}</td>
                        <td>${s.salary}</td>
                        <td>
                            <div class="action-buttons">
                                <a class="btn btn-primary btn-sm" href="salary.html?id=${s._id}">Edit</a>
                                <button class="btn btn-danger btn-sm delete-salary" data-id="${s._id}">Delete</button>
                            </div>
                        </td>
                    </tr>
                `;
      });

      $("#salaryTableBody").html(rows);

      salaryTable = new DataTable("#salaryTable", {
        responsive: true,
        pageLength: 10,
        order: [
          [2, "desc"],
          [1, "desc"],
        ],
        language: {
          searchPlaceholder: "Search salaries...",
          emptyTable: "No salary entries found",
        },
      });
    },
    error: function (err) {
      console.error(err);
      alert("Failed to load filtered salary entries");
    },
  });
});

$(document).on("click", "#resetFilter", () => {
  $("#employeeDropdown").val("");
  $("#fromMonth").val("");
  $("#fromYear").val("");
  $("#toMonth").val("");
  $("#toYear").val("");
  fetchSalaryEntries();
});

function renderYears() {
  const currentYear = new Date().getFullYear();
  const $yearSelect = $("#fromYear, #toYear");
  $yearSelect.empty().append('<option value="">Year</option>');

  for (let i = 0; i <= 5; i++) {
    const year = currentYear - i;
    $yearSelect.append(`<option value="${year}">${year}</option>`);
  }
}

async function fetchEmployeesName() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE_URL}/employees`,
      method: "GET",
      success: function (response) {
        const employees = response.data;
        const $select = $("#employeeDropdown");
        $select.empty().append('<option value="">Filter by Employee</option>');

        employees.forEach((e) => {
          $select.append(`<option value="${e._id}">${e.e_name}</option>`);
        });
        resolve();
      },
      error: function (err) {
        console.error(err);
        resolve();
      },
    });
  });
}

function deleteSalaryEntry(sID) {
  if (!confirm("Are you sure you want to delete this salary entry?")) {
    return;
  }

  $.ajax({
    url: `${API_BASE_URL}/salary-entries/${sID}`,
    method: "DELETE",
    success: function () {
      alert("Salary entry deleted successfully");
      fetchSalaryEntries();
    },
    error: function (err) {
      console.error(err);
      alert("Failed to delete salary entry");
    },
  });
}
