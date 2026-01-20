const API_BASE_URL = "http://localhost:3000";
let designationTable;

$(document).ready(function () {
  fetchDesignations();

  // Validation
  if ($.fn.validate) {
    $("#designationForm").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
      },
      messages: {
        name: {
            required: "Designation name is required",
            minlength: "Designation name must be at least 2 characters"
        }
      },
      errorElement: "label",
      errorClass: "error",
      submitHandler: function (form) {
        addDesignation();
      },
    });
  }

  $(document).on("click", ".delete-designation", function () {
    const id = $(this).data("id");
    deleteDesignation(id);
  });
});

function fetchDesignations() {
  $.ajax({
    url: `${API_BASE_URL}/designations`,
    method: "GET",
    success: function (response) {
      const list = response.data;
      let rows = "";

      list.forEach((d) => {
        rows += `
                    <tr>
                        <td>${d.name}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-danger btn-sm delete-designation" data-id="${d._id}">Delete</button>
                            </div>
                        </td>
                    </tr>
                `;
      });

      if (designationTable) {
        designationTable.destroy();
      }

      $("#designationTableBody").html(rows);

      designationTable = new DataTable("#designationTable", {
        responsive: true,
        pageLength: 10,
        language: {
          emptyTable: "No designations found",
        },
      });
    },
    error: function (err) {
      console.error(err);
      alert("Failed to load designations");
    },
  });
}

function addDesignation() {
  const name = $("#name").val();

  $.ajax({
    url: `${API_BASE_URL}/designations`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ name }),
    success: function (res) {
      alert("Designation added successfully");
      $("#designationForm")[0].reset();
      fetchDesignations();
    },
    error: function (err) {
      console.error(err);
      alert(err.responseJSON?.message || "Failed to add designation");
    },
  });
}

function deleteDesignation(id) {
  if (!confirm("Are you sure? This might affect employees assigned to this designation.")) {
    return;
  }

  $.ajax({
    url: `${API_BASE_URL}/designations/${id}`,
    method: "DELETE",
    success: function () {
      alert("Designation deleted successfully");
      fetchDesignations();
    },
    error: function (err) {
      console.error(err);
      alert("Failed to delete designation");
    },
  });
}
