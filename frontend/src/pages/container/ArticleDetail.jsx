import React, { useState } from "react";
import MainLayout from "../../Components/MainLayout";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./SuggestedPosts";
import CommentsContainer from "../../Components/comments/CommentsContainer";
import CTA from "./CTA";
import SocialMediaShare from "../../Components/SocialMediaShare";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPosts, getPost } from "../../services/index/posts";
import toast from "react-hot-toast";
import { useEffect } from "react";
import ArticleDetailSkeleton from "../../Components/ArticleDetailSkeleton";
import ErrorMessage from "../../Components/ErrorMessage";
import { useSelector } from "react-redux";
{
  /*const pics = [
    {
        _id :"1",image:images.photo,
        title:"Sunset",
        uploadedOn:"",
        tags:"Sunset"
    },
    {
        _id :"2",image:images.photo2,
        title:"Sunset",
        uploadedOn:"",
        tags:"Sunset"
    },
    {
        _id :"3",image:images.laptop,
        title:"Sunset",
        uploadedOn:"",
        tags:"Sunset"
    },
    {
        _id :"4",image:images.photo,
        title:"Sunset",
        uploadedOn:"",
        tags:"Sunset"
    },
    {
        _id :"5",image:images.photo2,
        title:"Sunset",
        uploadedOn:"1/2/2003",
        tags:"Sunset"
    },
    {
        _id :"6",image:images.laptop,
        title:"Sunset",
        uploadedOn:"",
        tags:"Sunset"
    }
]
 */
}
const tags = ["Sunset", "Fashion", "Lifestyle"];
const ArticleDetail = () => {
  const { slug } = useParams();
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([]);
  const userState = useSelector((state) => state.user);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryFn: () => getPost({ slug, token: userState.userInfo.token }),
    queryKey: ["blog", slug],
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      setBreadcrumbsdata([
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Blog",
          link: "/blog",
        },
        {
          name: "Article title",
          link: `/blog/${data.slug}`,
        },
      ]);
    }
  }, [isSuccess]);

  const {
    data: postData,
    isSuccess: postSuccess,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });
  console.log(postData?.data);

  console.log(data);

  return (
    <MainLayout>
      <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 font-sans">
        {isLoading ? (
          <ArticleDetailSkeleton />
        ) : isError ? (
          <ErrorMessage message="Unable to load page" />
        ) : (
          <article className="flex-1">
            <Breadcrumbs data={Breadcrumbsdata} />
            <img
              className="h-auto w-auto content-center rounded-xl mx-auto"
              src={
                data?.photo
                  ? stables.uploadFolderBaseUrl + data?.photo
                  : images.photo
              }
              alt="article"
            ></img>

            <h1 className="mt-4 text-xl font-semibold text-dgreen ">
              {data?.title}
            </h1>
            <div className="mt-4 text-bluee">
              <p className="font-semibold">{data?.description}</p>
            </div>
            <div className="flex gap-2">
              {data?.categories &&
                data?.categories.map((category) => (
                  <Link
                    to={`/blog?category=${category.name}`}
                    className=" mt-4 inline-block text-lg font-semibold text-cyan-950"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
            <CommentsContainer
              classname="mt-10"
              loginUserId={userState?.userInfo._id}
              comments={data?.comments}
              postSlug={data?.slug}
            />
          </article>
        )}
        <div className="flex flex-col items-center">
          <SuggestedPosts
            pics={postData?.data}
            tags={tags}
            tags1={data?.topics}
            classname="mt-4"
          />
          <div className="mx-auto mt-7 flex w-full flex-col content-center items-center text-center">
            <h2 className="mx-auto my-5 text-center font-bold">Share on:</h2>
            <SocialMediaShare
              url={encodeURI(window.location.href)}
              title={encodeURIComponent(data?.title)}
            />
          </div>
        </div>
      </section>
      <CTA />
    </MainLayout>
  );
};

export default ArticleDetail;
