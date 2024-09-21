export const fetchAllRecipes = async () => {
  const response = await fetch("https://dummyjson.com/recipes?limit=0");
  return response.json();
};

export const fetchSingleRecipes = async () => {
  const response = await fetch("https://dummyjson.com/recipes/:id");
  return response.json();
};
