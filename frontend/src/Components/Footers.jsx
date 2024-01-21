import React from "react";

const Footers = () => {
  return (
    <section className="mx-auto flex flex-col bg-bluee font-sans">
      <footer>
        <p className=" py-6 text-center font-sans text-lg font-bold text-white lg:text-3xl xl:text-3xl">
          PINFINITY
        </p>
        <div className="sm:flex-col-2 gap-x-25 md:gap-x-25 gap-y-15 mx-auto my-0 mb-10 flex flex-wrap font-sans font-semibold text-white sm:text-xs md:text-sm">
          <div className="w-full sm:w-[calc(33%)]  md:w-[calc(33%)] lg:w-[calc(33%)] ">
            <h3 className="text-center font-sans font-bold sm:text-base lg:text-lg">
              EXPLORE PINFINITY.COM
            </h3>
            <ul className="mx-auto my-5 items-center text-center text-sm sm:text-base md:text-sm lg:text-lg">
              <li>Sunsets</li>
              <li>Nature and Scenery</li>
              <li>Food and Cuisine</li>
              <li>Fashion and Style</li>
              <li>Animals</li>
            </ul>
          </div>
          <div className="w-full sm:w-[calc(33%)] md:w-[calc(33%)] lg:w-[calc(33%)]">
            <h3 className="text-center font-sans font-bold sm:text-base lg:text-lg">
              ONLINE SERVICES
            </h3>
            <ul className="mx-auto my-5 items-center text-center text-sm sm:text-base md:text-sm lg:text-lg">
              <li>My Account</li>
              <li>Care and Services</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="w-full sm:w-[calc(33%)] md:w-[calc(33%)] lg:w-[calc(33%)]">
            <h3 className="text-center font-sans font-bold sm:text-base lg:text-lg">
              THE HOUSE OF PINFINITY
            </h3>
            <ul className="mx-auto my-5 items-center text-center text-sm sm:text-base md:text-sm lg:text-lg">
              <li>Careers</li>
              <li>Legal</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footers;
