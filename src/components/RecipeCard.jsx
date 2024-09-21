import React from "react";
import { FaUtensils, FaClock } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Recipe Image */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />

      {/* Recipe Content */}
      <div className="p-4">
        {/* Recipe Name */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {recipe.name}
        </h3>

        {/* Serving & Cook Time */}
        <div className="flex justify-between items-center text-gray-600 mb-4">
          {/* Serving */}
          <div className="flex items-center space-x-2">
            <FaUtensils className="text-yellow-500" />
            <span>{recipe.serving} servings</span>
          </div>

          {/* Cook Time */}
          <div className="flex items-center space-x-2">
            <FaClock className="text-yellow-500" />
            <span>{recipe.cookTime} mins</span>
          </div>
        </div>

        {/* View Recipe Button */}
        <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
