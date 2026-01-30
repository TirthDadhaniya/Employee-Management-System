import { useState } from "react";
import axios from "axios";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

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

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", registerData);
      setRegisterData({ fullName: "", email: "", password: "" });
      alert("Registration Successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className={styles["auth-wrapper"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-header"]}>
            <h2>Create Account</h2>
            <p>Register to get started</p>
          </div>
          <form id="registerForm" className={styles["auth-form"]} onSubmit={onSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={registerData.fullName}
                onChange={handleInput}
                required
                className={styles["form-control"]}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleInput}
                required
                className={styles["form-control"]}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={registerData.password}
                onChange={handleInput}
                required
                className={styles["form-control"]}
              />
            </div>
            <Button type="submit" variant="primary" fullWidth={true} text="Sign Up" />
          </form>
          <div className={styles["auth-footer"]}>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
