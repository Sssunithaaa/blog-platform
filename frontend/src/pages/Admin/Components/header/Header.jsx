import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../../constants";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";
const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();
  const MENU_ITEMS = [
    {
      title: "Dashboard",
      link: "/admin",
      icon: <AiFillDashboard color="#601A35" size={25} className="text-xl" />,
      name: "dashboard",
      type: "link",
    },
    {
      title: "Comments",
      link: "/admin/comments",
      icon: <FaComments color="#601A35" size={25} className="text-xl" />,
      name: "comments",
      type: "link",
    },
    {
      /*{
      title: "Post",
      content: [
        { title: "New", link: "/admin/posts/new" },
        { title: "Manage", link: "/admin/posts/manage" },
      ],
      icon: <MdDashboard color="#601A35" size={25} className="text-xl" />,
      name: "posts",
      type: "collapse",
    }, */
    },
  ];
  const toggleMenuHandler = () => {
    setIsMenuActive((curState) => !curState);
  };
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);
  return (
    <header className="flex flex-row content-center justify-between h-fit w-full items-center lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0 z-50">
      <Link to="/">
        <img
          src={images.logo}
          className="m-5 w-20 rounded-full lg:hidden"
        ></img>
      </Link>
      <div className="mx-10 my-10 w-10 cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="h-6 w-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="h-6 w-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 lg:hidden"
            onClick={toggleMenuHandler}
          />

          <div className="fixed top-0 bottom-0 left-0 z-50 lg:w-[19.6%] overflow-y-auto overflow-x-clip w-[25%] bg-white">
            <Link>
              <img
                src={images.logo}
                alt="logo"
                className="w-20 rounded-full m-5"
              ></img>
            </Link>
            <h4 className="mt-10 font-bold ml-10 text-[#3a3939] text-xl">
              MAIN MENU
            </h4>

            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              {MENU_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    name={item.name}
                    link={item.link}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    name={item.name}
                    content={item.content}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
