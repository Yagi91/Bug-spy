import React, { useEffect } from "react";
import ListProjects from "./listProjects";
import AddProject from "./addProject";
import Select from "react-select";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  SearchBar,
  FloatingButton,
  SwitchToggle,
  AnimatedRadioGroup as SortComponent,
  Modal,
} from "./common";
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
import { getUsers } from "../profile/userSlice";
const sortOptions = ["Name", "Most bugs", "Newest", "Admin"].map((val) => ({
  value: val,
  label: val,
}));

export default function Projects(): JSX.Element {
  const [showAddProject, setShowAddProject] = React.useState(false);

  // const user = useAppSelector((state) => state.auth.userInfo.name);

  const userId = useAppSelector((state) => state.auth.userInfo._id);
  const users = useAppSelector((state) => state.user.users);

  const projects = useAppSelector(selectProjects);
  const sort = useAppSelector(selectSort);
  const filterOwner = useAppSelector(selectFilterOwner);
  const filterStatus = useAppSelector(selectFilterStatus);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) return;
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getUsers(signal));
  }, [dispatch, users.length]);

  const filteredProjects = React.useMemo(() => {
    if (projects.length > 0) {
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
          if (filterOwner === "My Projects" && projects.admin._id === userId)
            return true;
          return false;
        });
      return filtered;
    }
    return [];
  }, [projects, filterStatus, filterOwner, userId]);

  const sortedProjects = React.useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (sort === "Name") return a.name.localeCompare(b.name);
      if (sort === "Most bugs") return b.totalBugs - a.totalBugs;
      if (sort === "Newest")
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      if (sort === "Admin") return a.admin.name.localeCompare(b.admin.name);
      return 0;
    });
  }, [filteredProjects, sort]);

  const handleAddProjects = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const selectedMembers = formData.getAll("options") as string[];
    const admin = userId as string;
    formData.append("admin", admin);
    const newProject = { name, description, selectedMembers, admin };
    await dispatch(addNewProject(newProject));
    await dispatch(fetchProjects());
    handleShowAddProject();
    return;
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

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(filterProjectsOwner("My Projects"));
    } else {
      dispatch(filterProjectsOwner("All Projects"));
    }
  };
  const sortAndFilterMembersOptions = React.useMemo(() => {
    return users
      .filter((user) => user._id !== userId)
      .map((user) => ({
        value: user._id,
        label: user.name,
        isDisabled: user._id === userId,
      }));
  }, [users, userId]);

  return (
    <section className="flex h-full w-full flex-col gap-1 p-1">
      <header className="flex justify-between rounded-[12px] bg-white px-1 py-2">
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
        <SwitchToggle
          val="My Projects"
          handleChange={handleSwitch}
          checked={filterOwner === "My Projects"}
          label="Admin"
          extraClass="sm:hidden"
        />
        {showAddProject && (
          <Modal>
            <AddProject
              handleCancel={handleShowAddProject}
              handleSubmit={handleAddProjects}
              options={sortAndFilterMembersOptions}
            />
          </Modal>
        )}
      </header>
      <div>
        <div className="flex items-center justify-evenly gap-1 rounded-xl border-b-2 bg-white px-1 py-2 text-xs sm:justify-start sm:gap-4 sm:text-sm md:text-sm">
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
            placeholder="Sort By"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                // borderColor: state.isFocused ? "grey" : "red",
                borderRadius: "1.5rem",
                borderWidth: "1px",
                textAlign: "left",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                textAlign: "left",
              }),
            }}
          />
          <SortComponent
            options={["All", "Completed", "Ongoing"]}
            icons={["", "check_circle", "clock_loader_60"]}
            handleChange={(e) =>
              dispatch(
                filterProjectsStatus(
                  e.target.value as ProjectState["filterStatus"]
                )
              )
            }
            selected={filterStatus}
          />
          <SwitchToggle
            val="My Projects"
            handleChange={handleSwitch}
            checked={filterOwner === "My Projects"}
            label="Admin"
            extraClass="hidden sm:flex text-base"
          />
        </div>
        <ListProjects projects={sortedProjects} floatingButton={listButton} />
      </div>
    </section>
  );
}
