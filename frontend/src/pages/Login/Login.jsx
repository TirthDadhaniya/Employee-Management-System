import { useState } from "react";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <>
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <h2>Welcome Back</h2>
            <p>Please login to your account</p>
          </div>
          <form id="loginForm" class="auth-form" onSubmit={onSubmit}>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={loginData.email}
                onChange={handleInput}
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInput}
                required
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              Sign In
            </button>
          </form>
          <div class="auth-footer">
            <p>
              Don't have an account? <a href="register.html">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
