import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col sm:flex-row">
      kdkd
      <nav className="border text-red-500 ">
        djdj
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/my-tickets">My Tickets</NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
