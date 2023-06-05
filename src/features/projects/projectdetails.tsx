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
import { DoubleIconsText } from "./common";
import EditForm from "./edit";

interface Props {
  name: string;
  id?: string;
}

export default function ProjectDetails({ name, id }: Props) {
  const [showMembers, setShowMembers] = React.useState<boolean>(false);
  const [addingBug, setAddingBug] = React.useState<boolean>(false);
  const [addingMembers, setAddingMembers] = React.useState<boolean>(false);
  const [showEdit, setShowEdit] = React.useState<boolean>(false);

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

  const handleBack = function (): void {
    navigate(-1);
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
  const handleAddMembers = (
    e: React.FormEvent<HTMLButtonElement>,
    members: { value: string; label: string }[]
  ): void => {
    if (members.length < 1) {
      handleAddingMembers();
      return;
    }
    console.log(members);
    // dispatch(setProjectMembers([...projectMembers, ...members]));
  };

  const handleEditClose = function (): void {
    setShowEdit(!showEdit);
  };
  const handleEditSubmit = function (
    e: React.FormEvent<HTMLButtonElement>
  ): void {
    e.preventDefault();
    //dispatch(setProjectSummary({ name: "Project 1", description: "Project 1 Description" }));
    setShowEdit(!showEdit);
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
              <DoubleIconsText
                title={projectSummary.name}
                firstIcon="arrow_back_ios_new"
                secondIcon="edit"
                titleClass="font-extrabold text-lg"
                firstIconClass="mr-2 cursor-pointer"
                secondIconClass="text-[20px] cursor-pointer"
                ComponentClass="items-center py-1 border-b"
                firstHandleIcon={handleBack}
                secondHandleIcon={handleEditClose}
              />
              {showEdit && (
                <Modal>
                  <EditForm
                    handleSubmit={handleEditSubmit}
                    defVal1={projectSummary.name}
                    defVal2={projectSummary.description}
                    option1={[
                      { value: "Ongoing", label: "Ongoing" },
                      { value: "Completed", label: "Completed" },
                    ]}
                    option2={[
                      { value: "Low", label: "Low" },
                      { value: "Medium", label: "Medium" },
                      { value: "High", label: "High" },
                    ]}
                  />
                </Modal>
              )}
              <p className="text-left text-xs">{projectSummary.description}</p>
              <p className="text-left text-xs">Admin: {projectSummary.admin}</p>
              <p className="text-left text-xs">{projectSummary.progress}</p>
              <p className="text-left text-[8px] italic opacity-60">
                Created: {projectSummary.created}
              </p>
              <p className="text-left text-[8px] italic opacity-60">
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
              <AddMembers handleSubmit={handleAddMembers} />{" "}
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
          <DoubleIconsText
            title="Bug List"
            firstIcon="bug_report"
            titleClass="font-semibold"
            firstIconClass="mr-2"
            secondIconClass="text-[20px] cursor-pointer"
          />
          {/* {showEdit && (
                <Modal>
                  <EditForm
                    handleSubmit={handleEditSubmit}
                    defVal1={projectSummary.name}
                    defVal2={projectSummary.description}
                    option1={[
                      { value: "Ongoing", label: "Ongoing" },
                      { value: "Completed", label: "Completed" },
                    ]}
                    option2={[
                      { value: "Low", label: "Low" },
                      { value: "Medium", label: "Medium" },
                      { value: "High", label: "High" },
                    ]}
                  />
                </Modal>
              )} */}
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
        <ul className="flex w-full flex-col font-light">
          {projectBugs.map((bug): JSX.Element => {
            return (
              <li key={bug.id} className="border-b text-left">
                <DoubleIconsText
                  title={bug.name}
                  secondIcon="edit"
                  titleClass="font-normal"
                  secondIconClass="text-[16px] cursor-pointer"
                  ComponentClass="items-center"
                  secondHandleIcon={handleEditClose}
                />
                <div className="flex justify-between gap-2">
                  <p>{bug.priority}</p>
                  <div className="text-sm">
                    <span
                      className={`material-symbols-outlined leading-0 mr-1 text-xs ${
                        bug.status === "Open"
                          ? "text-secondary-400"
                          : "text-accent-400"
                      }`}
                    >
                      {"circle"}
                    </span>
                    {bug.status}
                  </div>
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
