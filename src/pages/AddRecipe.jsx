import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase/firebaseConfig"; // Import Firebase config
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddRecipe = () => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "Easy",
    cuisine: "",
    caloriesPerServing: "",
    tags: "",
    rating: "",
    mealType: "",
  });

  const [image, setImage] = useState(null); // State to hold the selected image

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Add the recipe (without the image) to the 'recipes' collection with the current user's UID and timestamp
      const newRecipeRef = await addDoc(collection(db, "recipes"), {
        name: recipe.name,
        ingredients: recipe.ingredients.split(";"),
        instructions: recipe.instructions.split(";"),
        prepTimeMinutes: parseInt(recipe.prepTimeMinutes, 10),
        cookTimeMinutes: parseInt(recipe.cookTimeMinutes, 10),
        servings: parseInt(recipe.servings, 10),
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        caloriesPerServing: parseInt(recipe.caloriesPerServing, 10),
        tags: recipe.tags.split(","),
        mealType: recipe.mealType.split(","),
        rating: parseFloat(recipe.rating),
        userId: currentUser?.uid, // Add current user ID
        createdAt: serverTimestamp(), // Add timestamp
        image: "", // Initially empty, will be updated later with the image URL
      });

      // Step 2: Upload the image to Firebase Storage if an image is selected
      if (image) {
        const storageRef = ref(
          storage,
          `recipesImage/${newRecipeRef.id}/${image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Wait for the image to upload and get the download URL
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring (optional)
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
          },
          async () => {
            // On successful upload, get the image URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Step 3: Update the recipe document with the image URL
            await updateDoc(newRecipeRef, {
              image: downloadURL, // Update recipe with the image URL
            });

            // Step 4: Update the current user's document to include the recipe ID in the recipes array
            const userDocRef = doc(db, "users", currentUser?.uid); // Reference to the user's document
            await updateDoc(userDocRef, {
              recipes: arrayUnion(newRecipeRef.id), // Add the new recipe ID to the user's recipes array
            });

            alert("Recipe added successfully with image!");
          }
        );
      } else {
        // If no image is selected, still add the recipe to the user's document
        const userDocRef = doc(db, "users", currentUser?.uid);
        await updateDoc(userDocRef, {
          recipes: arrayUnion(newRecipeRef.id),
        });
        alert("Recipe added successfully without image.");
      }

      // Reset form fields after submission
      setRecipe({
        name: "",
        ingredients: "",
        instructions: "",
        prepTimeMinutes: "",
        cookTimeMinutes: "",
        servings: "",
        difficulty: "Easy",
        cuisine: "",
        caloriesPerServing: "",
        tags: "",
        rating: "",
        mealType: "",
      });
      setImage(null); // Clear the image state
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Name */}
        <div>
          <label className="block text-sm font-medium">Recipe Name</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium">
            Ingredients (comma-separated)
          </label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium">
            Instructions (comma-separated)
          </label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Preparation Time */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              name="prepTimeMinutes"
              value={recipe.prepTimeMinutes}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Cooking Time */}
          <div className="w-1/2">
            <label className="block text-sm font-medium">
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              name="cookTimeMinutes"
              value={recipe.cookTimeMinutes}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Servings */}
        <div>
          <label className="block text-sm font-medium">Servings</label>
          <input
            type="number"
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium">Difficulty</label>
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Cuisine */}
        <div>
          <label className="block text-sm font-medium">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Calories Per Serving */}
        <div>
          <label className="block text-sm font-medium">
            Calories Per Serving
          </label>
          <input
            type="number"
            name="caloriesPerServing"
            value={recipe.caloriesPerServing}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={recipe.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={recipe.rating}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>

        {/* Meal Type */}
        <div>
          <label className="block text-sm font-medium">
            Meal Type (comma-separated)
          </label>
          <input
            type="text"
            name="mealType"
            value={recipe.mealType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
