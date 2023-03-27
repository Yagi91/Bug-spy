import React, { useState } from 'react';
import Select from 'react-select';


interface Props {
    options?: option[];
    handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

}

interface option {
    value: string;
    label: string;
    isDisabled?: boolean;

}

const dummyOptions: readonly option[] = [
    { value: "Mary", label: "Mary" }, { value: "John", label: "John" }, { value: "Bob", label: "Bob" }, { value: "Jane", label: "Jane" }, { value: "Joe", label: "Joe" }, { value: "Sally", label: "Sally" }, { value: "Sue", label: "Sue" }, { value: "Tom", label: "Tom" }, { value: "Tim", label: "Tim" }, { value: "Bill", label: "Bill" }, { value: "Jill", label: "Jill" }
];

export default function AddProject({ options, handleSubmit }: Props) {

    const [selectedOptions, setSelectedOptions] = useState<readonly option[] | null>(null);

    // console.log(selectedOptions, new Date().toDateString());


    return (
        <div>
            <h1>Add Project</h1>
            <form action="" onSubmit={handleSubmit}>
                <input required name="name" type="text" placeholder="Project Name" />
                <input required name="description" type="text" placeholder="Project Description" />
                <Select name='options' required options={dummyOptions} value={selectedOptions} isSearchable={true} isMulti onChange={(option: readonly option[]) => setSelectedOptions(option)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}