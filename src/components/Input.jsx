import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block pl-1 mb-1 " htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`
            border border-slate-600 p-2 outline-none focus:outline
            mb-2 w-full
            bg-slate-800
            rounded
            ${className}
            `}
            {...props}
            ref={ref}
      ></input>
    </div>
  );
});

export default Input;
