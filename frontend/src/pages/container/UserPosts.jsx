import React from "react";
import ArticleCard from "../../Components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../Components/ArticleCardSkeleton";
import ErrorMessage from "../../Components/ErrorMessage";
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout";
import CTA from "./CTA";
const UserPosts = () => {
  const userState = useSelector((state) => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () =>
      getUserPost({ searchKeyword: "", token: userState.userInfo.token }),
    queryKey: ["userposts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  return (
    <MainLayout>
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
            data?.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="h-auto w-full sm:w-[calc(50%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))
          )}
        </div>
      </section>
      <CTA />
    </MainLayout>
  );
};

export default UserPosts;
