import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-around p-4 bg-gray-800 text-white text-2xl">
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-white font-bold border-b-2 border-b-white" : "text-gray-400 hover:text-white"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink  className={({isActive})=>(
        isActive? "text-white font-bold border-b-2 border-b-white" : "text-gray-400 hover:text-white"
  )} to={`/pastes`}>Pastes</NavLink>
    </div>
  );
}
