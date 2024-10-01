import React from "react";
import TestImg from "../assets/test.jpg";

const Category = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center">
        <h1 className="text-4xl cursor-default font-semibold text-center p-3">
          Categories
        </h1>
      </div>
      <div className="flex flex-wrap categoryGroup gap-10 mt-5">
        <div className="flex flex-col items-center p-8 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img
              src={TestImg}
              alt=""
              srcset=""
              className="h-24 object-cover w-24 rounded-full"
            />
          </div>
          <div className="">
            <h3 className="text-base font-semibold">Breakfast</h3>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img
              src={TestImg}
              alt=""
              srcset=""
              className="h-24 object-cover w-24 rounded-full"
            />
          </div>
          <div className="">
            <h3 className="text-base font-semibold">Breakfast</h3>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img
              src={TestImg}
              alt=""
              srcset=""
              className="h-24 object-cover w-24 rounded-full"
            />
          </div>
          <div className="">
            <h3 className="text-base font-semibold">Breakfast</h3>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img
              src={TestImg}
              alt=""
              srcset=""
              className="h-24 object-cover w-24 rounded-full"
            />
          </div>
          <div className="">
            <h3 className="text-base font-semibold">Breakfast</h3>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img
              src={TestImg}
              alt=""
              srcset=""
              className="h-24 object-cover w-24 rounded-full"
            />
          </div>
          <div className="">
            <h3 className="text-base font-semibold">Breakfast</h3>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 gap-3 shadow-md rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer">
          <div className="">
            <img
              src={TestImg}
              alt=""
              srcset=""
              className="h-24 object-cover w-24 rounded-full"
            />
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
