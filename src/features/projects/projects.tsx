import React from "react";
import ListProjects from "./listProjects";
import { Props as cardsProps } from "./projectCard";
import AddProject from "./addProject";
import Select from "react-select";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ListProjectsProps } from "./listProjects";
import { selectProjects, selectSort, selectFilterOwner, selectFilterStatus, fetchProjects, sortProjects, filterStatus, filterOwner } from "./projectSlice";


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

    const _projects = useAppSelector(selectProjects);
    const _sort = useAppSelector(selectSort);
    const _filterOwner = useAppSelector(selectFilterOwner);
    const _filterStatus = useAppSelector(selectFilterStatus);

    const dispatch = useAppDispatch();

    console.log("rendering projects");


    React.useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);


    const filteredProjects = React.useMemo(() => {
        if (selectProjects.length > 0) {
            const filtered = _projects.filter((project) => {
                if (_filterStatus === "All") return true;
                if (_filterStatus === "Completed" && project.progress === "Completed") return true;
                if (_filterStatus === "Ongoing" && project.progress === "Ongoing") return true;
                return false;
            }).filter((projects) => {
                if (_filterOwner === "All Projects") return true;
                if (_filterOwner === "My Projects" && projects.admin === user) return true;
                return false;
            });
            return filtered;
        }
        return []

    }
        , [_projects, _filterStatus, _filterOwner, user]);

    const sortedProjects = React.useMemo(() => {
        return [...filteredProjects].sort((a, b) => {
            if (_sort === "Name") return a.name.localeCompare(b.name);
            if (_sort === "Most bugs") return b.bugs - a.bugs;
            if (_sort === "Newest") return new Date(b.Created).getTime() - new Date(a.Created).getTime();
            if (_sort === "Admin") return a.admin.localeCompare(b.admin);
            return 0;
        });
    }, [filteredProjects, _sort]);

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
                            sortProjects(option ? (option.value as SortProject) : "Admin")
                        }
                        isSearchable={false}
                    />
                    <p>Filter Projects</p>
                    <div>
                        {["All", "Completed", "Ongoing"].map((val, index) => {//filter by project's status
                            return (
                                <label key={index}>
                                    <input type="radio" name="filterStatus" value={val} checked={_filterStatus === val} onChange={(e) => dispatch(filterStatus(e.target.value as FilterProject))} />
                                    {val}
                                </label>
                            );
                        })}
                    </div>
                    <div>
                        {["All Projects", "My Projects"].map((val, index) => {//filter by owner/creator
                            return (
                                <label key={index} >
                                    <input type="radio" name="filterOwner" value={val} checked={_filterOwner === val} onChange={(e) => dispatch(filterOwner(e.target.value as FilterProject1))} />
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
