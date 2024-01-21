import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "../../Components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../Components/profilePicture";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../services/index/user";
import { useMutation } from "@tanstack/react-query";
import { userActions } from "../../store/reducers/userReducers";
import { useQueryClient } from "@tanstack/react-query";
import CTA from "../container/CTA";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    /*Function to run when this page loads*/
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });
  console.log(isDisabled);
  const { mutate, updateProfileisLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      setIsDisabled(false);
      toast.error(error.message);
      console.log(error.message);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };
  const editProfileHandler = () => {
    setIsDisabled(!isDisabled);
  };

  console.log(isValid);
  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-5">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="px-5 text-center font-sans text-2xl font-bold  text-dgreen">
            PROFILE
          </h1>
          <ProfilePicture
            avatar={profileData?.avatar}
            isDisabled={isDisabled}
          />

          <form
            className=" my-5 h-auto w-full rounded-lg px-7  font-sans "
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className={`${isDisabled ? "my-1" : ""} mx-auto my-5 w-[90%]`}>
              <input
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name must include atleast one character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                disabled={isDisabled}
                className={`placeholder: my-4 block h-[35px] w-full content-center rounded-xl  px-5 text-center text-2xl font-bold outline-none hover:border-gray-300  py-5 ${
                  !isDisabled
                    ? "font-normal text-lg border-gray-350 border-2 "
                    : "border-0 py-0 mt-0"
                }  ${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
                type="text"
                placeholder="Enter your name"
              ></input>
              {errors.name?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className={`${isDisabled ? "my-1" : ""} mx-auto my-5 w-[90%]`}>
              <input
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email format is invalid",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                disabled={isDisabled}
                className={`placeholder: my-4  block h-[35px] w-full content-center rounded-xl  px-5 text-center outline-none hover:border-gray-300  ${
                  !isDisabled ? "border-2 py-5 " : "border-0 py-0 mt-0"
                }   ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
                type="email"
                placeholder="Enter your email"
              ></input>
              {errors.email?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mx-auto mt-5 w-[90%]">
              <input
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must contain atleast 8 characters",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                className={`placeholder: mt-3 placeholder:text-center placeholder:text-gray-800 block h-[35px] w-full content-center rounded-xl border-2 border-black/30 py-5   px-5 outline-none hover:border-2 hover:border-gray-300 ${
                  isDisabled ? "hidden" : "block"
                } ${errors.password ? "border-red-200" : "border-[#c3cad9]"}`}
                type="password"
                placeholder="Enter new password"
              ></input>
              {errors.password?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div onClick={editProfileHandler} className="mx-auto my-2 w-[30%]">
              {!isDisabled ? (
                <button
                  type="submit"
                  disabled={
                    !isValid || profileIsLoading || updateProfileisLoading
                  }
                  className="w-full rounded-full text-black bg-slate-600 p-3 font-semibold hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed mt-8"
                >
                  SAVE
                </button>
              ) : (
                <button
                  className={`w-full rounded-full text-black bg-slate-600 p-3 font-semibold hover:bg-slate-800 hover:text-white`}
                >
                  Edit profile
                </button>
              )}
            </div>

            {/*$2b$10$U7rQYSu6uf8OUkm27vNiE.QwD5NJ5wayhXYt4zWLpJh24lNWcZDfu
                        2b$10$U7rQYSu6uf8OUkm27vNiE.QwD5NJ5wayhXYt4zWLpJh24lNWcZDfu */}
          </form>
        </div>
      </section>
      <CTA />
    </MainLayout>
  );
};

export default ProfilePage;
