import { useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import RestaurantCard from "../components/RestaurantCard";
import CityCard from "../components/CityCard";

export const SearchResultsPage = () => {
  // get search results and search input (for highlighting)
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <h1>Search Results:</h1>

      <h2 style={{ textAlign: "center" }}>Recipes:</h2>
      <div className="recipe-cards">
        {state["searchResults"]["recipe_ids"].map((id) => (
          <RecipeCard
            key={id}
            recipeId={id}
            titleHighlightSubstring={state["searchInput"]}
          />
        ))}
      </div>

      <h2 style={{ textAlign: "center" }}>Restaurants:</h2>
      <div className="restaurant-cards">
        {state["searchResults"]["restaurant_ids"].map((id) => (
          <RestaurantCard
            key={id}
            restaurantId={id}
            titleHighlightSubstring={state["searchInput"]}
          />
        ))}
      </div>

      <h2 style={{ textAlign: "center" }}>Cities:</h2>
      <div className="city-cards">
        {state["searchResults"]["city_ids"].map((id) => (
          <CityCard
            key={id}
            cityId={id}
            titleHighlightSubstring={state["searchInput"]}
          />
        ))}
      </div>
    </>
  );
};
