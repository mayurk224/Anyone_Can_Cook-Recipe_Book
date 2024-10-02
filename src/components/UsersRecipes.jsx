import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase/firebaseConfig"; // Added `auth` import
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const UsersRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showViewMore, setShowViewMore] = useState(false); // State to control the View More button
  const [favorites, setFavorites] = useState([]); // Store all favorite recipes for the user
  const [visibleRecipes, setVisibleRecipes] = useState(8); // Limit visible recipes initially to 8
  const currentUser = auth.currentUser; // Get the current user

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeCollection = collection(db, "recipes");
        const recipeSnapshot = await getDocs(recipeCollection);
        const recipeList = recipeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecipes(recipeList); // Store the full list of recipes
        setShowViewMore(recipeList.length > 8); // Show View More button if there are more than 8 recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
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

    fetchFavorites(); // Fetch user favorites when component mounts or `currentUser` changes
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

  const handleViewMore = () => {
    // Increase the number of visible recipes by 8
    setVisibleRecipes((prevVisible) => prevVisible + 8);
    setShowViewMore(visibleRecipes + 8 < recipes.length); // Update the "View More" button state
  };

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
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe-details/${recipe.id}`}
            className="flex flex-col transition-all ease-in-out hover:scale-[102%] p-2 shadow-xl rounded-3xl w-72"
          >
            <div className="relative">
              <img
                src={recipe.image} // Recipe image from Firestore
                alt={recipe.name}
                className="rounded-3xl object-cover w-full h-48"
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
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{recipe.name}</h3>
              <div className="flex gap-5 mt-3">
                <div className="p-1.5 rounded-3xl w-fit">
                  <label htmlFor="" className="text-sm font-medium">
                    🕧 {recipe.prepTimeMinutes} Minutes
                  </label>
                </div>
                <div className="p-1.5 rounded-3xl w-fit">
                  <label htmlFor="" className="text-sm font-medium">
                    🍴 {recipe.mealType.join(", ")}
                  </label>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show the "View More" button only if there are more than visible recipes */}
      {showViewMore && (
        <div className="flex items-center justify-center mt-5">
          <button
            className="bg-black text-white p-3 rounded-full"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersRecipes;
