// App.jsx or Routes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import Profile from "./pages/Profile";
import MyRecipes from "./pages/MyRecipes";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import RecipeDetails from "./pages/RecipeDetails";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />

          {/* Protected Routes */}
          <Route
            path="/add-recipe"
            element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-recipe"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
