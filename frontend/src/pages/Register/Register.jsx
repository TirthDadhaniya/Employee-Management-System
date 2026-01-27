import { useState } from "react";

function Register() {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
  };

  return (
    <>
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <h2>Create Account</h2>
            <p>Register to get started</p>
          </div>
          <form id="registerForm" class="auth-form" onSubmit={onSubmit}>
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={registerData.fullName}
                onChange={handleInput}
                required
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleInput}
                required
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={registerData.password}
                onChange={handleInput}
                required
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              Sign Up
            </button>
          </form>
          <div class="auth-footer">
            <p>
              Already have an account? <a href="login.html">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
