import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideGroupRef = useRef(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch random recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes?limit=0");
        const data = await response.json();
        // Randomly select 5 recipes
        const shuffledRecipes = data.recipes
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setRecipes(shuffledRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Function to scroll to the selected slide
  const scrollToSlide = (index) => {
    if (slideGroupRef.current) {
      const slideWidth = slideGroupRef.current.children[0].offsetWidth;
      const scrollPosition = slideWidth * index;
      slideGroupRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Handler for the next button
  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, recipes.length - 1); // Updated logic based on recipes length
      scrollToSlide(newIndex);
      return newIndex;
    });
  };

  // Handler for the previous button
  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      scrollToSlide(newIndex);
      return newIndex;
    });
  };

  const viewRecipeDetails = (id) => {
    navigate(`/recipe-details/${id}`); // Navigate to the recipe details page with the recipe ID
  };

  return (
    <div className="">
      <div
        ref={slideGroupRef}
        className="slideGroup flex flex-nowrap overflow-hidden scroll-smooth rounded-3xl"
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-slate-500 w-full rounded-3xl h-[550px] flex overflow-hidden flex-shrink-0"
          >
            <div className="w-1/2 px-14 pt-10 flex flex-col">
              <h3 className="bg-slate-100 w-fit px-3 py-2 rounded-3xl text-base font-semibold">
                📃 Hot Recipes
              </h3>
              <h1 className="text-6xl font-semibold leading-tight mt-5">
                {recipe.name}
              </h1>
              <h3 className="mt-4">Rating ⭐ {recipe.rating}</h3>

              <div className="flex mt-6 gap-7">
                <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
                  🕧 {recipe.prepTimeMinutes} mins
                </h3>
                <h3 className="px-3 py-2 rounded-3xl font-semibold bg-slate-600">
                  🍴 {recipe.mealType.join(", ")}
                </h3>
              </div>
              <div className="flex mt-6 gap-7">
                <h3>{recipe.tags.join(", ")}</h3>
              </div>
              <button
                onClick={() => viewRecipeDetails(recipe.id)} // On click, navigate to the recipe details page
                className="bg-black text-white text-lg rounded-xl font-semibold px-4 py-2 mt-7 w-fit"
              >
                View Recipe <span className="rotate-90 scale-125">🔺</span>
              </button>
            </div>
            <div className="w-1/2">
              <img
                src={recipe.image}
                alt="Recipe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Buttons */}
      <div className="buttonGroup flex justify-end gap-2 mt-3">
        <button
          onClick={handlePrev}
          className={`${activeIndex === 0 ? "opacity-50" : ""}`}
          disabled={activeIndex === 0}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/pulsar-line/48/circled-chevron-left.png"
            alt="Previous"
          />
        </button>
        <button
          onClick={handleNext}
          className={`${
            activeIndex === recipes.length - 1 ? "opacity-50" : ""
          }`}
          disabled={activeIndex === recipes.length - 1}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/pulsar-line/48/circled-chevron-right.png"
            alt="Next"
          />
        </button>
      </div>
    </div>
  );
};

export default Slider;
