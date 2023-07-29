import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { _ProjectBug } from "../common/types";
import { NavLink } from "react-router-dom";
import {
  selectMyTickets,
  selectMyTicketsError,
  selectMyTicketsLoading,
  fetchMyTickets,
} from "./myTicketSlice";

const MyTickets = () => {
  const myTickets = useAppSelector(selectMyTickets);
  const myTicketsError = useAppSelector(selectMyTicketsError);
  const myTicketsLoading = useAppSelector(selectMyTicketsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyTickets("Mary"));
  }, [dispatch]);

  function badgeColor(status: string): string {
    switch (status) {
      case "Low":
        return "bg-accent-100 text-accent-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-secondary-100 text-secondary-800";
      default:
        return "bg-accent-500";
    }
  }

  return (
    <div className="flex w-full flex-col p-2 ">
      <div className="">
        <h1 className="text-left text-xl font-bold">My Tickets</h1>
        <p className="text-left text-gray-400">Issues/Bugs assigned to you</p>
      </div>
      <div className="w-full flex-1 overflow-y-auto rounded-[12px] bg-white">
        <ul className="flex w-full flex-col font-light">
          {myTickets.map((bug): JSX.Element => {
            return (
              <li
                key={bug.id}
                className="border-b px-2 py-3 text-left hover:bg-gray-100"
              >
                <NavLink to={`projects/${bug.project}`}>
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
                  <div className="flex justify-between text-xs text-neutral-400">
                    <p>Created: {bug.created}</p>
                    <p>Updated: {bug.updated}</p>
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
