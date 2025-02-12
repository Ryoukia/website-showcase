import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import Button from "react-bootstrap/Button";

export const RecipeFilters = ({ onFilter, nameFilter }) => {
  const filterEndpoint = "https://worldeatsapi.link/recipes/get-ids?";

  const [calories, setCalories] = useState([0, 1000]);
  const [maxCookTime, setMaxCookTime] = useState(20);
  const [maxInstructions, setMaxInstructions] = useState(20);
  const [maxCostPerServing, setMaxCostPerServing] = useState(20);
  const [maxIngredients, setMaxIngredients] = useState(25);
  const [filterIds, setFilterIds] = useState([]);
  const [filteredOnce, setFilteredOnce] = useState(false);

  useEffect(() => {
    // call callback on main model page to render the ids we just got
    // from filtering.
    if (filteredOnce) {
      onFilter(filterIds);
    }
  }, [filterIds]);

  const getFilteredResults = async () => {
    const params = new URLSearchParams({
      min_calories: calories[0],
      max_calories: calories[1],
      max_cook_time: maxCookTime,
      max_instructions: maxInstructions,
      max_cost_per_serving: maxCostPerServing,
      max_ingredients: maxIngredients,
    });
    // Is the user filtering on name as well?
    if (nameFilter && nameFilter.length > 0) {
      params.append("name", nameFilter);
    }

    const url = filterEndpoint.concat(params.toString());
    const response = await fetch(url);
    const jsonData = await response.json();
    setFilteredOnce(true);
    setFilterIds(jsonData["ids"]);
  };

  return (
    <>
      <div className="all-filter-ui-container">
        {/*Should probably make all these components in the future (phase 4 code cleanup?)
         Note: these are making use of css from FilterDropdown.css
         I decided to do it this way so the filter UI would have a consistent
         look across the website.*/}
        <div className="slider-content-container">
          <p style={{ textAlign: "center" }}>Max Cost Per Serving</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={20}
            min={0.05}
            max={20}
            step={0.05}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            onChange={(value) => setMaxCostPerServing(value)}
          />
        </div>

        <div className="slider-content-container">
          <p style={{ textAlign: "center" }}>Max Instructions</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={20}
            min={1}
            max={20}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            onChange={(value) => setMaxInstructions(value)}
          />
        </div>

        <div className="slider-content-container">
          <p style={{ textAlign: "center" }}>Max Ingredients</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={25}
            min={3}
            max={25}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            onChange={(value) => setMaxIngredients(value)}
          />
        </div>

        <div className="slider-content-container">
          <p style={{ textAlign: "center" }}>Max Cook Time (Hours)</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={20}
            min={1}
            max={20}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            onChange={(value) => setMaxCookTime(value)}
          />
        </div>

        <div className="slider-content-container">
          <p style={{ textAlign: "center" }}>Calories</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[0, 1000]}
            min={0}
            max={1000}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            onChange={(value, index) => setCalories(value)}
          />
        </div>
      </div>

      <div className="submit-button-flex">
        <Button
          className="submit-button"
          variant="primary"
          onClick={(e) => {
            getFilteredResults();
          }}
        >
          Apply Filter To Results
        </Button>
      </div>
    </>
  );
};
