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
import UsersRecipes from "../components/UsersRecipes";

const Home = () => {
  return (
    <div className="mx-24">
      <Header />

      <Slider />

      <Category />

      <Recipes />

      <TipsSection />

      <SocialMediaPost />

      <UsersRecipes />

      <Footer />
    </div>
  );
};

export default Home;
