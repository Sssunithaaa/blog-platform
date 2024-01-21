import React from "react";
import ArticleCard from "../../Components/ArticleCard";
import { FaArrowRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../Components/ArticleCardSkeleton";
import ErrorMessage from "../../Components/ErrorMessage";
const Articles = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getAllPosts({ searchKeyword: "", page: 1 }),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  return (
    <section className="container mx-auto flex flex-col px-5 py-10">
      <div className="flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="h-auto w-full sm:w-[calc(40%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch posts" />
        ) : (
          data?.data?.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="h-auto w-full sm:w-[calc(50%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
            />
          ))
        )}
      </div>
      <button className="relative mx-auto flex w-1/4 items-center gap-x-2 rounded-lg border-2 border-cyan-950 bg-bluee p-1 px-6 py-3 text-center">
        <span className="left-2 mx-auto font-sans font-bold text-white">
          More articles
        </span>
        <FaArrowRight className="h-3 w-3" />
      </button>
      <div className="mt-2 flex items-center gap-x-5"></div>
    </section>
  );
};

export default Articles;
