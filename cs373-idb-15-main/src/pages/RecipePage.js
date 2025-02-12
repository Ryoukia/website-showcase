import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import heart from "../images/heart.png";
import clock from "../images/alarm-clock.png";
import dollar from "../images/dollar.png";
import "./RecipePage.css";
import { Link } from "react-router-dom";
import { backendAPIAddress } from "../App";

const RecipePage = () => {
  const [recipeData, setRecipeData] = useState([]);
  const recipeId = parseInt(useParams()["id"]);
  const recipeEndpoint = backendAPIAddress.concat("recipes/").concat(recipeId);

  const [relatedModelsByCuisineData, setRelatedModelsByCuisineData] = useState(
    []
  );

  useEffect(() => {
    const getRecipeData = async () => {
      const response = await fetch(recipeEndpoint);
      const jsonData = await response.json();
      setRecipeData(jsonData);
    };

    const getRelatedModelsByCuisine = async () => {
      let relatedModelsByCuisineEndpoint =
        backendAPIAddress.concat("api/models/by-cuisine?");
      
      // add cuisine params to endpoint
      relatedModelsByCuisineEndpoint += "cuisines=";
      for (let i = 0; i < recipeData.cuisines.length - 1; i++) {
        relatedModelsByCuisineEndpoint += recipeData.cuisines[i];
        relatedModelsByCuisineEndpoint += ",";
      }
      if (recipeData.cuisines.length > 0) {
        relatedModelsByCuisineEndpoint +=
          recipeData.cuisines[recipeData.cuisines.length - 1];
      }

      // add number matching model params to endpoint
      relatedModelsByCuisineEndpoint += "&number_related_models=1";
      
      const response = await fetch(relatedModelsByCuisineEndpoint);
      const jsonData = await response.json();
      setRelatedModelsByCuisineData(jsonData);
    };

    if (recipeData.length == 0) {
      getRecipeData();
    } else {
      getRelatedModelsByCuisine();
    }
  }, [recipeData]);

  if (recipeData.length == 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="recipe-block">
        <h1 className="recipe-title">{recipeData.name}</h1>
        <img
          className="recipe-image"
          src={recipeData.image}
          alt="recipe image"
        ></img>

        <div className="quick-stats">
          <div>
            <img className="like-icon" src={heart} alt="like icon"></img>
            <p>{recipeData.likes}</p>
          </div>
          <div>
            <img className="clock-icon" src={clock} alt="clock icon"></img>
            <p>
              {recipeData.ready_in_minutes < 60
                ? recipeData.ready_in_minutes + " minutes"
                : recipeData.ready_in_minutes / 60 + " hours"}
            </p>
          </div>
          <div>
            <img className="price-icon" src={dollar} alt="price icon"></img>
            <p>${recipeData.cost_per_serving}/serving</p>
          </div>
        </div>

        <p className="recipe-summary">{recipeData.summary}</p>

        <h2>Equipment:</h2>
        <ul>
          {recipeData.equipment?.map((equipmentStr) => {
            return <li>{equipmentStr}</li>;
          })}
        </ul>

        <h2>Ingredients:</h2>
        <ul>
          {recipeData.ingredients?.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>

        <h2>Instructions:</h2>
        <ul>
          {recipeData.instructions?.map((instr) => {
            return <li>{instr}</li>;
          })}
        </ul>

        <h2>Nutrition:</h2>
        <ul>
          <li>Calories: {recipeData.calories.slice(0, -1)}</li>
          <li>Carbs: {recipeData.carbs}</li>
          <li>Fat: {recipeData.fat}</li>
          <li>Protein: {recipeData.protein}</li>
        </ul>

        {/*Links to other models*/}
        <h2>Related restaurants you might enjoy:</h2>
        <ul>
          {relatedModelsByCuisineData.restaurants?.map((restaurant) => {
            return (
              <li key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <h2>Related cities you might enjoy:</h2>
        <ul>
          {relatedModelsByCuisineData.cities?.map((city) => {
            return (
              <li key={city.id}>
                <Link to={`/cities/${city.id}`}>{city.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RecipePage;
