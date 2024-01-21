import React from 'react'

const CTA = () => {
  return (
    <>
      <svg
        className="h-auto max-h-40 w-full translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>
      <section className="relative bg-cyan-950">
        <div className="container mx-auto grid grid-cols-12"></div>
      </section>
    </>
  )
}

export default CTA
