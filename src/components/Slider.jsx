import React from "react";
import Image from "../assets/muffin.jpg";

const Slider = () => {
  return (
    <div className="mx-32">
      <div className="bg-slate-500 w-full rounded-3xl h-[500px] flex overflow-hidden">
        <div className="w-1/2 px-14 pt-10">
          <div className="">
            <h3 className=" bg-slate-100 w-fit px-3 py-2 rounded-3xl text-base font-semibold">
              📃 Hot Recipes
            </h3>
          </div>
          <div className="mt-5">
            <h1 className="text-6xl font-semibold leading-tight">
              Spicy delicious chicken wings
            </h1>
            <p className="mt-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              maiores quo in incidunt sed, ipsa animi illum ut aut vel nisi
              quisquam obcaecati. Illum aperiam, veniam possimus a cupiditate
            </p>
          </div>
          <div className="flex mt-6 justify-center gap-7">
            <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
              🕧 30 minutes
            </h3>
            <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
              🍴 Dinner
            </h3>
          </div>
          <div className="flex justify-center mt-7">
            <button className="bg-black text-white text-lg rounded-xl font-semibold px-4 py-2">
              View Recipe <span className="rotate-90 scale-125">🔺</span>
            </button>
          </div>
        </div>
        <div className="w-1/2 object-cover">
          <img src={Image} alt="" srcset="" className="w-full h-full" />
        </div>
      </div>
      <div className="buttonGroup flex justify-end gap-2">
        <button>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/pulsar-line/48/circled-chevron-left.png"
            alt="circled-chevron-left"
          />
        </button>
        <button>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/pulsar-line/48/circled-chevron-right.png"
            alt="circled-chevron-right"
          />
        </button>
      </div>
    </div>
  );
};

export default Slider;
