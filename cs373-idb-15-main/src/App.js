import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Restaurants from "./pages/Restaurants";
import Cities from "./pages/Cities";
import CityPage from "./pages/CityPage";
import RecipePage from "./pages/RecipePage";
import RestaurantPage from "./pages/RestaurantPage";
import VisualizationRecipe from "./pages/visualizations/VisualizationRecipe";
import VisualizationRestauraunt from "./pages/visualizations/VisualizationRestauraunt";
import VisualizationCity from "./pages/visualizations/VisualizationCity";
import ProviderVisualization from "./pages/visualizations/ProviderVisualizations";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchResultsPage } from "./pages/SearchResultsPage";

export let backendAPIAddress = "https://worldeatsapi.link/";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/:id" element={<CityPage />} />
          <Route path="/visualization/recipe" element={<VisualizationRecipe />} />
          <Route path="/visualization/restauraunt" element={<VisualizationRestauraunt />} />
          <Route path="/visualization/cities" element={<VisualizationCity />} />
          <Route path="/visualization/provider" element={<ProviderVisualization />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
