const API_BASE_URL = "http://localhost:3000";

$(document).ready(function () {
  $("#registerForm").validate({
    rules: {
      fullName: "required",
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 30,
      },
    },
    messages: {
      name: "Please enter Full Name",
      email: {
        required: "Email address is required",
        email: "Please enter a valid email address",
      },
      password: {
        required: "Password is required",
        minlength: "Password must be at least 5 characters",
        maxlength: "Password cannot exceed 30 characters",
      },
    },
    errorElement: "label",
    errorClass: "error",
    submitHandler: function (form) {
      const formData = Object.fromEntries(new FormData(form));

      $.ajax({
        url: `${API_BASE_URL}/auth/register`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (res) {
          console.log("Register successful:", res);
          alert("Registration successful! Please login.");
          window.location.href = "login.html";
        },
        error: function (xhr, status, error) {
          console.error("Register failed:", xhr.responseText);
          alert("Registration failed: " + (xhr.responseJSON?.error || "Unknown error"));
        },
      });
    },
  });
});
