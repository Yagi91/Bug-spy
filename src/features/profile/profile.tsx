import React from "react";
import { SimpleInput } from "../common/common";
import Select from "react-select";
import { getUser } from "./userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import userImage from "../../assets/images/3d-user.png";

interface Props {
  userId: string;
}

export default function Profile({ userId }: Props): JSX.Element {
  const user = useAppSelector((state) => state.user.user);
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

  return (
    <div className="w-full text-gray-800">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 lg:grid-cols-3">
        <div className="rounded-[12px] bg-white px-3 py-2">
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
        <div className="row-span-2 rounded-[12px] bg-white px-3 py-2 lg:col-span-2">
          <h2 className="text-left text-lg font-bold text-neutral-800">
            General Information
          </h2>
          <form className="flex flex-col gap-5">
            <SimpleInput
              label="Name"
              name="name"
              type="text"
              placeholder={user.name}
              extraClass="w-full placeholder:capitalize"
              containerClass="[&>span]:mb-2 [&>span]:font-normal mt-4"
            />
            <SimpleInput
              label="Email"
              name="email"
              type="email"
              placeholder={user.email}
              extraClass="invalid:ring-red-300 w-full"
              containerClass="[&>span]:mb-2 [&>span]:font-normal"
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
            />
            <button
              type="submit"
              className="w-fit rounded-xl bg-primary-600 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
            >
              Update
            </button>
          </form>
        </div>
        <div className="rounded-[12px] border bg-white px-3 py-2">
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
