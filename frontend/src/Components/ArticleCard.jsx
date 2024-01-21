import React from "react";
import { images } from "../constants";
import stables from "../constants/stables";
import { Link } from "react-router-dom";
const ArticleCard = ({ post, className }) => {
  const slug = post.slug;
  return (
    <div
      className={`overflow-hidden rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${className}`}
    >
      <Link to={`blog/${slug}`}>
        {" "}
        <img
          className="mx-auto my-0 h-auto w-full object-cover object-center sm:h-[210px] md:h-[220px] lg:h-[260px]"
          src={
            post?.photo
              ? stables.uploadFolderBaseUrl + post.photo
              : images.laptop
          }
          alt="title"
        ></img>
      </Link>
      <div className="p-3">
        <Link to={`blog/${slug}`}>
          <h2 className="font-sans text-xl font-bold md:text-2xl">
            {post?.title}{" "}
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold md:text-lg">
            {post?.description}
          </p>
        </Link>
        <div className="mt-6 flex flex-nowrap items-center justify-between">
          <div className="flex items-center">
            <img
              src={
                post?.user?.avatar
                  ? stables.uploadFolderBaseUrl + post?.user?.avatar
                  : images.woman
              }
              className="h-auto w-1/5 rounded-full md:h-auto md:w-9"
            />
            <div className="ml-5 flex w-auto flex-col gap-x-6">
              <h4 className="text-sm font-bold md:text-base">
                {post.user?.name}
              </h4>
              <p className="text-sm font-semibold">Pinfinity user</p>
            </div>
          </div>
          <span className="text-sm font-semibold">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
