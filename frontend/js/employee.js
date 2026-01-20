const API_BASE_URL = "http://localhost:3000";
let employeeTable;

$(document).ready(function () {
  initialize();

  // Validation
  if ($.fn.validate) {
    $("#employeeForm").validate({
      rules: {
        e_name: "required",
        e_mail: {
          required: true,
          email: true,
        },
        e_phone: {
          required: true,
          minlength: 10,
          maxlength: 10,
        },
        employee_gender: "required",
        e_designation: "required",
        e_joining: "required",
        e_initialsalary: {
          required: true,
          number: true,
          min: 0,
        },
      },
      messages: {
        e_name: "Please enter the employee's full name",
        e_mail: {
          required: "Email address is required",
          email: "Please enter a valid email address",
        },
        e_phone: {
          required: "Phone number is required",
          minlength: "Phone number must be at least 10 digits",
        },
        employee_gender: "Please select a gender",
        e_designation: "Please select a designation",
        e_joining: "Date of joining is required",
        e_initialsalary: {
          required: "Initial salary is required",
          number: "Please enter a valid number",
          min: "Salary cannot be negative",
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") == "employee_gender") {
          error.insertAfter(element.closest(".gender-radio-group"));
        } else {
          error.insertAfter(element);
        }
      },
      errorElement: "label",
      errorClass: "error",
      submitHandler: function (form) {
        submitEmployee();
      },
    });
  }

  // Reset Button
  $("#resetBtn").on("click", function () {
    resetForm();
  });

  // Edit/Delete handlers
  $(document).on("click", ".edit-employee", function () {
    const id = $(this).data("id");
    fetchEmployeeForEdit(id);
  });

  $(document).on("click", ".delete-employee", function () {
    const id = $(this).data("id");
    deleteEmployee(id);
  });
});

async function initialize() {
  await loadDesignations();
  fetchEmployees();

  const eID = getQueryParam("id");
  if (eID) {
    fetchEmployeeForEdit(eID);
  }
}

function fetchEmployees() {
  $.ajax({
    url: `${API_BASE_URL}/employees`,
    method: "GET",
    success: function (response) {
      const employees = response.data;
      let rows = "";

      employees.forEach((e) => {
        rows += `
          <tr>
            <td>${e.e_name}</td>
            <td>${e.e_mail}</td>
            <td>${e.e_designation ? e.e_designation.name : "N/A"}</td>
            <td>
              <div class="action-buttons">
                <button class="btn btn-primary btn-sm edit-employee" data-id="${e._id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-employee" data-id="${e._id}">Delete</button>
              </div>
            </td>
          </tr>
        `;
      });

      if (employeeTable) {
        employeeTable.destroy();
      }

      $("#employeeTableBody").html(rows);

      employeeTable = new DataTable("#employeeTable", {
        responsive: true,
        pageLength: 10,
        language: {
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

function loadDesignations() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE_URL}/designations`,
      method: "GET",
      success: function (response) {
        const designations = response.data;
        const $select = $('select[name="e_designation"]');
        $select.empty().append('<option value="">Select Designation</option>');

        designations.forEach((d) => {
          $select.append(`<option value="${d._id}">${d.name}</option>`);
        });
        resolve();
      },
      error: function (err) {
        console.error("Failed to load designations", err);
        resolve();
      },
    });
  });
}

function submitEmployee() {
  const gender = $("input[name='employee_gender']:checked").val();
  const db_id = $("#db_id").val();

  const formData = {
    e_name: $("input[name='e_name']").val(),
    e_mail: $("input[name='e_mail']").val(),
    e_phone: $("input[name='e_phone']").val(),
    e_gender: gender,
    e_designation: $("select[name='e_designation']").val(),
    e_dateOfJoining: $("input[name='e_joining']").val(),
    e_initialSalary: $("input[name='e_initialsalary']").val(),
  };

  let method = "POST";
  let url = `${API_BASE_URL}/employees`;

  if (db_id) {
    method = "PUT";
    url = `${API_BASE_URL}/employees/${db_id}`;
  }

  $.ajax({
    url: url,
    method: method,
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: function (res) {
      alert(db_id ? "Employee updated successfully" : "Employee added successfully");
      resetForm();
      fetchEmployees();
    },
    error: function (err) {
      console.error(err);
      alert(err.responseJSON?.message || "Failed to save employee");
    },
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function fetchEmployeeForEdit(eID) {
  $.ajax({
    url: `${API_BASE_URL}/employees/${eID}`,
    method: "GET",
    success: function (response) {
      const res = response.data;

      $("#db_id").val(res._id);
      $('input[name="e_name"]').val(res.e_name);
      $('input[name="e_mail"]').val(res.e_mail);
      $('input[name="e_phone"]').val(res.e_phone);

      const desId = res.e_designation && res.e_designation._id ? res.e_designation._id : res.e_designation;
      $('select[name="e_designation"]').val(desId);

      $('input[name="e_joining"]').val(
        res.e_dateOfJoining ? res.e_dateOfJoining.split("T")[0] : res.e_joining ? res.e_joining.split("T")[0] : "",
      );
      const initialSal = res.e_initialSalary !== undefined ? res.e_initialSalary : res.e_initialsalary;
      $('input[name="e_initialsalary"]').val(initialSal);

      $(`input[name='employee_gender'][value='${res.e_gender}']`).prop("checked", true);

      $("#resetBtn").removeClass("hidden");
      $("button[type='submit']").text("Update Employee");

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
      alert("Failed to load employee data");
    },
  });
}

function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  $.ajax({
    url: `${API_BASE_URL}/employees/${id}`,
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

function resetForm() {
  $("#employeeForm")[0].reset();
  $("#db_id").val("");
  $("#resetBtn").addClass("hidden");
  $("button[type='submit']").text("Save Employee");

  if ($.fn.validate) {
    var validator = $("#employeeForm").validate();
    validator.resetForm();
  }
}
