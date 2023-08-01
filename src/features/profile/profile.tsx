import React from "react";
import { SimpleInput } from "../common/common";
import Select from "react-select";
import {
  getUser,
  updateUser,
  selectError,
  selectLoading,
  clearError,
} from "./userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import userImage from "../../assets/images/3d-user.png";
import { setUserInfo } from "../auth/authSlice";

interface Props {
  userId: string;
}

export default function Profile({ userId }: Props): JSX.Element {
  const [newName, setNewName] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newRole, setNewRole] = React.useState("");
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (user.name) return;
    dispatch(getUser(userId));
  }, [dispatch, userId, user.name, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  //get timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName === "" && newEmail === "" && newRole === "") {
      //If no changes are made, return
      return;
    }
    const updatedUser = {
      name: newName === "" ? user.name : newName,
      email: newEmail === "" ? user.email : newEmail,
      role: newRole === "" ? user.role : newRole,
      _id: user._id,
    };
    if (
      updatedUser.role === user.role &&
      updatedUser.name === user.name &&
      updatedUser.email === user.email
    ) {
      return;
    }
    await dispatch(updateUser(updatedUser)).then((res) => {
      if (res.payload) {
        setNewName("");
        setNewEmail("");
        setNewRole("");
      }
    });
    dispatch(setUserInfo(updatedUser));
  };
  type OptionType = {
    value: string;
    label: string;
  };
  return (
    <div className="w-full text-gray-800">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 lg:grid-cols-3">
        <div className="rounded-md border bg-white px-3 py-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="flex gap-4">
            <img
              src={userImage}
              alt="user"
              className="h-20 w-20 rounded-full"
            />
            <div className="flex flex-col justify-center text-left">
              <p className="font-semibold capitalize">{user.name}</p>
              <p className="capitalize">{user.role}</p>
            </div>
          </div>
        </div>
        <div className="row-span-2 rounded-md border bg-white px-3 py-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] lg:col-span-2">
          <h2 className="text-left text-lg font-bold text-neutral-800">
            General Information
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
            <SimpleInput
              label="Name"
              name="name"
              type="text"
              placeholder={user.name}
              extraClass="w-full placeholder:capitalize"
              containerClass="[&>span]:mb-2 [&>span]:font-normal mt-4"
              value={newName}
              handleChange={(e) => {
                dispatch(clearError());
                setNewName(e.target.value);
              }}
            />
            <SimpleInput
              label="Email"
              name="email"
              type="email"
              placeholder={user.email}
              extraClass="invalid:ring-red-300 w-full"
              containerClass="[&>span]:mb-2 [&>span]:font-normal"
              value={newEmail}
              handleChange={(e) => {
                dispatch(clearError());
                setNewEmail(e.target.value);
              }}
            />
            <Select
              options={[
                { value: "Manger", label: "Manger" },
                { value: "Developer", label: "Developer" },
                { value: "Tester", label: "Tester" },
              ]}
              placeholder={user.role}
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "0.75rem",
                  borderWidth: "1px",
                  textAlign: "left",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: state.isSelected ? "0.75rem" : "0",
                  textAlign: "left",
                }),
              }}
              value={{
                value: newRole || user.role,
                label: newRole || user.role,
              }}
              onChange={(newValue: OptionType | null) =>
                setNewRole(newValue?.value as string)
              }
            />
            <button
              type="submit"
              className="w-fit rounded-xl bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                newName === "" && newEmail === "" && newRole === ""
                  ? true
                  : loading
                  ? true
                  : newEmail === user.email && newName === user.name
                  ? true
                  : false
              }
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <p className="text-left text-sm font-normal text-secondary-500">
              {error}
            </p>
          </form>
        </div>
        <div className="mb-24 rounded-md border bg-white px-3 py-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] sm:mb-0">
          <h2 className="text-left text-lg font-bold text-neutral-800">
            Language & Time
          </h2>
          <form className="flex flex-col">
            <label id="language" className="mt-4 text-left">
              Select Language
            </label>
            <Select
              options={[{ value: "en", label: "English" }]}
              name="language"
              placeholder="English"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "0.75rem",
                  borderWidth: "1px",
                  textAlign: "left",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: state.isSelected ? "0.75rem" : "0",
                  textAlign: "left",
                }),
              }}
            />
            <label id="timezone" className="mt-4 text-left">
              Time zone
            </label>
            <Select
              options={[{ value: "GMT", label: "GMT" }]}
              name="timezone"
              placeholder={timezone}
              isDisabled={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "0.75rem",
                  borderWidth: "1px",
                  textAlign: "left",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: state.isSelected ? "0.75rem" : "0",
                  textAlign: "left",
                }),
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
