import "./Button.css";

const Button = ({ text, type = "button", className = "", onClick = null }) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
