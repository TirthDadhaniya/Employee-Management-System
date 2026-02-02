import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/auth/register", data);
      reset();
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
          <form id="registerForm" className={styles["auth-form"]} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["form-group"]}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className={`${styles["form-control"]} ${errors.fullName ? styles["input-error"] : ""}`}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
              />
              {errors.fullName && <span className={styles["error-message"]}>{errors.fullName.message}</span>}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`${styles["form-control"]} ${errors.email ? styles["input-error"] : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <span className={styles["error-message"]}>{errors.email.message}</span>}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className={`${styles["form-control"]} ${errors.password ? styles["input-error"] : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password cannot exceed 50 characters",
                  },
                })}
              />
              {errors.password && <span className={styles["error-message"]}>{errors.password.message}</span>}
            </div>
            <Button type="submit" variant="primary" fullWidth={true} text={isSubmitting ? "Signing Up..." : "Sign Up"} disabled={isSubmitting} />
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
