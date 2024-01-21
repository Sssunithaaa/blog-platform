import { IoSearchSharp } from 'react-icons/io5'
import React from 'react'
import { images } from '../../constants'

const Hero = () => {
  return (
    <section className="lg:col-3 container mx-auto flex flex-col items-center px-5 font-sans lg:flex-row">
      <div className=" mx-10 items-center lg:mt-0 lg:w-1/2">
        <div className="items-center">
          <h1 className="text-center text-3xl font-bold text-dgreen md:text-5xl lg:max-w-[540px] lg:text-4xl xl:text-5xl">
            What's on your mind?
          </h1>
        </div>
        <div className="relative mt-6 flex flex-col items-center lg:flex-row lg:flex-nowrap">
          <div className="relative mt-5 flex w-full items-center lg:w-3/4">
            <IoSearchSharp className="absolute left-2 top-1/2 h-5 w-6 -translate-y-1/2 text-[#959EAD]" />
            <input
              className="left-10 w-full rounded-lg py-2 pl-10 pr-12 focus:outline-none"
              type="text"
              placeholder="Search articles"
              style={{ boxShadow: 'rgba(0, 0, 0, 0.45) 1.95px 1.95px 2.6px' }}
            />
            <button className="absolute right-2 top-1/2 h-6 -translate-y-1/2 rounded-lg bg-[#201E20] px-4 font-semibold text-white">
              Search
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col lg:mt-7 lg:flex-row lg:flex-nowrap lg:items-start lg:gap-x-4 ">
          <span className="font-semibold italic text-dgreen lg:mt-3">
            Popular tags:
          </span>
          <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2.5">
            <li className="rounded-lg bg-blue-800 bg-opacity-10 px-3 py-1.5 font-sans font-semibold text-blue-800">
              Sunset
            </li>
            <li className="rounded-lg bg-blue-800 bg-opacity-10 px-3 py-1.5 font-sans font-semibold text-blue-800">
              Fashion
            </li>
            <li className="rounded-lg bg-blue-800 bg-opacity-10 px-3 py-1.5 font-sans font-semibold text-blue-800">
              Festival
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden overflow-hidden border-black lg:block lg:w-1/2">
        <img
          src={images.laptop}
          className="hover:scale-120 m-5 h-auto w-full cursor-pointer transition-all duration-500"
        ></img>
      </div>
    </section>
  )
}

export default Hero
