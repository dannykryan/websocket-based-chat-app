interface ButtonStyles {
    primary: string;
    outline: string;
    green: string;
    greenOutline: string;
    secondary: string;
    danger: string;
    decline: string;
}

const buttonStyles: ButtonStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  green: "bg-green-600 text-white hover:bg-green-700",
  greenOutline: "bg-transparent border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  decline: "bg-red-600 text-white hover:bg-red-700",
};

const Button = ({ 
  onClick, 
  btnStyle, 
  children,
  disabled,
  className,
}: { 
  onClick?: () => void;
  btnStyle?: keyof ButtonStyles;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${buttonStyles[btnStyle || "primary"]} px-4 py-2 rounded hover:cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : ""} ${className || ""}`}
    >
      {children || "Click Me"}
    </button>
  );
};

export default Button;
