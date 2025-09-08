import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode; // Exemple: <Clock /> ou <Calendar />
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  icon,
  readOnly = false,
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${icon ? "pl-10" : ""} ${className}`}
      />
    </div>
  );
};

export default Input;
