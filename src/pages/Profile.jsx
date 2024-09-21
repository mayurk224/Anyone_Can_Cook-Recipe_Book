// Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import { ref, listAll, deleteObject } from "firebase/storage";

const Profile = () => {
  const { deleteAccount, currentUser } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await deleteAccount(password); // Pass password for reauthentication
        navigate("/register"); // Redirect to register page after account deletion
      } catch (error) {
        console.error("Failed to delete account:", error);
        setError(
          "Failed to delete account. Please ensure your password is correct and try again."
        );
      }
    }
  };

  if (!currentUser) {
    return <p>You need to be logged in to access this page.</p>;
  }

  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]); // Track user's favorites

  // Fetch user's favorite recipes
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        if (currentUser?.uid) {
          const userDoc = await getDocs(doc(db, "users", currentUser.uid));
          setFavorites(userDoc.data()?.favorites || []); // Load favorites into state
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };

    fetchUserFavorites();
  }, [currentUser?.uid]);

  // Fetch the recipes created by the current user
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        if (currentUser?.uid) {
          const recipesRef = collection(db, "recipes");
          const q = query(recipesRef, where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);

          const userRecipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setRecipes(userRecipes); // Update state with fetched recipes
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUserRecipes();
  }, [currentUser?.uid]);

  // Handle favorite button toggle
  const handleFavoriteToggle = async (recipeId) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);

      // Check if the recipeId is already in the favorites array
      const isFavorite = favorites.includes(recipeId);

      if (isFavorite) {
        // If it's already in favorites, remove it
        await updateDoc(userRef, {
          favorites: arrayRemove(recipeId),
        });
        setFavorites(favorites.filter((id) => id !== recipeId)); // Update local state
        alert("Recipe removed from favorites");
      } else {
        // If it's not in favorites, add it
        await updateDoc(userRef, {
          favorites: arrayUnion(recipeId),
        });
        setFavorites([...favorites, recipeId]); // Update local state
        alert("Recipe added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Handle delete button click
  const handleDelete = async (recipeId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone."
      );

      if (confirmDelete) {
        // Step 1: Delete the recipe from the Firestore 'recipes' collection
        await deleteDoc(doc(db, "recipes", recipeId));

        // Step 2: Delete the recipe's images from Firebase Storage
        const storageRef = ref(storage, `recipesImage/${recipeId}`); // Reference to the folder

        // List all files in the folder
        const listResponse = await listAll(storageRef);

        // Delete each file in the folder
        const deletePromises = listResponse.items.map((fileRef) => {
          return deleteObject(fileRef); // Delete each file
        });

        // Wait for all file deletions to complete
        await Promise.all(deletePromises);

        // Step 3: Remove the recipeId from all users' 'favorites' and 'recipes' fields
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);

        const batch = writeBatch(db); // Use batch for efficient updates

        userSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();

          // Check if the recipeId exists in the user's favorites or recipes fields
          const isInFavorites = userData.favorites?.includes(recipeId);
          const isInRecipes = userData.recipes?.includes(recipeId);

          if (isInFavorites || isInRecipes) {
            const userRef = doc(db, "users", userDoc.id);

            // Update the user's document to remove the recipeId from both fields if necessary
            const updates = {};
            if (isInFavorites) {
              updates.favorites = arrayRemove(recipeId);
            }
            if (isInRecipes) {
              updates.recipes = arrayRemove(recipeId);
            }

            // Add the update to the batch
            batch.update(userRef, updates);
          }
        });

        // Commit the batch to update all users at once
        await batch.commit();

        // Step 4: Remove the deleted recipe from the local state to update the UI
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );

        alert("Recipe and associated images deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe");
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome, {currentUser.email}!</p>
      <label htmlFor="password">Enter Password for Confirmation:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleDeleteAccount}>Delete Account</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="max-w-6xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">My Recipes</h2>
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

                {/* Favorite Button */}
                <button
                  onClick={() => handleFavoriteToggle(recipe.id)}
                  className={`px-3 py-1 rounded-md mt-4 mr-2 ${
                    favorites.includes(recipe.id)
                      ? "bg-red-500 text-white" // Highlighted if in favorites
                      : "bg-blue-500 text-white" // Normal if not in favorites
                  }`}
                >
                  {favorites.includes(recipe.id) ? "Unfavorite" : "Favorite"}
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md mt-4"
                >
                  Delete Recipe
                </button>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
