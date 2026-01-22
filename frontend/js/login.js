const API_BASE_URL = "http://localhost:3000";

$(document).ready(function () {
  $("#loginForm").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Email address is required",
        email: "Please enter a valid email address",
      },
      password: {
        required: "Password is required",
      },
    },
    errorElement: "label",
    errorClass: "error",

    submitHandler: function (form) {
      const formData = Object.fromEntries(new FormData(form));

      $.ajax({
        url: `${API_BASE_URL}/auth/login`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (res) {
          console.log("Login successful:", res);
          window.location.href = "list.html";
        },
        error: function (xhr, status, error) {
          console.error("Login failed:", xhr.responseText);
          alert("Login failed: " + (xhr.responseJSON?.error || "Unknown error"));
        },
      });
    },
    error: function (err) {
      console.error("Login failed:", err);
    },
  });
});
