import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const NavItemCollapse = ({
  content,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);
  return (
    <div className="collapse collapse-arrow min-h-0 rounded-none mx-10 overflow-hidden ">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />

      <div
        className={`${
          name === activeNavName ? "font-bold text-[#601A35]" : " text-black "
        } collapse-title text-md font-bold text-lg min-h-0 py-0 px-0 pl-0 ml-[2px] flex items-center gap-x-2.5`}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-2 flex flex-col gap-y-2 font-medium ml-5">
          {content.map((item) => (
            <Link to={item.link}>{item.title}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;
