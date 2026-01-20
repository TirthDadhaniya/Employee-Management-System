const API_BASE_URL = "http://localhost:3000";
let salaryTable;

$(document).ready(function () {
  initialize();

  // Validation
  $("#salaryForm").validate({
    rules: {
      e_id: "required",
      year: "required",
      month: "required",
      salary: {
        required: true,
        number: true,
        min: 0,
      },
    },
    messages: {
      e_id: "Please select an employee",
      year: "Please select a year",
      month: "Please select a month",
      salary: {
        required: "Salary amount is required",
        number: "Please enter a valid number",
        min: "Salary cannot be negative",
      },
    },
    errorElement: "label",
    errorClass: "error",
    submitHandler: function (form) {
      submitSalary();
    },
  });

  // Reset Button
  $("#resetBtn").on("click", function () {
    resetForm();
  });

  // Edit/Delete handlers
  $(document).on("click", ".edit-salary", function () {
    const id = $(this).data("id");
    fetchSalaryForEdit(id);
  });

  $(document).on("click", ".delete-salary", function () {
    const id = $(this).data("id");
    deleteSalary(id);
  });
});

async function initialize() {
  renderYears();
  await fetchEmployees();
  fetchSalaries();

  // Check if ID is in URL for edit
  const sId = getQueryParam("id");
  if (sId) {
    fetchSalaryForEdit(sId);
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function renderYears() {
  const currentYear = new Date().getFullYear();
  const $yearSelect = $("#yearDropdown");
  $yearSelect.empty().append('<option value="">Select Year</option>');

  for (let i = 0; i <= 5; i++) {
    const year = currentYear - i;
    $yearSelect.append(`<option value="${year}">${year}</option>`);
  }
}

function fetchEmployees() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE_URL}/employees`,
      method: "GET",
      success: function (response) {
        const employees = response.data;
        const $select = $("#employeeDropdown");
        $select.empty().append('<option value="">Select Employee</option>');

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

function fetchSalaries() {
  $.ajax({
    url: `${API_BASE_URL}/salary-entries`,
    method: "GET",
    success: function (response) {
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
                                <button class="btn btn-primary btn-sm edit-salary" data-id="${s._id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-salary" data-id="${s._id}">Delete</button>
                            </div>
                        </td>
                    </tr>
                `;
      });

      if (salaryTable) {
        salaryTable.destroy();
      }

      $("#salaryTableBody").html(rows);

      salaryTable = new DataTable("#salaryTable", {
        responsive: true,
        pageLength: 10,
        order: [
          [2, "desc"],
          [1, "desc"],
        ],
        language: {
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

function submitSalary() {
  const id = $("#salary_id").val();

  const formData = {
    e_id: $("#employeeDropdown").val(),
    year: $("#yearDropdown").val(),
    month: $("#monthDropdown").val(),
    salary: $("input[name='salary']").val(),
  };

  let method = "POST";
  let url = `${API_BASE_URL}/salary-entries`;

  if (id) {
    method = "PUT";
    url = `${API_BASE_URL}/salary-entries/${id}`;
  }

  $.ajax({
    url: url,
    method: method,
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (res) {
      alert(id ? "Salary entry updated successfully" : "Salary entry added successfully");
      resetForm();
      fetchSalaries();
    },
    error: function (err) {
      console.error(err);
      alert(err.responseJSON?.message || "Failed to save salary entry");
    },
  });
}

function fetchSalaryForEdit(id) {
  $.ajax({
    url: `${API_BASE_URL}/salary-entries/${id}`,
    method: "GET",
    success: function (response) {
      const data = response.data;

      $("#salary_id").val(data._id);
      $("#employeeDropdown").val(data.e_id ? data.e_id._id : data.e_id);
      $("#yearDropdown").val(data.year);
      $("#monthDropdown").val(data.month);
      $("input[name='salary']").val(data.salary);

      $("#resetBtn").removeClass("hidden");
      $("button[type='submit']").text("Update Entry");

      if ($(".form-section").length) {
        $("html, body").animate(
          {
            scrollTop: $(".form-section").offset().top - 20,
          },
          500,
        );
      }
    },
    error: function (err) {
      console.error(err);
      alert("Failed to fetch salary data");
    },
  });
}

function deleteSalary(id) {
  if (!confirm("Are you sure you want to delete this salary entry?")) {
    return;
  }

  $.ajax({
    url: `${API_BASE_URL}/salary-entries/${id}`,
    method: "DELETE",
    success: function () {
      alert("Salary entry deleted successfully");
      fetchSalaries();
    },
    error: function (err) {
      console.error(err);
      alert("Failed to delete salary entry");
    },
  });
}

function resetForm() {
  $("#salaryForm")[0].reset();
  $("#salary_id").val("");
  $("#resetBtn").addClass("hidden");
  $("button[type='submit']").text("Save Entry");

  if ($.fn.validate) {
    var validator = $("#salaryForm").validate();
    validator.resetForm();
  }
}
