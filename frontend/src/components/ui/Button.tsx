import React, {type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = "",
}) => {
  let baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none";

  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses = `bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`;
      break;
    case "secondary":
      variantClasses = `bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed`;
      break;
    case "danger":
      variantClasses = `bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed`;
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <div className="flex items-center justify-center gap-2 py-2">
         {children}
      </div>
     
    </button>
  );
};

export default Button;
