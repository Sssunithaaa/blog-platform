import React from "react";
import Dropzone from "react-dropzone";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { images } from "../constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/index/posts";
import toast from "react-hot-toast";
import MainLayout from "./MainLayout";
import CTA from "../pages/container/CTA";

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const userState = useSelector((state) => state.user);

  const handleFileChange = (acceptedFile) => {
    setFile(acceptedFile[0]);
    setPreview(URL.createObjectURL(acceptedFile[0]));
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token: token, formData: formData }) => {
      return createPost({ token: token, formData: formData });
    },
    onSuccess: (data) => {
      toast.success("Post updated succesfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("postPicture", file);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("link", data.link);
      formData.append("board", data.board);
      formData.append("topics", data.topics);

      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col m-0 mt-0 top-0 p-0 h-screen border-black/40">
        <div className="text-center text-black h-[100px] p-5 w-full border-b-[1px] border-black/50 font-bold flex justify-between">
          <div className="my-auto mx-auto w-full text-xl">
            <p className="text-center">CREATE PINS</p>
          </div>
        </div>
        <div className="lg:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-x-4 content-center">
              <div className="mx-auto w-[50%] h-90 h-fixed content-center p-6 rounded-md">
                <Dropzone
                  onDrop={handleFileChange}
                  accept="image/*"
                  className="h-fixed"
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({
                        className: `${
                          preview ? "bg-white" : "bg-black/40"
                        } dropzone grid content-center  h-full mx-auto lg:w-[70%] rounded-xl `,
                      })}
                    >
                      <input {...getInputProps()} />
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-[80%] h-auto my-5 rounded-lg content-center mx-auto"
                        />
                      ) : (
                        <div className="p-3">
                          <BsFillArrowUpCircleFill
                            style={{
                              fontSize: "40px",
                              marginBottom: "10px",
                              color: "black",
                            }}
                            className="w-full flex mx-auto"
                          />
                          <p className="text-center text-black font-semibold">
                            Drag and drop an image here, or click to select file
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="text-black w-[50%] h-full flex flex-col gap-y-5 py-4 px-4 text-md my-2 font-medium">
                <div className="flex flex-col gap-y-2">
                  <div>
                    <label>Title:</label>
                  </div>
                  <div className="w-[100%]">
                    <input
                      type="text"
                      {...register("title")}
                      className="w-full placeholder:p-2 placeholder:font-medium p-2 rounded-lg border-[1px] border-slate-400"
                      placeholder="Add a title"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div>
                    <label>Description:</label>
                  </div>
                  <div className="w-[100%]">
                    <textarea
                      {...register("description")}
                      className="w-full placeholder:p-2 placeholder:font-medium p-2 rounded-lg border-[1px] border-slate-400"
                      placeholder="Add description"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div>
                    <label>Link:</label>
                  </div>
                  <div className="w-[100%]">
                    <input
                      type="text"
                      {...register("link")}
                      className="w-full placeholder:p-2 placeholder:font-medium p-2 rounded-lg border-[1px] border-slate-400"
                      placeholder="Add a link"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div>
                    <label>Board:</label>
                  </div>
                  <div className="w-[100%]">
                    <input
                      type="text"
                      {...register("board")}
                      className="w-full placeholder:p-2 placeholder:font-medium p-2 rounded-lg border-[1px] border-slate-400"
                      placeholder="Select board"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div>
                    <label>Topics (comma-separated):</label>
                  </div>
                  <div className="w-[100%]">
                    <input
                      type="text"
                      {...register("topics")}
                      className="w-full placeholder:p-2 placeholder:font-medium p-2 rounded-lg border-[1px] border-slate-400"
                      placeholder="Add related topics"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="p-2 bg-bluee text-white w-[60%] flex mx-auto text-center rounded-lg"
                >
                  <p className="w-full text-center ">Publish</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <CTA />
    </MainLayout>
  );
};

export default CreatePost;
