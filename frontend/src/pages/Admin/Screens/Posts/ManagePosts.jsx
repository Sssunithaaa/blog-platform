import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import { images, stables } from "../../../../constants";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const ManagePosts = () => {
  const queryClient = useQueryClient();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState();
  const [slug, setSlug] = useState("");
  const [delete1, setDelete1] = useState();
  const userState = useSelector((state) => state.user);
  const {
    data: postData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts({ searchKeyword, page }),
    queryKey: ["posts"],
    OnError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { mutate: mutateDelete, isLoading: deleteLoading } = useMutation({
    mutationFn: ({ slug, token }) => {
      return deletePost({
        token: token,
        slug: slug,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post is deleted");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });
  const searchKeywordHandler = (e) => {
    setSearchKeyword(e.target.value);
  };
  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    refetch();
  };
  const deleteHandler = (slug) => {
    // Invokes the delete action with the correct slug

    mutateDelete({ token: userState.userInfo.token, slug: slug });
    setSlug();
  };
  console.log(postData);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Manage Posts</h1>
      <div className="w-full mx-auto px-4 h-fit font-semibold">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Users</h2>
            <div className="text-end">
              <form
                onSubmit={submitSearchKeywordHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Post title"
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200 "
                    >
                      Photo
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Tags
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-black py-10 w-full animate-pulse"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : postData?.data?.length === 0 ? (
                    <td className="text-center text-black tdy-10 w-full">
                      No posts found
                    </td>
                  ) : (
                    postData?.data.map((post) => (
                      <tr key={post?.slug}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mx-auto">
                              <a
                                href="/"
                                className="relative block items-center"
                              >
                                <img
                                  alt="profile"
                                  src={
                                    post?.avatar
                                      ? stables.uploadFolderBaseUrl +
                                        post.avatar
                                      : images.photo
                                  }
                                  className="mx-auto object-cover rounded-lg h-10 w-auto  "
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap text-center"></p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {post?.title}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {post?.categories.length > 0
                              ? post.categories[0]
                              : "None"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {new Date(post?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            <ul>
                              {post?.topics.length > 0 ? (
                                post?.topics.map((item) => <li>{item}</li>)
                              ) : (
                                <p>No tags</p>
                              )}
                            </ul>
                          </p>
                        </td>

                        {/*p className="text-gray-900 whitespace-no-wrap">
                              
                            </p>*/}
                        {/*<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">active</span>
                          </span>
                          </td>*/}
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <a
                            href="/"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button
                            href="/"
                            className={`${
                              slug ? "hidden" : ""
                            } text-indigo-600 hover:text-indigo-900`}
                            onClick={() => setSlug(post?.slug)}
                          >
                            Delete
                          </button>
                          {slug === post?.slug && (
                            <div className="z-[49] mt-0 flex flex-col my-2 gap-y-2 w-[90%] mx-auto ">
                              <p className="w-full h-auto text-black text-center">
                                Are you sure you want to delete this post?
                              </p>
                              <div className="lg:flex lg:flex-row gap-x-4">
                                <button
                                  className="border-2 rounded-lg bg-purple-800 lg:w-[90%] mx-auto hover:bg-purple-950 hover:text-white text-black p-2"
                                  onClick={() => deleteHandler(post?.slug)}
                                >
                                  Confirm Delete
                                </button>
                                <button
                                  className="border-2 rounded-lg bg-purple-800 lg:w-[90%] w-full mx-auto hover:bg-purple-950 hover:text-white text-black p-2"
                                  onClick={() => setSlug()}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
