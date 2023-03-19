import React, { useState } from 'react';
import Select from 'react-select';


interface option {
    value: string;
    options: string;
}

export default function AddProject() {
    const dummyOptions = [
        { value: "Mary", options: "Mary" }, { value: "John", options: "John" }, { value: "Bob", options: "Bob" }, { value: "Jane", options: "Jane" }, { value: "Joe", options: "Joe" }, { value: "Sally", options: "Sally" }, { value: "Sue", options: "Sue" }, { value: "Tom", options: "Tom" }, { value: "Tim", options: "Tim" }, { value: "Bill", options: "Bill" }, { value: "Jill", options: "Jill" }]

    const [selectedOption, setSelectedOption] = useState<readonly option[]>([{ options: "", value: "" }]);


    return (
        <div>
            <h1>Add Project</h1>
            <form action="">
                <input name="name" type="text" placeholder="Project Name" />
                <input name="description" type="text" placeholder="Project Description" />
                <Select options={dummyOptions} defaultValue={selectedOption} isSearchable={true} isMulti onChange={(option: readonly option[]) => setSelectedOption(option)} />
            </form>
        </div>
    )
}