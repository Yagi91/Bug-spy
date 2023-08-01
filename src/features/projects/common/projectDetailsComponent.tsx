import { setConfirmModal } from "../../common/confirmSlice";
import AddMembers from "../addMembers";
import { IconButton, Modal } from "../common";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteProjectMember,
  getProjectDetails,
  selectProjectMembers,
  selectProjectSummary,
  updateProjectDetails,
} from "../projectDetailSlice";
import React from "react";
import { selectUsers } from "../../profile/userSlice";

interface Props {
  projectName: string;
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProject: () => void;
}

const ProjectDetailsComponent = ({
  showMembers,
  setShowMembers,
  deleteProject,
  projectName,
}: Props) => {
  const [addingMembers, setAddingMembers] = React.useState<boolean>(false);

  const projectSummary = useAppSelector(selectProjectSummary);
  const projectMembers = useAppSelector(selectProjectMembers);
  const users = useAppSelector(selectUsers);

  const dispatch = useAppDispatch();

  const possibleMembers = React.useMemo(() => {
    return users.filter((user) => {
      for (let i = 0; i < projectMembers.length; i++) {
        if (
          user._id === projectMembers[i].id &&
          user.name !== projectSummary?.admin
        ) {
          return false;
        }
      }
      return true;
    });
  }, [users, projectMembers, projectSummary?.admin]);

  const membersOptions = React.useMemo(() => {
    return possibleMembers.map((member) => {
      return { value: member._id, label: member.name };
    });
  }, [possibleMembers]);

  const handleAddMembers = async (
    e: React.FormEvent<HTMLButtonElement>,
    members: { value: string; label: string }[]
  ): Promise<void> => {
    if (members.length < 1) {
      handleAddingMembers();
      return;
    }
    const newMembersId = members.map((member) => member.value);
    const membersId = projectMembers.map((member) => member.id);
    const updatedMembersId = [...membersId, ...newMembersId];
    await dispatch(
      updateProjectDetails({
        id: projectSummary?.id,
        members: updatedMembersId,
      })
    );
    await dispatch(getProjectDetails(projectName as string));
    handleAddingMembers();
  };
  const handleAddingMembers = function (): void {
    setAddingMembers(!addingMembers);
  };

  const deleteMember = async function (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    e.preventDefault();
    const id = e.currentTarget.value;
    console.log(id);
    const filterProjectMembersId = (projectMembers: any) => {
      const membersID: string[] = [];
      for (let i = 0; i < projectMembers.length; i++) {
        if (projectMembers[i].id !== id) {
          membersID.push(projectMembers[i].id);
        }
      }
      return membersID;
    };
    const updatedMembersId = filterProjectMembersId(projectMembers);
    dispatch(
      deleteProjectMember({
        id: projectSummary?.id as string,
        members: updatedMembersId,
      })
    );
    //update the project members
    dispatch(getProjectDetails(projectName as string));
    console.log("%d Member Deleted", id);
    return;
  };

  return (
    <div className="mt-2 flex w-full items-center justify-around gap-2 px-3 sm:justify-start">
      <IconButton
        icon="person_add"
        text="Add Member"
        handleClick={handleAddingMembers}
      />
      {addingMembers && (
        <Modal>
          {" "}
          <AddMembers
            handleSubmit={handleAddMembers}
            options={membersOptions}
          />{" "}
        </Modal>
      )}
      <div className="relative">
        <IconButton
          icon="groups"
          text="Members"
          handleClick={() => setShowMembers(!showMembers)}
        />
        <ul
          className={`dropdown min-h-12 invisible absolute right-1/2 -z-50 min-w-full -translate-y-10 translate-x-1/2 rounded-xl border bg-white px-2 py-3 text-xs text-neutral-900 shadow-md transition-all sm:text-sm ${
            showMembers && "show"
          }`}
        >
          {projectMembers.length ? (
            projectMembers.map((member: any): JSX.Element => {
              return (
                <li key={member.id} className="border-b-2 py-1 text-left">
                  <h4 className="font-bold">{member.name}</h4>
                  <p>{member.role}</p>
                  <span className="flex justify-between gap-5">
                    <p>{member.email}</p>
                    <button
                      value={member.id}
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
            })
          ) : (
            <li className="border-b-2 py-1 text-left">
              <strong>No Members</strong>
            </li>
          )}
        </ul>
      </div>
      <IconButton
        icon="delete"
        text="Delete Project"
        handleClick={() =>
          dispatch(
            setConfirmModal({
              display: true,
              onConfirm: deleteProject,
            })
          )
        }
      />
    </div>
  );
};

export default ProjectDetailsComponent;
