import React, { useEffect, useState } from "react";
import Header from "./Components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/user";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const AdminLayout = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
    isSuccess,
  } = useQuery({
    /*Function to run when this page loads*/
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    onSuccess: (profileData) => {
      if (!profileData?.admin) {
        navigate("/");
        toast.error("Only admins are allowed to access this panel");
      } else {
        navigate("/admin");
      }
    },
    queryKey: ["profile"],
  });
  {
    /*useEffect(
    (profileData) => {
      if (!profileData?.admin) {
        navigate("/");
        toast.error("Only admins are allowed to access this panel");
      } else {
        navigate("/admin");
      }
    },
    [isSuccess, profileData]
  ); */
  }

  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700 animate-bounce duration-300">
          Loading...
        </h3>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className=" lg:p-0 p-0 border-[1px] flex-1 text-white">
        <Outlet />
      </main>
    </div>
  );
};
{
  /*bg-[#985e5e] */
}

export default AdminLayout;
