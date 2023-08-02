import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectProjectSummary,
  selectProjectMembers,
  selectProjectBugs,
  selectLoading,
  selectError,
  getProjectDetails,
  deleteProjectDetails,
  clearProjectDetails,
} from "./projectDetailSlice";
import { Props as EditFormProps } from "./edit";
import { getUsers, selectUsers } from "../profile/userSlice";
import { update } from "../myTickets/api-bugs";
import BugList from "./common/bugList";
import ProjectSummary from "./common/projectSummary";
import ProjectDetailsComponent from "./common/projectDetailsComponent";

interface Props {
  projectName: string;
}

export default function ProjectDetails({ projectName }: Props) {
  const [showMembers, setShowMembers] = React.useState<boolean>(false);
  const [addingBug, setAddingBug] = React.useState<boolean>(false);
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const [editFormFields, setEditFormFields] =
    React.useState<EditFormProps | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectSummary = useAppSelector(selectProjectSummary);
  const projectMembers = useAppSelector(selectProjectMembers);
  const projectBugs = useAppSelector(selectProjectBugs);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getProjectDetails(projectName as string));
    return () => {
      dispatch(clearProjectDetails());
    };
  }, [dispatch, projectName]);

  useEffect(() => {
    if (users.length > 0) return;
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getUsers(signal));
    // return () => {
    //   controller.abort();
    // };
  }, [dispatch, users.length]);

  const deleteProject = async function (): Promise<void> {
    console.log("Deleting Project");
    dispatch(deleteProjectDetails(projectSummary?.id as string));
    navigate(-1);
    console.log("Project Deleted");
    return;
  };

  const handleAddingBug = function (): void {
    setAddingBug(!addingBug);
  };

  const handleOpenEdit = function (formField: EditFormProps): void {
    setEditFormFields(formField);
    setShowEdit(true);
  };
  const handleCloseEdit = function (): void {
    setShowEdit(false);
    setEditFormFields(null);
  };

  const handleEditBug = async function (props: {
    title: string;
    description: string;
    priority: string;
    progress: string;
    id: string;
  }): Promise<void> {
    console.log(props);
    const jwt = sessionStorage.getItem("jwt");
    const bugChanges = {
      name: props.title,
      description: props.description,
      status: props.progress,
      priority: props.priority,
    };
    const bugId = props.id;
    try {
      let data = await update(bugId, { t: jwt }, bugChanges);
      console.log(data);
      await dispatch(getProjectDetails(projectName as string));
    } catch (error) {
      console.log(error);
    }
    handleCloseEdit();
  };

  const assigneeOptions = React.useMemo(() => {
    return projectMembers.map((member) => {
      return { value: member.id, label: member.name };
    });
  }, [projectMembers]);

  return (
    <div className="flex h-full w-full flex-col">
      <header className="mb-1 flex h-[180px] flex-col">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          projectSummary && (
            <ProjectSummary
              handleCloseEdit={handleCloseEdit}
              handleOpenEdit={handleOpenEdit}
              showEdit={showEdit}
              editFormFields={editFormFields}
              totalBugs={projectBugs.length}
            />
          )
        )}
        <ProjectDetailsComponent
          showMembers={showMembers}
          deleteProject={deleteProject}
          setShowMembers={setShowMembers}
          projectName={projectName}
        />
      </header>
      <BugList
        projectName={projectName}
        projectBugs={projectBugs}
        handleAddingBug={handleAddingBug}
        addingBug={addingBug}
        handleOpenEdit={handleOpenEdit}
        handleEditBug={handleEditBug}
        handleCloseEdit={handleCloseEdit}
        assigneeOptions={assigneeOptions}
      />
    </div>
  );
}
