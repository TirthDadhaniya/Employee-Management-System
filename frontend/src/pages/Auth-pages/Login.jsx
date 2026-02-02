import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);
      localStorage.setItem("token", res.data.token);
      reset();
      alert("Login Successful!");
      navigate("/list");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className={styles["auth-wrapper"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-header"]}>
            <h2>Welcome Back</h2>
            <p>Please login to your account</p>
          </div>
          <form id="loginForm" className={styles["auth-form"]} onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Enter your password"
                className={`${styles["form-control"]} ${errors.password ? styles["input-error"] : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <span className={styles["error-message"]}>{errors.password.message}</span>}
            </div>

            <Button type="submit" variant="primary" fullWidth={true} text={isSubmitting ? "Signing In..." : "Sign In"} disabled={isSubmitting} />
          </form>

          <div className={styles["auth-footer"]}>
            <p>
              Don't have an account? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
