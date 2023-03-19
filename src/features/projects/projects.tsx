import React from 'react';
import ListProjects from './listProjects';
import { Props as cardsProps } from './projectCard';
import AddProject from './addProject';
import Select from 'react-select';
import { type } from 'os';

const dummyData: cardsProps[] = [
    { name: "Mary", bugs: 1, Created: "2021-01-01", admin: "Mary", progress: "Completed", handleClick: () => { } },
    { name: "John", bugs: 2, Created: "2021-02-01", admin: "John", progress: "Ongoing", handleClick: () => { } },
    { name: "Bob", bugs: 3, Created: "2021-03-01", admin: "Bob", progress: "Completed", handleClick: () => { } },
    { name: "Jane", bugs: 4, Created: "2021-04-01", admin: "Jane", progress: "Ongoing", handleClick: () => { } },
]

type SortProject = "Name" | "Most bugs" | "Newest" | "Admin";
type FilterProject = "All" | "Completed" | "Ongoing";

const sortOptions = ["Name", "Most bugs", "Newest", "Admin"].map(val => ({ value: val, label: val }));


export default function Projects(): JSX.Element {

    const [projects, setProjects] = React.useState<cardsProps[]>(dummyData);
    const [sort, setSort] = React.useState<SortProject>("Name");
    const [filter, setFilter] = React.useState<FilterProject>("All");

    React.useEffect(() => {
        //sort projects
        switch (sort) {
            case "Name":
                setProjects([...projects].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            case "Most bugs":
                setProjects([...projects].sort((a, b) => b.bugs - a.bugs));
                break;
            case "Newest":
                setProjects([...projects].sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime()));
                break;
            case "Admin":
                setProjects([...projects].sort((a, b) => a.admin.localeCompare(b.admin)));
                break;
            default:
                break;
        }

    }, [sort, projects]);

    return (
        <section>
            <header>
                <h1>Projects</h1>
                <p>List of all the created projects</p>
            </header>
            <div>
                <AddProject />
                <div>
                    <p>Sort Projects</p>
                    <Select options={sortOptions} onChange={(option: { value: string, label: string } | null) => setSort(option ? option.value as "Name" | "Most bugs" | "Newest" | "Admin" : "Admin")} />
                    <p>Filter Projects</p>
                </div>
                <ListProjects projects={projects} />
            </div>
        </section>
    )
}