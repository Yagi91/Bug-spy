import React from "react";
import ListProjects from "./listProjects";
import AddProject from "./addProject";
import Select from "react-select";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SearchBar, FloatingButton } from "./common";
import {
  selectProjects,
  selectSort,
  selectFilterOwner,
  selectFilterStatus,
  fetchProjects,
  sortProjects,
  filterProjectsStatus,
  filterProjectsOwner,
  ProjectState,
  addNewProject,
} from "./projectSlice";

const sortOptions = ["Name", "Most bugs", "Newest", "Admin"].map((val) => ({
  value: val,
  label: val,
}));

export default function Projects(): JSX.Element {
  const [showAddProject, setShowAddProject] = React.useState(false);

  const user = useAppSelector((state) => state.auth.userInfo.name);

  const userEmail = useAppSelector((state) => state.auth.userInfo.email);

  const projects = useAppSelector(selectProjects);
  const sort = useAppSelector(selectSort);
  const filterOwner = useAppSelector(selectFilterOwner);
  const filterStatus = useAppSelector(selectFilterStatus);

  console.log(projects);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = React.useMemo(() => {
    if (projects.length > 0) {
      console.log("filtering");
      const filtered = projects
        .filter((project) => {
          if (filterStatus === "All") return true;
          if (filterStatus === "Completed" && project.progress === "Completed")
            return true;
          if (filterStatus === "Ongoing" && project.progress === "Ongoing")
            return true;
          return false;
        })
        .filter((projects) => {
          if (filterOwner === "All Projects") return true;
          if (filterOwner === "My Projects" && projects.admin === user)
            return true;
          return false;
        });
      return filtered;
    }
    return [];
  }, [projects, filterStatus, filterOwner, user]);

  const sortedProjects = React.useMemo(() => {
    console.log("sorting");
    return [...filteredProjects].sort((a, b) => {
      if (sort === "Name") return a.name.localeCompare(b.name);
      if (sort === "Most bugs") return b.bugs - a.bugs;
      if (sort === "Newest")
        return new Date(b.Created).getTime() - new Date(a.Created).getTime();
      if (sort === "Admin") return a.admin.localeCompare(b.admin);
      return 0;
    });
  }, [filteredProjects, sort]);

  const handleAddProjects = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const selectedMembers = formData.getAll("options") as string[];
    const admin = (userEmail as string) || "admin";
    formData.append("admin", admin);
    const newProject = { name, description, selectedMembers, admin };
    dispatch(addNewProject(newProject));
    handleShowAddProject();
    console.log(newProject);
  };

  const handleShowAddProject = () => {
    setShowAddProject(!showAddProject);
  };

  const listButton: JSX.Element = (
    <FloatingButton
      handleClick={handleShowAddProject}
      text="Add Project"
      icon="add"
    />
  );

  return (
    <section className="h-full w-full border p-1">
      <header className="flex justify-between">
        <SearchBar />
        <button
          className="btn-primary hidden items-center text-center text-[13px] sm:flex md:text-base"
          onClick={handleShowAddProject}
        >
          <span className="material-symbols-outlined text-[15px] md:text-base">
            add
          </span>
          <span>Add project</span>
        </button>
        {showAddProject && (
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center border bg-neutral-600 bg-opacity-30 p-2 shadow-xl transition-all`}
          >
            <AddProject
              handleCancel={handleShowAddProject}
              handleSubmit={handleAddProjects}
            />
          </div>
        )}
      </header>
      <div className="relative">
        <div>
          <p>Sort Projects</p>
          <Select
            options={sortOptions}
            onChange={(option: { value: string; label: string } | null) =>
              dispatch(
                sortProjects(
                  option ? (option.value as ProjectState["sort"]) : "Admin"
                )
              )
            }
            isSearchable={false}
          />
          <p>Filter Projects</p>
          <div>
            {["All", "Completed", "Ongoing"].map((val, index) => {
              //filter by project's status
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="filterStatus"
                    value={val}
                    checked={filterStatus === val}
                    onChange={(e) =>
                      dispatch(
                        filterProjectsStatus(
                          e.target.value as ProjectState["filterStatus"]
                        )
                      )
                    }
                  />
                  {val}
                </label>
              );
            })}
          </div>
          <div>
            {["All Projects", "My Projects"].map((val, index) => {
              //filter by owner/creator
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="filterOwner"
                    value={val}
                    checked={filterOwner === val}
                    onChange={(e) =>
                      dispatch(
                        filterProjectsOwner(
                          e.target.value as ProjectState["filterOwner"]
                        )
                      )
                    }
                  />
                  {val}
                </label>
              );
            })}
          </div>
        </div>
        <h1>Projects</h1>
        <ListProjects projects={sortedProjects} floatingButton={listButton} />
      </div>
    </section>
  );
}
