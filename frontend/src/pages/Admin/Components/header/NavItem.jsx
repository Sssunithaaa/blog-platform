import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <NavLink
      to={link}
      className={`${
        name == activeNavName
          ? "font-bold text-[#601A35]"
          : "font-semibold text-black"
      }`}
      onClick={() => setActiveNavName(name)}
    >
      <div className="flex flex-row gap-x-2.5 mx-10  lg:w-[40%]">
        <div>{icon}</div>

        <p className="font-bold text-lg">{title}</p>
      </div>
    </NavLink>
  );
};

export default NavItem;
