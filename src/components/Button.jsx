import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "transparent",
  textColor = "text-white",
  hoverColor = "bg-emerald-400",
  borderColor = "border-slate-500",
  className = "",
  ...props
}) {
  return (
    <button
      className={` px-4 py-2 border ${borderColor} mr-5 rounded ${bgColor} ${textColor} ${className} dark:hover:text-slate-200 hover:text-slate-700 duration-100`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
