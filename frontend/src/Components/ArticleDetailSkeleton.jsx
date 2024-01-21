import { BiImageAlt } from 'react-icons/bi'

const ArticleDetailSkeleton = () => {
  return (
    <section className="container mx-auto flex max-w-5xl animate-pulse flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
      <article className="flex-1">
        {/* post image */}
        <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-slate-300">
          <BiImageAlt className="text-4xl text-slate-400" />
        </div>
        {/* title */}
        <div className="mt-4 h-2 w-2/5 rounded-lg bg-slate-400 md:text-[26px]" />
        <div className="prose prose-sm sm:prose-base mt-4">
          <p className="mt-6 h-2 w-1/2 rounded-lg bg-slate-300"></p>
          <p className="mt-4 h-2 w-full rounded-lg bg-slate-300"></p>
          <p className="mt-4 h-2 w-[70%] rounded-lg bg-slate-300"></p>
          <p className="mt-4 h-2 w-4/5 rounded-lg bg-slate-300"></p>
        </div>
      </article>

      {/* Suggested posts */}
      {/*<div
        className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 mt-8 lg:mt-0 lg:max-w-xs`}
      >
        
        <div className="w-[20%] h-2 rounded-lg bg-slate-300" />
        <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
          {[...Array(6)].map((item, index) => (
            <div
              key={index}
              className="flex space-x-3 flex-nowrap items-center"
            >
              
              <div className="aspect-square w-1/5 rounded-lg bg-slate-300" />
              <div className="w-full">
                
                <div className="w-full h-2 rounded-lg bg-slate-300" />
                <p className="w-[60%] h-2 mt-4 rounded-lg bg-slate-300"></p>
              </div>
            </div>
          ))}
        </div>
      </div>  */}
    </section>
  )
}

export default ArticleDetailSkeleton
