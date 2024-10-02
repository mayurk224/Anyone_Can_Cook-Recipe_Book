import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]); // Store all favorite recipes for the user
  const currentUser = auth.currentUser; // Get the current user

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes?limit=0");
        const data = await response.json();
        const shuffledRecipes = data.recipes
          .sort(() => 0.5 - Math.random())
          .slice(0, 9); // Fetch only 9 random recipes
        setRecipes(shuffledRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const fetchFavorites = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          setFavorites(userData?.favorites || []); // Get the user's favorite recipes
        } catch (error) {
          console.error("Error fetching user favorites:", error);
        }
      }
    };

    fetchRecipes();
    fetchFavorites(); // Fetch user favorites when component mounts
  }, [currentUser]);

  const toggleFavorite = async (recipeId) => {
    if (!currentUser) {
      return alert("Please log in to add this recipe to your favorites.");
    }

    const userDocRef = doc(db, "users", currentUser.uid);

    try {
      if (favorites.includes(recipeId)) {
        // Remove from favorites
        await updateDoc(userDocRef, {
          favorites: arrayRemove(recipeId),
        });
        setFavorites(favorites.filter((fav) => fav !== recipeId)); // Update local state
      } else {
        // Add to favorites
        await updateDoc(userDocRef, {
          favorites: arrayUnion(recipeId),
        });
        setFavorites([...favorites, recipeId]); // Update local state
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };
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
      <div className="recipeCardContainer mt-14 flex flex-wrap justify-evenly gap-14">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe-details/${recipe.id}`} // Assuming you want to navigate to recipe details
            key={recipe.id}
            className="flex flex-col transition-all ease-in-out hover:scale-[102%] p-5 shadow-xl rounded-3xl w-96"
          >
            <div className="relative">
              <img
                src={recipe.image} // Recipe image
                alt={recipe.name}
                className="rounded-3xl w-full h-56 object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  className="rounded-3xl bg-pink-200 h-10 w-10 flex justify-center items-center"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation on button click
                    toggleFavorite(recipe.id);
                  }}
                >
                  <span>{favorites.includes(recipe.id) ? "❤️" : "🤍"}</span>
                </button>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold">{recipe.name}</h3>
              <div className="flex gap-5 mt-3">
                <div className="p-2 bg-slate-300 rounded-3xl w-fit">
                  <label>🕧 {recipe.prepTimeMinutes} Minutes</label>
                </div>
                <div className="p-2 bg-slate-300 rounded-3xl w-fit">
                  <label>🍴 {recipe.mealType.join(", ")}</label>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
