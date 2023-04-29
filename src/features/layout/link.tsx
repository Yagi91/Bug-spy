import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  path: string;
  name: string;
  icon: string;
}

export default function Link({ path, name, icon }: Props): JSX.Element {
  return (
    <>
      <NavLink to={path} className="nav-element">
        <span className="material-symbols-outlined block">{icon}</span>
        <span className="hidden sm:inline">{name}</span>
      </NavLink>
    </>
  );
}
