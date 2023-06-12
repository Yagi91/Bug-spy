import React from "react";

interface Props {
  type: string;
  name?: string;
  value?: string;
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
  value,
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
          name={name}
          value={value}
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

interface ConfirmModalProps{
  handleYes:(e:React.MouseEvent<HTMLButtonElement>)=>void;
  handleNo:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}

export const ConfirmModal = ({
  handleYes,
  handleNo
}:ConfirmModalProps) => {

  return(
    <div className='bg-white'>
      <h1>Confirm Action</h1>
      <div className="flex">
        <button className="btn-primary" onClick={handleYes}>Yes</button>
        <button className="btn-primary" onClick={handleNo}>No</button>
      </div>
    </div>
  )
}
