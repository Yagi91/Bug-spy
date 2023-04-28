import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className=" container  mx-auto flex flex-col border border-primary-500 sm:flex-row">
      <nav className="w-63 flex-col border sm:flex-row">
        <NavLink to="/projects" className={"block"}>
          Projects
        </NavLink>
        <NavLink to="/my-tickets" className={"block"}>
          My Tickets
        </NavLink>
      </nav>
      <div className="mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
