import React from "react";
import ListProjects from "./listProjects";
import { Props as cardsProps } from "./projectCard";
import AddProject from "./addProject";
import Select from "react-select";
import { useAppSelector } from "../../app/hooks";
import { ListProjectsProps } from "./listProjects";

const dummyData: Omit<cardsProps, "handleClick">[] = [
    {
        name: "Mary",
        bugs: 1,
        Created: "2021-01-01",
        admin: "Mary",
        progress: "Completed",
    },
    {
        name: "John",
        bugs: 2,
        Created: "2021-02-01",
        admin: "John",
        progress: "Ongoing",
    },
    {
        name: "Bob",
        bugs: 3,
        Created: "2021-03-01",
        admin: "Bob",
        progress: "Completed",
    },
    {
        name: "Jane",
        bugs: 4,
        Created: "2021-04-01",
        admin: "Jane",
        progress: "Ongoing",
    },
];

type SortProject = "Name" | "Most bugs" | "Newest" | "Admin";
type FilterProject = "All" | "Completed" | "Ongoing";
type FilterProject1 = "My Projects" | "All Projects";

const sortOptions = ["Name", "Most bugs", "Newest", "Admin"].map((val) => ({
    value: val,
    label: val,
}));

export default function Projects(): JSX.Element {
    const [projects, setProjects] = React.useState<ListProjectsProps[]>(dummyData);
    const [sort, setSort] = React.useState<SortProject>("Name");
    const [filter, setFilter] = React.useState<FilterProject>("All");
    const [filter1, setFilter1] = React.useState<FilterProject1>("All Projects");

    const user = useAppSelector((state) => state.auth.userInfo.name);

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
                setProjects(
                    [...projects].sort(
                        (a, b) =>
                            new Date(b.Created).getTime() - new Date(a.Created).getTime()
                    )
                );
                break;
            case "Admin":
                setProjects(
                    [...projects].sort((a, b) => a.admin.localeCompare(b.admin))
                );
                break;
            default:
                break;
        }
    }, [sort, projects]);
    React.useEffect(() => {
        //filter projects
        switch (filter) {
            case "All":
                setProjects(dummyData);
                break;
            case "Completed":
                setProjects(dummyData.filter((project) => project.progress === "Completed"));
                break;
            case "Ongoing":
                setProjects(dummyData.filter((project) => project.progress === "Ongoing"));
                break;
            default:
                break;
        }
    }, [filter]);
    React.useEffect(() => {
        //filter projects
        switch (filter1) {
            case "All Projects":
                setProjects(dummyData);
                break;
            case "My Projects":
                //get current login user name from data base
                setProjects(dummyData.filter((project) => project.admin === user));
                break;
            default:
                break;
        }
    }, [filter1, user]);



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
                    <Select
                        options={sortOptions}
                        onChange={(option: { value: string; label: string } | null) =>
                            setSort(option ? (option.value as SortProject) : "Admin")
                        }
                        isSearchable={false}
                    />
                    <p>Filter Projects</p>
                    <div>
                        {["All", "Completed", "Ongoing"].map((val, index) => {
                            return (
                                <label key={index}>
                                    <input type="radio" name="filterStatus" value={val} checked={filter === val} onChange={(e) => setFilter(e.target.value as FilterProject)} />
                                    {val}
                                </label>
                            );
                        })}
                    </div>
                    <div>
                        {["All Projects", "My Projects"].map((val, index) => {
                            return (
                                <label key={index} >
                                    <input type="radio" name="filterOwner" value={val} checked={filter1 === val} onChange={(e) => setFilter1(e.target.value as FilterProject1)} />
                                    {val}
                                </label>
                            );
                        })}
                    </div>
                </div>
                <ListProjects projects={projects} />
            </div>
        </section>
    );
}
