import React from "react";
import { SimpleInput } from "../common/common";
import Select from "react-select";

type Option = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export interface Props {
  defVal1?: string;
  defVal2?: string;
  option1?: Option[];
  option2?: Option[];
  defOption1?: Option | null;
  defOption2?: Option | null;
  handleSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EditForm = ({
  defVal1,
  defVal2,
  option1,
  option2,
  defOption1 = null,
  defOption2 = null,
  handleSubmit,
  handleClose,
}: Props) => {
  const [select1, setSelect1] = React.useState<Option | null>(defOption1);
  const [select2, setSelect2] = React.useState<Option | null>(defOption2);
  const [text1, setText1] = React.useState<string>(defVal1 || "");
  const [text2, setText2] = React.useState<string>(defVal2 || "");

  return (
    <form className="flex h-[300px] w-[500px] flex-col justify-center gap-4 rounded-[12px] bg-white p-4">
      <fieldset className="flex flex-col gap-2">
        <SimpleInput
          label="Title"
          name="title"
          type="text"
          value={text1}
          placeholder="Project Name"
          max={25}
          required={true}
          extraClass="w-full"
          containerClass=""
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText1(e.currentTarget.value)
          }
        />
        <SimpleInput
          label="Short Description"
          name="description"
          type="text"
          value={text2}
          placeholder="Project Description"
          max={75}
          required={true}
          extraClass="w-full"
          containerClass=""
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText2(e.currentTarget.value)
          }
        />
      </fieldset>
      <fieldset className="flex gap-4">
        <Select
          options={option1}
          placeholder="Status"
          value={select1}
          onChange={(option: Option | null) => setSelect1(option)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "0.75rem",
              borderWidth: "1px",
              boxShadow: "none",
              textAlign: "left",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: state.isSelected ? "0.75rem" : "0",
              textAlign: "left",
            }),
          }}
        />
        <Select
          options={option2}
          placeholder="Severity"
          value={select2}
          onChange={(option: Option | null) => setSelect2(option)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "0.75rem",
              borderWidth: "1px",
              boxShadow: "none",
              textAlign: "left",
              // display: "none",
              display: option2 ? "flex" : "none",
              //add the display key to the object and set it to none when option2 is null
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: state.isSelected ? "0.75rem" : "0",
              textAlign: "left",
            }),
          }}
        />
      </fieldset>
      <fieldset className="flex justify-start gap-4">
        <button
          type="submit"
          className="btn-primary w-28"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          type="reset"
          className="btn-primary flex w-28 justify-center bg-secondary-500 hover:bg-secondary-600"
          onClick={handleClose}
        >
          <span className="material-symbols-outlined">close</span>
          <span>Reset</span>
        </button>
      </fieldset>
    </form>
  );
};

export default EditForm;
