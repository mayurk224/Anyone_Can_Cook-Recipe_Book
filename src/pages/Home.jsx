import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig"; // Import Firebase config
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from "../components/Category";
import Slider from "../components/Slider";
import Recipes from "../components/Recipes";
import TipsSection from "../components/TipsSection";
import SocialMediaPost from "../components/SocialMediaPost";

const Home = () => {
  const { currentUser } = useAuth(); // Get the current user
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]); // Store user's favorite recipes

  // Fetch all recipes from the 'recipes' collection
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const recipeSnapshot = await getDocs(recipesCollection);
        const allRecipes = recipeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Fetch the current user's favorite recipes
  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (currentUser?.uid) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnapshot = await getDocs(userRef);
          setFavorites(userSnapshot.data()?.favorites || []); // Load favorites into state
        } catch (error) {
          console.error("Error fetching user favorites:", error);
        }
      }
    };

    fetchUserFavorites();
  }, [currentUser?.uid]);

  // Handle the favorite button toggle
  const handleFavoriteToggle = async (recipeId) => {
    if (!currentUser) {
      alert("You need to be logged in to favorite a recipe.");
      return;
    }

    const userRef = doc(db, "users", currentUser.uid);

    // Check if the recipe is already in favorites
    const isFavorite = favorites.includes(recipeId);

    try {
      if (isFavorite) {
        // Remove from favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(recipeId),
        });
        setFavorites(favorites.filter((id) => id !== recipeId)); // Update state
        alert("Recipe removed from favorites");
      } else {
        // Add to favorites
        await updateDoc(userRef, {
          favorites: arrayUnion(recipeId),
        });
        setFavorites([...favorites, recipeId]); // Update state
        alert("Recipe added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };
  return (
    <div className="mx-24">
      <Header />

      <Slider />

      <Category />

      <Recipes />

      <TipsSection />

      <SocialMediaPost />

      {/* <div className="max-w-6xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">All Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <h3 className="text-lg font-bold">{recipe.name}</h3>
                <p className="text-sm">
                  <strong>Cooking Time:</strong> {recipe.cookTimeMinutes}{" "}
                  minutes
                </p>
                <p className="text-sm">
                  <strong>Servings:</strong> {recipe.servings}
                </p>

                
                <button
                  onClick={() => handleFavoriteToggle(recipe.id)}
                  className={`px-3 py-1 rounded-md mt-4 ${
                    favorites.includes(recipe.id)
                      ? "bg-red-500 text-white" 
                      : "bg-blue-500 text-white" 
                  }`}
                >
                  {favorites.includes(recipe.id) ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;
