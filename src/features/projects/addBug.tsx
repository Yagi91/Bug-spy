import React from "react";
import Select from "react-select";
import { SimpleInput } from "../common/common";

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const assigneeOptions = [
  { value: "1", label: "John" },
  { value: "2", label: "Jane" },
  { value: "3", label: "Joe" },
  { value: "4", label: "Sally" },
];

type options = {
  value: string;
  label: string;
};

interface Props {
  select1?: options[];
  select2?: options[];
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel?: () => void;
}

export const AddBugForm = ({
  select1 = priorityOptions,
  select2 = assigneeOptions,
  handleSubmit,
  handleCancel,
}: Props) => {
  // const [selectedPriority, setSelectedPriority] = React.useState("low");
  // const [selectedAssignee, setSelectedAssignee] = React.useState("1");

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleCancel}
      className="flex w-[500px] flex-col gap-3 rounded-[12px] border bg-white px-2 py-5"
    >
      <SimpleInput
        label="Title"
        name="tag" //TODO: know why name does not accept a value of title or name
        type=""
        placeholder="Title"
        max={25}
        required={true}
        extraClass="w-full"
      />
      <SimpleInput
        label="Description"
        name="description"
        type=""
        placeholder="Description"
        max={75}
        required={true}
        extraClass="w-full"
      />
      <Select
        name="priority"
        required={true}
        options={select1}
        placeholder="Select Priority..."
        onChange={(e) => console.log(e)}
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
        name="assignee"
        required={true}
        options={select2}
        placeholder="Assignee..."
        isSearchable={true}
        onChange={(e) => console.log(e)}
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
      <div className="flex gap-2">
        <button type="submit" className="btn-primary w-32">
          Add Bug
        </button>
        <button
          type="reset"
          className="btn-primary flex w-32 justify-center bg-secondary-500 hover:bg-secondary-600"
        >
          <span className="material-symbols-outlined">close</span>
          <span>Close</span>
        </button>
      </div>
    </form>
  );
};
