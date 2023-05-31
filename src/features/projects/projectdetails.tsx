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
import { IconButton, Details, CommentSection, Modal } from "./common";
import { AddBugForm } from "./addBug";
import AddMembers from "./addMembers";

interface Props {
  name: string;
  id?: string;
}

export default function ProjectDetails({ name, id }: Props) {
  const [showMembers, setShowMembers] = React.useState<boolean>(false);
  const [addingBug, setAddingBug] = React.useState<boolean>(false);
  const [addingMembers, setAddingMembers] = React.useState<boolean>(false);
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

  const handleAddingBug = function (): void {
    setAddingBug(!addingBug);
  };
  const handleAddingMembers = function (): void {
    setAddingMembers(!addingMembers);
  };
  return (
    <div className="flex h-full w-full flex-col border">
      <header className="mb-1 h-[180px]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          projectSummary && (
            <div className="rounded-[12px] border bg-white px-3 py-1">
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
        <div className="mt-2 flex w-full items-center justify-around gap-2 px-3 sm:justify-start">
          <IconButton
            icon="person_add"
            text="Add Member"
            handleClick={handleAddingMembers}
          />
          {addingMembers && (
            <Modal>
              {" "}
              <AddMembers handleSubmit={handleAddingMembers} />{" "}
            </Modal>
          )}
          <div className="relative">
            <IconButton
              icon="groups"
              text="Members"
              handleClick={() => setShowMembers(!showMembers)}
            />
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
                          person_remove
                        </span>
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <IconButton
            icon="delete"
            text="Delete Project"
            handleClick={deleteProject}
          />
        </div>
      </header>
      <div className="height grow rounded-2xl border bg-white p-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h3 className="font-bolder mr-1 text-left text-lg font-medium">
              Project Bugs
            </h3>
            <span className="material-symbols-outlined leading-0">
              {" "}
              bug_report
            </span>
          </div>
          <button
            className="btn-primary flex items-center"
            onClick={handleAddingBug}
          >
            <span className="material-symbols-outlined leading-0 sm:text-md text-sm">
              add
            </span>
            <span className="text-xs sm:text-sm">Report Bug</span>
          </button>
          {addingBug && (
            <Modal>
              <AddBugForm handleCancel={handleAddingBug} />
            </Modal>
          )}
        </div>
        <ul className="flex w-full flex-col">
          {projectBugs.map((bug): JSX.Element => {
            return (
              <li key={bug.id} className="border-b text-left">
                <h4 className="">{bug.name}</h4>
                <div className="flex justify-between gap-2">
                  <p>{bug.priority}</p>
                  <p className="text-sm">
                    <span
                      className={`material-symbols-outlined leading-0 text-xs ${
                        bug.status === "Open"
                          ? "text-secondary-400"
                          : "text-accent-400"
                      }`}
                    >
                      {"circle"}
                    </span>
                    {bug.status}
                  </p>
                </div>
                <p>Created: {bug.created}</p>
                <Details summary="View Description & Comment">
                  <p className="p-2 text-sm">{bug.description}</p>
                  <CommentSection />
                </Details>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
