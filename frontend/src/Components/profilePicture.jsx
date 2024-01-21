import React, { useState } from "react";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { createPortal } from "react-dom";
import CropEasy from "./crop/cropEasy";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfilePicture } from "../services/index/user";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userActions } from "../store/reducers/userReducers";
const ProfilePicture = ({ avatar, isDisabled }) => {
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file: file });
    setOpenCrop(true);
  };
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile picture is removed");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Do you want to delete profile picture?")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("crop")
        )}
      <div className="my-2 flex w-full flex-col items-center gap-x-4">
        <div className="relative mx-auto h-20 w-20 items-center rounded-full outline outline-1 outline-offset-0 outline-slate-500/50">
          <label
            htmlFor="profilePicture"
            className="absolute inset-0 cursor-pointer rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stables.uploadFolderBaseUrl + avatar}
                alt="profile"
                className="h-full w-full rounded-full object-cover"
              ></img>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-50/50">
                <HiOutlineCamera className="h-auto w-7 text-blue-600" />
                <input
                  type="file"
                  className="sr-only"
                  id="profilePicture"
                  onChange={handleFileChange}
                ></input>
              </div>
            )}
          </label>
        </div>
        {!isDisabled && (
          <button
            type="button"
            onClick={handleDelete}
            className="hover:scale-120 hover:text-white mx-auto my-5 flex rounded-full border-2  bg-slate-600 p-3 px-[7%] text-center font-sans text-base font-medium  text-black hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 "
          >
            DELETE
          </button>
        )}
      </div>
    </>
  );
};

export default ProfilePicture;
