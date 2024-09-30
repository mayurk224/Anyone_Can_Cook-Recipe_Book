import React from "react";
import TestImg from "../assets/test.jpg";

const Category = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center p-5 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img src={TestImg} alt="" srcset="" className="h-24 object-cover w-24 rounded-full"/>
          </div>
          <div className="">
            <h3 className="text-base font-semibold">Breakfast</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
