import BarChart from "./BarChart";
import { useEffect, useState } from "react";

const VisualizationRecipe = () => {
  const [recipeData, setRecipeData] = useState({});

  const recipeEndpoint = "https://worldeatsapi.link/recipes?getDishTypes=True";
  useEffect(() => {
    const getRecipeData = async () => {
      const response = await fetch(recipeEndpoint);
      const jsonData = await response.json();

      let dishTypeCounts = {};
      for (let i = 0; i < jsonData.length; i++) {
        const dishString = jsonData[i]["dish_types"][0];
        dishTypeCounts[dishString] = (dishTypeCounts[dishString] || 0) + 1;
      }

      setRecipeData(dishTypeCounts);
    };
    getRecipeData();
  }, []);

  return (
    <div>
      <h2>Recipe Visualization: Recipe Dish Type Counts</h2>
      {Object.keys(recipeData).length === 0 ? (
        <p>Fetching recipe data...</p>
      ) : (
        <p></p>
      )}
      <BarChart
        data={recipeData}
        width={1000}
        height={600}
        xAxisLabel={"Dish Types"}
        yAxisLabel={"Count"}
        xAxisLabelOffset={50}
        yAxisLabelOffset={100}
        numYTicks={5}
        displayXTicks={false}
      ></BarChart>
    </div>
  );
};

export default VisualizationRecipe;
