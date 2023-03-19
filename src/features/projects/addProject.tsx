import React, { useState } from 'react';
import Select from 'react-select';


interface Props {
    options?: option[];

}

interface option {
    value: string;
    label: string;
}

const dummyOptions: readonly option[] = [
    { value: "Mary", label: "Mary" }, { value: "John", label: "John" }, { value: "Bob", label: "Bob" }, { value: "Jane", label: "Jane" }, { value: "Joe", label: "Joe" }, { value: "Sally", label: "Sally" }, { value: "Sue", label: "Sue" }, { value: "Tom", label: "Tom" }, { value: "Tim", label: "Tim" }, { value: "Bill", label: "Bill" }, { value: "Jill", label: "Jill" }
];

export default function AddProject({ options }: Props) {


    const [selectedOption, setSelectedOption] = useState<readonly option[]>([{ label: "", value: "" }]);


    return (
        <div>
            <h1>Add Project</h1>
            <form action="" >
                <input name="name" type="text" placeholder="Project Name" />
                <input name="description" type="text" placeholder="Project Description" />
                <Select options={dummyOptions} isSearchable={true} isMulti onChange={(option: readonly option[]) => setSelectedOption(option)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}