import React from "react";

interface Props {
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  extraClass?: string;
  min?: number;
  max?: number;
  pattern?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  extraInfo?: string;
  containerClass?: string;
}

export function SimpleInput({
  name,
  handleChange,
  type,
  required,
  placeholder,
  label,
  containerClass,
  extraClass,
  min,
  max,
  pattern,
  extraInfo,
}: Props): JSX.Element {
  return (
    <>
      <label className={containerClass}>
        <span className="label">{label}</span>
        <input
          type={type}
          className={"simple-input " + extraClass}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          minLength={min}
          maxLength={max}
          pattern={pattern}
        />
        {extraInfo && (
          <span className="block text-left text-xs font-light">
            {extraInfo}
          </span>
        )}
      </label>
    </>
  );
}
