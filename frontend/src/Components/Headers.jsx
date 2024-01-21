import React, { useState } from "react";
import { images } from "../constants";
import { IoMenu } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiSmileyWinkDuotone } from "react-icons/pi";
import { FaHandPointRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
const NavItemInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "My posts", type: "link", href: "/posts" },
  { name: "Pages", type: "dropdown", items: ["About us", "contact us"] },
  { name: "Create", type: "link", href: "/create" },
];
const NavItem = ({ item }) => {
  const [dropdown, setDropDown] = useState(false);
  const toggleDrop = () => {
    setDropDown((curState) => {
      return !curState;
    });
  };
  return (
    <div>
      <li className=" group relative px-4 py-2 ">
        {item.type === "link" ? (
          <div className="mx-auto">
            <a
              href={`${item.href}`}
              className="cursor-pointer rounded-lg px-8 py-2 text-lg  hover:rounded-full hover:bg-gray-400 "
            >
              {item.name}
            </a>
            <span className="text-white-500 absolute right-0 top-0 font-bold opacity-0 transition-all duration-500 group-hover:right-[90%] group-hover:opacity-100">
              <PiSmileyWinkDuotone />
              <FaHandPointRight />
            </span>
          </div>
        ) : (
          <div
            className={`${
              dropdown ? " rounded-none  hover:rounded-none" : ""
            } mx-auto flex flex-col items-center px-3 py-1 ${
              !dropdown ? "hover:bg-gray-400" : ""
            }  hover:rounded-full`}
          >
            <button
              href="/"
              className={`${
                dropdown ? "bg-white" : ""
              } flex items-center gap-x-1 rounded-lg px-4  py-1 text-lg `}
              onClick={toggleDrop}
            >
              <span>{item.name}</span>
              <IoIosArrowDown />
            </button>
            <div
              className={`${
                dropdown ? "block " : "hidden"
              } h-max w-max transform rounded-none pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:translate-y-full lg:group-hover:block`}
            >
              <ul className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                {item.items.map((page) => (
                  <a
                    href="/"
                    className="px-4 py-2 hover:bg-dgreen hover:text-white lg:text-dgreen"
                  >
                    {page}
                  </a>
                ))}
              </ul>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};
const Headers = () => {
  const navigate = useNavigate();
  const [naVisible, setNavisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState();
  const dispatch = useDispatch();
  const naVisibilityHandler = () => {
    setNavisible((curState) => {
      console.log(curState);
      return !curState;
    });
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <section className="sticky left-0 right-0 top-0 m-0 z-50 bg-white">
        {/*mx - margin left right auto px-5*/}
        <header className="container mx-auto my-0 flex items-center justify-between border-b-2 px-5 py-4">
          <div className="left-0 flex">
            <img
              src={images.logo}
              className="rounded-full"
              style={{ width: "60px" }}
              alt="logo"
            ></img>
            <h2 className="py-5 font-sans font-bold text-black">PINFINITY</h2>
          </div>
          <div className="z-50 lg:hidden">
            {naVisible ? (
              <AiOutlineClose
                className="h-6 w-6"
                onClick={naVisibilityHandler}
              />
            ) : (
              <IoMenu className="h-6 w-6" onClick={naVisibilityHandler} />
            )}
          </div>
          <div
            className={`${
              naVisible ? "right-0" : "-right-full"
            } fixed bottom-0 top-0 z-[49] mt-[90px] flex w-full flex-col items-center justify-center gap-x-9 gap-y-8 bg-white p-4 transition-all duration-300 lg:static lg:mt-0 lg:w-auto lg:flex-row lg:justify-end lg:bg-transparent`}
          >
            <ul className="flex flex-col items-center gap-x-5 gap-y-5 font-sans font-bold lg:flex-row">
              {NavItemInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}{" "}
            </ul>
            {userState.userInfo ? (
              <div className="group relative">
                <div className="mx-auto flex flex-col items-center font-bold">
                  <button
                    className={`${
                      !profileDropdown ? "rounded-full hover:bg-gray-400" : ""
                    } flex items-center gap-x-1 px-8  py-2`}
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <span className="mx-auto text-lg">Profile</span>
                    <IoIosArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDropdown ? "block " : "hidden "
                    } h-max w-max transform rounded-none pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:translate-y-full lg:group-hover:block`}
                  >
                    <ul className=" flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <button
                        type="button"
                        href="/"
                        className="px-4 py-2 hover:bg-dgreen hover:text-white lg:text-dgreen"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          navigate("/profile");
                        }}
                        type="button"
                        href="/"
                        className="px-4 py-2 hover:bg-dgreen hover:text-white lg:text-dgreen"
                      >
                        Profilee
                      </button>
                      {userState?.userInfo?.admin && (
                        <button
                          onClick={() => {
                            navigate("/admin");
                          }}
                          type="button"
                          href="/"
                          className="px-4 py-2 hover:bg-dgreen hover:text-white lg:text-dgreen"
                        >
                          Admin
                        </button>
                      )}
                      <button
                        onClick={logoutHandler}
                        type="button"
                        href="/"
                        className="px-4 py-2 hover:bg-dgreen hover:text-white lg:text-dgreen"
                      >
                        Log out
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hover:text-blue mt-2 rounded-full border-2 border-blue-900 px-5 py-1 font-bold  text-black transition-all duration-300 hover:bg-bottle-green lg:mt-0"
              >
                SIGN IN
              </button>
            )}
          </div>
        </header>
      </section>
    </div>
  );
};

export default Headers;
