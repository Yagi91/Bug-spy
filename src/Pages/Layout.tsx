import React from "react";
import { Outlet } from "react-router-dom";
import Link from "../features/layout/link";

//This is the layout for the app. It is a flex container with two children. The first child is a nav bar that is a flex container with two children. The second child is the outlet for the routes.
export default function Layout() {
  return (
    <div className="container relative mx-auto flex h-full flex-col-reverse border border-primary-500 sm:flex-row">
      <nav className="flex flex-row-reverse justify-center border bg-white py-5 font-bold text-neutral-900 sm:w-60 sm:flex-col sm:justify-between">
        <div className="flex w-full justify-around gap-4 p-2 sm:flex-col sm:justify-between">
          <Link path="/projects" id="projects" name="Projects" icon="list_alt" />
          <Link path="/my-tickets" id="my-tickets" name="My Tickets" icon="bug_report" />
          <Link path="/profile" id="profile" name="Profile" icon="person" />
        </div>
        <div className="border-r-2 border-neutral-300 p-2 sm:w-full sm:border-r-0 sm:border-t-2">
          <button className="nav-element">
            <span className="material-symbols-outlined block">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
      <div className="mx-auto flex h-full w-full justify-center overflow-y-scroll border p-4">
        <Outlet />
      </div>
    </div>
  );
}
