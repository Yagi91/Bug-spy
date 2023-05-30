import React from "react";
import Select from "react-select";

export const AddBugForm = ({ id }: { id: string }) => {
  // const [selectedPriority, setSelectedPriority] = React.useState("low");
  // const [selectedAssignee, setSelectedAssignee] = React.useState("1");

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

  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className="rounded-md border p-1"
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        className="rounded-md border p-1"
      />
      <Select
        options={priorityOptions}
        placeholder="Select Role..."
        onChange={(e) => console.log(e)}
      />
      <Select
        options={assigneeOptions}
        placeholder="Assignee..."
        onChange={(e) => console.log(e)}
      />
      <button type="submit" className="btn-primary">
        Add Bug
      </button>
    </form>
  );
};
