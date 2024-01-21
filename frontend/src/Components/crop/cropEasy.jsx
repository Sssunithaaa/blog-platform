import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../services/index/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { userActions } from "../../store/reducers/userReducers";
const CropEasy = ({ photo, setOpenCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [cropperAreaPixels, setCroppedAreaPixels] = useState(null);
  const handleCrop = (croppedArea, cropperAreaPixels) => {
    setCroppedAreaPixels(cropperAreaPixels);
  };
  const userState = useSelector((state) => state.user);
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
      toast.success("Profile picture is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });
  const handleCropImage = async () => {
    try {
      setOpenCrop(false);
      const croppedImg = await getCroppedImg(photo?.url, cropperAreaPixels);
      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });
      const formData = new FormData();
      formData.append("profilePicture", file);

      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed inset-0 z-[1000] flex justify-center overflow-hidden bg-dgreen/50 p-10 py-[10%] top-0">
      <div className="h-screen top-0 w-full rounded-lg bg-white p-5 sm:max-w-[350px]">
        <h2 className="font-bold text-dgreen">CROP YOUR IMAGE</h2>
        <div className="relative aspect-square w-full">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCrop}
          />
        </div>
        <div>
          <label
            className="mx-auto block w-full justify-center text-sm font-semibold text-dgreen"
            htmlFor="zoomRange"
          >
            Zoom: {Math.round(zoom * 100)}%
          </label>
          <input
            type="range"
            name=""
            id="zoomRange"
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="range-sm mb-6 h-1 w-full cursor-pointer appearance-none bg-gray-400"
          />
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <button
            disabled={isLoading}
            onClick={() => setOpenCrop(false)}
            className="rounded-lg border border-red-600 px-5 py-2.5 text-sm text-red-500 disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            onClick={handleCropImage}
            className="rounded-lg border px-5  py-2.5 text-sm disabled:opacity-70"
          >
            Crop and upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
