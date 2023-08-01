import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { NavLink, useParams } from "react-router-dom";
import {
  selectMyTickets,
  // selectMyTicketsError,
  // selectMyTicketsLoading,
  fetchMyTickets,
} from "./myTicketSlice";
import { badgeColor, formatDate } from "../common/utils";

const MyTickets = () => {
  const myTickets = useAppSelector(selectMyTickets);
  // const myTicketsError = useAppSelector(selectMyTicketsError);
  // const myTicketsLoading = useAppSelector(selectMyTicketsLoading);
  const { userId } = useParams<{ userId: string }>(); //this is the name of the project

  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = userId as string;
    const controller = new AbortController();
    const signal = controller.signal;
    const jwt = (sessionStorage.getItem("jwt") as string) || "";
    dispatch(fetchMyTickets({ userId: id, jwt, signal }));
  }, [dispatch, userId]);

  return (
    <div className="flex w-full flex-col p-2 ">
      <div className="">
        <h1 className="text-left text-xl font-bold">My Tickets</h1>
        <p className="text-left text-gray-400">Issues/Bugs assigned to you</p>
      </div>
      <div className="w-full flex-1 overflow-y-auto rounded-md border bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <ul className="flex w-full flex-col font-light">
          {myTickets.map((bug): JSX.Element => {
            return (
              <li
                key={bug.created}
                className="border-b px-2 py-3 text-left hover:bg-gray-100"
              >
                <NavLink
                  to={`/projects/${bug.project?.name}/#${bug.project?._id}`}
                >
                  <h2 className="text-base font-semibold">{bug.name}</h2>
                  <p className="break words w-3/5 truncate text-sm">
                    {bug.description}{" "}
                  </p>
                  <div className="flex justify-between gap-2">
                    <p
                      className={`flex items-center rounded-[50px] px-3 py-1 text-center ${badgeColor(
                        bug.priority
                      )}`}
                    >
                      {bug.priority}
                    </p>
                    <div className="text-sm">
                      <span
                        className={`material-symbols-outlined solid leading-0 mr-1 text-xs ${
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
                  <div className="flex justify-between text-xs text-neutral-400">
                    <p>{formatDate(bug.created)}</p>
                    <p>{formatDate(bug.updated)}</p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MyTickets;
