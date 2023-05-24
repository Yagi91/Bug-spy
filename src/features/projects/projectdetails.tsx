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
} from "./projectDetailSlice";
import Select from "react-select/dist/declarations/src/Select";

interface Props {
  name: string;
  id?: string;
}

export default function ProjectDetails({ name, id }: Props) {
  const [showMembers, setShowMembers] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectSummary = useAppSelector(selectProjectSummary);
  const projectMembers = useAppSelector(selectProjectMembers);
  const projectBugs = useAppSelector(selectProjectBugs);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getProjectDetails(id as string));
  }, [dispatch, id]);

  const deleteProject = async function (): Promise<void> {
    const data = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        //fetch project details from database and delete
        //navigate to previous page which is projects page using react router
        console.log("Project Deleted");
        navigate(-1);
        resolve();
      }, 1000);
    });
    return data;
  };

  const deleteMember = async function (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    const email = e.currentTarget.value;

    const data = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        //fetch project members from database and delete
        // dispatch(setProjectMembers(projectMembers.filter((member) => member.email !== email)));
        console.log("%d Member Deleted", email);
        resolve();
      }, 1000);
    });
    return data;
  };

  return (
    <div className="h-full w-full border">
      <header className="border">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          projectSummary && (
            <div className="border">
              <h2 className="border-b py-1 text-left text-lg font-bold">
                {projectSummary.name}
              </h2>
              <p className="text-left text-xs">{projectSummary.description}</p>
              <p className="text-left text-xs">Admin: {projectSummary.admin}</p>
              <p className="text-left text-xs">{projectSummary.progress}</p>
              <p className="text-left text-xs italic">
                Created: {projectSummary.created}
              </p>
              <p className="text-left text-xs italic">
                Updated: {projectSummary.updated}
              </p>
            </div>
          )
        )}
        <div className="flex items-center gap-2">
          {/* <button className="btn-primary block p-2 text-xs sm:text-sm">
            ADD MEMBERS
          </button> */}
          <button
            className="btn-primary block flex items-center gap-2 p-2 text-xs sm:text-sm"
            onClick={() => setShowMembers(!showMembers)}
          >
            <span className="material-symbols-outlined line inline-block leading-3">
              groups
            </span>
            <span className="inline-block">Members</span>
            {showMembers && (
              <ul>
                {projectMembers.map((member): JSX.Element => {
                  return (
                    <li key={member.email}>
                      <h4>{member.name}</h4>
                      <p>{member.email}</p>
                      <p>{member.role}</p>
                      <button value={member.email} onClick={deleteMember}>
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </button>
          <button
            className="btn-primary justify center hidden items-center gap-2 text-sm sm:flex"
            onClick={deleteProject}
          >
            <span className="material-symbols-outlined line inline-block leading-3">
              delete
            </span>
            <span className="inline-block">Delete Project</span>
          </button>
          <span
            className="material-symbols-outlined block sm:hidden"
            title="delete project"
            onClick={deleteProject}
          >
            delete
          </span>
        </div>
      </header>
      <div>
        <h3>Project Bugs</h3>
        <button>Report new Bug</button>
        <ul>
          {projectBugs.map((bug): JSX.Element => {
            return (
              <li key={bug.id}>
                <h4>{bug.name}</h4>
                <p>{bug.description}</p>
                <p>{bug.priority}</p>
                <p>{bug.status}</p>
                <p>{bug.created}</p>
                <p>{bug.updated}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
