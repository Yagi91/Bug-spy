import React from "react";
import Select from "react-select";

const dummyOptions = [
  { value: "Mary", label: "Mary" },
  { value: "John", label: "John" },
  { value: "Bob", label: "Bob" },
];
interface option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

interface Props {
  options?: option[];
  handleSubmit: (
    e: React.FormEvent<HTMLButtonElement>,
    selected: option[]
  ) => void;
}

const AddMembers = ({ options = dummyOptions, handleSubmit }: Props) => {
  const [selectedMembers, setSelectedMembers] = React.useState<
    readonly option[] | null
  >([]);

  return (
    <div className="flex h-[300px] w-[500px] flex-col justify-center gap-8 rounded-[12px] bg-white p-4">
      <div>
        <h1 className="text-left text-2xl font-bold">Add Members</h1>
        <p className="text-left text-sm text-neutral-500">
          Select members to add to this project. The person will be notified
          after saving.
        </p>
      </div>
      <Select
        options={options}
        placeholder="Select members"
        isSearchable={true}
        onChange={(option: readonly option[]) => setSelectedMembers(option)}
        isMulti
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
      <button
        className="btn-primary w-[100px]"
        onClick={(e) => handleSubmit(e, selectedMembers as option[])}
      >
        Save
      </button>
    </div>
  );
};

export default AddMembers;
