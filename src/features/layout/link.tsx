import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  path: string;
  name: string;
  icon: string;
  id?: string;
}

//This function is responsible for rendering the links in the nav bar. It takes in the path, name, and icon as props and returns a nav link with the path as the to attribute, the name as the text, and the icon as the material icon.
// This code returns a NavLink component with the specified path, id, and className.
// The NavLink will be styled with the specified color if it is active.
export default function Link({ path, name, icon, id }: Props): JSX.Element {
  //#4CAF50 is green-500
  return (
    <>
      <NavLink
        to={path}
        id={id}
        className="nav-element"
        style={(isActive) => {
          // The color will be green if the NavLink is active, and empty otherwise.
          return {
            color: isActive.isActive ? "#1E88E5" : "",
            backgroundColor: isActive.isActive ? "rgb(238, 238, 238)" : "",
          };
        }}
      >
        <span className="material-symbols-outlined block">{icon}</span>
        <span className="hidden sm:inline">{name}</span>
      </NavLink>
    </>
  );
}
