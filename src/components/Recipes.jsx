import React from "react";
import { Link } from "react-router-dom";
import Img from "../assets/test.jpg";

const Recipes = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl font-semibold ">Simple and Tasty Recipes</h1>
        <p className="text-lg text-gray-500 w-[700px] text-center">
          Simplicity is the secret to a truly delicious recipe. With just a few
          ingredients and a touch of love, magic happens in the kitchen. Taste
          the joy of effortless cooking!
        </p>
      </div>
      <div className="recipeCardContainer mt-14 flex flex-wrap justify-evenly gap-16">
        <Link
          to=""
          className="flex flex-col transition-all ease-in-out hover:scale-105 p-5 bg-slate-400 rounded-3xl w-96"
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
          <div className="mt-5">
            <h3 className=" text-xl font-semibold">
              Saag (Spinach) with Makki di Roti
            </h3>
            <div className="flex gap-5 mt-3">
              <div className="p-2 bg-slate-300 rounded-3xl w-fit">
                <label htmlFor="">🕧 30 Minutes</label>
              </div>
              <div className="p-2 bg-slate-300 rounded-3xl w-fit">
                <label htmlFor="">🍴 Lunch</label>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recipes;
