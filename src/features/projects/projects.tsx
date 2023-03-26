import React from "react";
import ListProjects from "./listProjects";
import { Props as cardsProps } from "./projectCard";
import AddProject from "./addProject";
import Select from "react-select";
import { useAppSelector } from "../../app/hooks";
import { ListProjectsProps } from "./listProjects";
import { selectProjects, selectSort, selectFilterOwner, selectFilterStatus } from "./projectSlice";


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

    // const _projects = useAppSelector(selectProjects);
    console.log("rendering projects");


    const filteredProjects = React.useMemo(() => {
        if (selectProjects.length > 0) {
            const filtered = projects.filter((project) => {
                if (filter === "All") return true;
                if (filter === "Completed" && project.progress === "Completed") return true;
                if (filter === "Ongoing" && project.progress === "Ongoing") return true;
                return false;
            }).filter((projects) => {
                if (filter1 === "All Projects") return true;
                if (filter1 === "My Projects" && projects.admin === user) return true;
                return false;
            });
            return filtered;
        }
        return []

    }
        , [projects, filter, filter1, user]);

    const sortedProjects = React.useMemo(() => {
        return [...filteredProjects].sort((a, b) => {
            if (sort === "Name") return a.name.localeCompare(b.name);
            if (sort === "Most bugs") return b.bugs - a.bugs;
            if (sort === "Newest") return new Date(b.Created).getTime() - new Date(a.Created).getTime();
            if (sort === "Admin") return a.admin.localeCompare(b.admin);
            return 0;
        });
    }, [filteredProjects, sort]);

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
                        {["All", "Completed", "Ongoing"].map((val, index) => {//filter by status
                            return (
                                <label key={index}>
                                    <input type="radio" name="filterStatus" value={val} checked={filter === val} onChange={(e) => setFilter(e.target.value as FilterProject)} />
                                    {val}
                                </label>
                            );
                        })}
                    </div>
                    <div>
                        {["All Projects", "My Projects"].map((val, index) => {//filter by user
                            return (
                                <label key={index} >
                                    <input type="radio" name="filterOwner" value={val} checked={filter1 === val} onChange={(e) => setFilter1(e.target.value as FilterProject1)} />
                                    {val}
                                </label>
                            );
                        })}
                    </div>
                </div>
                <ListProjects projects={sortedProjects} />
            </div>
        </section>
    );
}
