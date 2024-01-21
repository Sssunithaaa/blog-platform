import React from 'react'

const ArticleCardSkeleton = ({ className }) => {
  return (
    <div
      className={`overflow-hidden rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${className} animate-pulse`}
    >
      <div className="aspect-video w-full bg-gray-300" />
      <div className="p-5">
        <div className="mt-4 h-2 w-56 rounded-lg bg-gray-300" />
        <div className="mt-4 h-2 w-24 rounded-lg bg-gray-300" />
        <div className="mt-6 flex flex-nowrap items-center justify-between">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <div className="h-9 w-9 rounded-full bg-gray-300 md:h-10 md:w-10" />
            <div className="flex flex-col">
              <div className="h-2 w-24 rounded-lg bg-gray-300"></div>
              <div className="mt-2 h-2 w-16 rounded-lg bg-gray-300"></div>
            </div>
          </div>
          <div className="mt-2 h-2 w-10 rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCardSkeleton
