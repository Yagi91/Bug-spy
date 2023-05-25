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

interface option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

const dummyOptions: readonly option[] = [
  { value: "Mary", label: "Mary" },
  { value: "John", label: "John" },
  { value: "Bob", label: "Bob" },
  { value: "Jane", label: "Jane" },
  { value: "Joe", label: "Joe" },
  { value: "Sally", label: "Sally" },
  { value: "Sue", label: "Sue" },
  { value: "Tom", label: "Tom" },
  { value: "Tim", label: "Tim" },
  { value: "Bill", label: "Bill" },
  { value: "Jill", label: "Jill" },
];

export default function ProjectDetails({ name, id }: Props) {
  const [showMembers, setShowMembers] = React.useState<boolean>(false);
  // const [people, setPeople] = React.useState<option[]>([]);

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
        <div className="flex w-full items-center justify-around gap-2 sm:justify-start">
          <div>
            <button className="btn-primary justify center hidden items-center gap-2 text-sm sm:flex">
              <span className="material-symbols-outlined line inline-block leading-3">
                person_add
              </span>
              <span className="inline-block text-xs md:text-sm">
                Add Member
              </span>
            </button>
            <span className="material-symbols-outlined line block p-2 sm:hidden">
              person_add
            </span>
          </div>
          <div className="relative">
            <button
              className="btn-primary my-2 hidden items-center gap-2 px-1 py-2 text-xs sm:flex sm:text-sm"
              onClick={() => setShowMembers(!showMembers)}
            >
              <span className="material-symbols-outlined line inline-block leading-3">
                groups
              </span>
              <span className="inline-block text-xs md:text-sm">Members</span>
            </button>
            <span
              className="material-symbols-outlined line block cursor-pointer p-2 sm:hidden"
              onClick={() => setShowMembers(!showMembers)}
            >
              groups
            </span>
            <ul
              className={`dropdown invisible absolute right-1/2 -z-50 -translate-y-10 translate-x-1/2 rounded-xl border bg-white px-2 py-3 text-xs text-neutral-900 shadow-md transition-all sm:text-sm ${
                showMembers && "show"
              }`}
            >
              {projectMembers.map((member): JSX.Element => {
                return (
                  <li key={member.email} className="border-b-2 py-1 text-left">
                    <h4 className="font-bold">{member.name}</h4>
                    <p>{member.role}</p>
                    <span className="flex justify-between gap-5">
                      <p>{member.email}</p>
                      <button
                        value={member.email}
                        onClick={deleteMember}
                        className="flex h-4 w-4 items-center justify-center rounded-full border border-neutral-500"
                      >
                        <span className="material-symbols-outlined leading-0 remove text-xs text-secondary-700 sm:text-sm">
                          remove
                        </span>
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <button
              className="btn-primary justify center hidden items-center gap-2 text-sm sm:flex"
              onClick={deleteProject}
            >
              <span className="material-symbols-outlined line inline-block text-xs leading-3 md:text-sm">
                delete
              </span>
              <span className="inline-block">Delete Project</span>
            </button>
            <span
              className="material-symbols-outlined block p-2 sm:hidden "
              title="delete project"
              onClick={deleteProject}
            >
              delete
            </span>
          </div>
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
