import React, { useState } from "react";
import Select from "react-select";
import { SimpleInput } from "../auth/commons";

interface Props {
  options?: option[];
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  display?: boolean;
  handleCancel?: () => void;
}

interface option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

const dummyOptions: readonly option[] = [
  { value: "Mary", label: "Mary" },
  { value: "John", label: "John" },
  { value: "Bob", label: "Bob" },
  { value: "Jane", label: "Jane" },
  { value: "Joe", label: "Joe" },
  { value: "Sally", label: "Sally" },
  { value: "Sue", label: "Sue" },
  { value: "Tom", label: "Tom" },
  { value: "Tim", label: "Tim" },
  { value: "Bill", label: "Bill" },
  { value: "Jill", label: "Jill" },
];

// This code renders a form for creating a new project.
// The form consists of the following fields:
export default function AddProject({
  options,
  handleSubmit,
  display,
  handleCancel,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<
    readonly option[] | null
  >(null);

  const show = display ? "block" : "hidden";

  console.log(display, show);
  return (
    <div
      className={`w-fit rounded-xl border border-secondary-300 bg-white px-2 py-4 ${show}`}
    >
      <h1 className="mb-2 text-left font-bold">New Project</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8">
        <fieldset className="flex w-full gap-2">
          {/* // * Project name: A text field for the project name. */}
          <SimpleInput
            label="Project Name"
            name="name"
            type="text"
            placeholder="Project Name"
            max={25}
            required={true}
            extraClass="w-full"
            containerClass="w-1/2"
          />
          {/* // * Description: A text field for the project description. */}
          <SimpleInput
            label="Description"
            name="description"
            type="text"
            placeholder="Project Description"
            max={75}
            required={true}
            extraClass="w-full"
            containerClass="w-1/2"
          />
        </fieldset>
        {/* // * Users: A select field for selecting users to add to the project. */}
        <Select
          name="options"
          required
          options={dummyOptions}
          value={selectedOptions}
          isSearchable={true}
          isMulti
          placeholder="Select Users..."
          onChange={(option: readonly option[]) => setSelectedOptions(option)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "0.75rem",
              borderWidth: "2px",
              textAlign: "left",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: state.isSelected ? "0.75rem" : "0",
              textAlign: "left",
            }),
          }}
        />
        <div className="flex justify-start gap-2">
          {/* // The form submits to the current URL. */}
          <button type="submit" className="btn-primary">
            Submit
          </button>
          {/* // The form resets the fields and close the form */}
          <button
            type="reset"
            className="btn-primary flex bg-secondary-500 hover:bg-secondary-600"
            onClick={handleCancel}
          >
            <span className="material-symbols-outlined mr-2">close</span>
            <span>Close</span>
          </button>
        </div>
      </form>
    </div>
  );
}
