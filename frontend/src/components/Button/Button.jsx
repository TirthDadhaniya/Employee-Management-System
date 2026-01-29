import styles from "./Button.module.css";

const Button = ({
  text,
  type = "button",
  variant = "primary", // "primary" | "secondary" | "danger" | "success"
  fullWidth = false,
  onClick = null,
  disabled = false,
  className = "", // For additional custom classes if needed
}) => {
  // Build class names based on props
  const buttonClasses = [
    styles.btn,
    styles[`btn-${variant}`],
    fullWidth ? styles["btn-block"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
