import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { images, stables } from '../../constants'
import { useEffect } from 'react'

const SuggestedPosts = ({ classname, pics = [], tags1 }) => {
  return (
    <div
      className={`shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,1) w-full rounded-lg p-4 ${classname}`}
    >
      <h2 className="font-sans text-2xl font-bold">More to explore</h2>
      <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,1) mt-5 grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-3 ">
        {pics.map((item) => (
          <div key={item._id}>
            <Link
              to={`/blog/${item.slug}`}
              className="col-2 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,1) flex flex-col items-center  space-x-3 rounded-lg bg-[#f0f0f0]  hover:bg-[#8c8787] "
            >
              <img
                src={
                  item?.photo
                    ? stables.uploadFolderBaseUrl + item.photo
                    : images.photo
                }
                className=" mt-3 w-3/4 rounded-md object-cover lg:w-[80%]"
              ></img>
              <div
                className="my-5 font-sans text-lg font-semibold text-bluee"
                // Call the refreshArticle function to reload the ArticleDetail page
              >
                <h3>{item.title}</h3>

                {/*<div className='text-sm font-sans text-bluee font-medium'>{item.description}</div>
                
                <span className='text-xs opacity-60'>
                    {new Date(item.createdAt).toLocaleDateString("en-US",{day:"numeric",
                month:"short",
                year:"numeric"})}</span> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mx-auto flex flex-col items-center">
        <h2 className="mt-4 flex flex-wrap gap-x-2 gap-y-2 font-sans font-bold">
          Related posts
        </h2>
        <div className="flex flex-row flex-nowrap ">
          {tags1?.length === 0 ? (
            <p className="font-semibold text-orange-500">No related tags</p>
          ) : (
            tags1?.map((item) => (
              <Link
                to="/"
                className="m-4 w-auto gap-x-5 rounded-xl  border-2 bg-black/60 p-3 font-semibold"
              >
                {item}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SuggestedPosts
