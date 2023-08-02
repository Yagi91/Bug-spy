import React, { FormEvent, useState } from "react";
import { SimpleInput } from "../../common/common";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

interface Props {
  name: string;
  status: "Ongoing" | "Completed";
  handleSubmit: (props: any) => void;
  handleCancel: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDelete: () => void;
  selectOptions: OptionType[];
}

const QuickEdit = ({
  name,
  status,
  handleDelete,
  handleSubmit,
  handleCancel,
  selectOptions,
}: Props) => {
  const [newName, setNewName] = useState<Props["name"]>("");
  const [newStatus, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const submitting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updated = {
      name: newName,
      status: newStatus,
    };
    if (newName !== "") updated.name = name;
    if (newStatus !== "") updated.status = status;
    return handleSubmit(updated);
  };
  const disableDisabled = (): boolean => {
    if (name === newName && status === newStatus) return true;
    if (newName === "" && newStatus === "") return true;
    return false;
  };

  return (
    <div className="modalContainer">
      <div>
        <h1 className="text-left text-2xl font-bold">Quick Edit</h1>
        <p className="text-left text-sm text-neutral-500">
          Make faster changes from here.
        </p>
      </div>
      <form
        onSubmit={submitting}
        onReset={handleCancel}
        className="flex w-full flex-col gap-3"
      >
        <SimpleInput
          type="text"
          label="Name"
          name="name"
          value={newName}
          handleChange={handleChange}
          required={true}
          placeholder={newName}
          max={25}
          extraClass="w-full"
        />
        <Select
          placeholder={status}
          isSearchable={false}
          options={selectOptions}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "0.75rem",
              borderWidth: "1px",
              textAlign: "left",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: state.isSelected ? "0.75rem" : "0",
              textAlign: "left",
            }),
          }}
          onChange={(newValue: OptionType | null) =>
            setStatus(newValue?.value as string)
          }
        />
        <fieldset className="self-start">
          <button
            type="submit"
            className="mr-2 w-fit rounded-xl bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disableDisabled()}
          >
            Confirm
          </button>
          <button
            type="reset"
            className="mr-2 w-fit rounded-xl bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="mr-2 w-fit rounded-xl border bg-neutral-100 px-4 py-2 font-bold text-gray-800 hover:bg-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleDelete}
          >
            Delete Project
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default QuickEdit;
