import React from "react";
import { Link } from "react-router-dom";
import Img from "../assets/test.jpg";

const UsersRecipes = () => {
  return (
    <div>
      <div className="flex">
        <h1 className="w-1/2 text-5xl font-semibold">
          Try this delicious recipe <br /> to make your day
        </h1>
        <p className="w-1/2 text-gray-800">
          Discover the magic in every bite with recipes crafted by our amazing
          community. Each dish is a testament to creativity and flavor, made
          with love by home cooks like you. Try them out and taste the passion
          behind every plate!
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-2 cardContainer mt-10">
        <Link
          to=""
          className="flex flex-col transition-all ease-in-out hover:scale-[102%] p-2 shadow-xl rounded-3xl w-72"
        >
          <div className="relative">
            <img src={Img} alt="" srcset="" className="rounded-3xl" />
            <div className="absolute top-3 right-3">
              <button className="rounded-3xl bg-slate-400 h-10 w-10 flex justify-center items-center">
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/pulsar-line/48/love-circled.png"
                  alt="love-circled"
                />
              </button>
            </div>
          </div>
          <div className="mt-3">
            <h3 className=" text-lg font-semibold">
              Saag (Spinach) with Makki di Roti
            </h3>
            <div className="flex gap-5 mt-3">
              <div className="p-1.5  rounded-3xl w-fit">
                <label htmlFor="" className="text-sm font-medium">
                  🕧 30 Minutes
                </label>
              </div>
              <div className="p-1.5  rounded-3xl w-fit">
                <label htmlFor="" className="text-sm font-medium">
                  🍴 Lunch
                </label>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center mt-5">
        <button className="bg-black text-white p-3 rounded-full">
          View More
        </button>
      </div>
    </div>
  );
};

export default UsersRecipes;
