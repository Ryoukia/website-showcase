import RecipeCard from "../components/RecipeCard";
import "./Recipes.css";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { FilterDropdown } from "../components/FilterDropdown";
import { RecipeFilters } from "../components/RecipeFilters";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";


const Recipes = () => {
  const numberOfRecipesInDatabase = 110;

  // Generate all possible recipe id's based on number in database.
  const getAllRecipeIds = () => {
    return Array.from(
      { length: numberOfRecipesInDatabase },
      (_, index) => index + 1
    );
  };

  // Use state for recipeIds. These are the recipe ids that will get
  // rendered in recipe cards. Initially have all available ids.
  // We use useState() hook since recipe ids can update if user
  // searches or filters.
  const [recipeIds, setRecipeIds] = useState(getAllRecipeIds());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = recipeIds.slice(indexOfFirstItem, indexOfLastItem);
  let totalPages = Math.ceil(recipeIds.length / itemsPerPage);

  const [pageLinks, setPageLinks] = useState([]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Update page/pagination when recipeIds changes.
  useEffect(() => {
    setCurrentPage(1);
    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;

    currentItems = recipeIds.slice(indexOfFirstItem, indexOfLastItem);

    totalPages = Math.ceil(recipeIds.length / itemsPerPage);

    let newPageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
      newPageLinks.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    setPageLinks(newPageLinks);
  }, [recipeIds]);

  const searchEndpoint = "https://worldeatsapi.link/recipes/get-ids?";
  // Substring to highlight in recipe card components when we search.
  const [lastSearchInput, setLastSearchInput] = useState("");

  // Callback function to handle a search.
  const handleSearch = (searchInput) => {
    setLastSearchInput(searchInput);

    // Add parameters to request
    const endpoint = searchEndpoint.concat("name=").concat(searchInput);

    // Async function definition for fulfulling request.
    const getRecipeIdsForSearch = async () => {
      const response = await fetch(endpoint);
      const jsonData = await response.json();
      console.log(jsonData);
      setRecipeIds(jsonData["ids"]);
    };

    if (searchInput.length > 0) {
      getRecipeIdsForSearch(searchInput);
    } else {
      // Empty search, display all recipes again.
      setRecipeIds(getAllRecipeIds());
    }
  };

  // Callback to update ids to render when response
  // for filtering is received.
  const handleNewFilterResults = (ids) => {
    console.log(ids);
    setRecipeIds(ids);
  };



  const [sortby, setSort] = useState("")

  const handleSort = (option) => {
    let upvotes_ep = "https://worldeatsapi.link/recipes/sort-by-upvotes?sort_order="
    let calories_ep = "https://worldeatsapi.link/recipes/sort-by-calories?sort_order="
    let cook_time_ep = "https://worldeatsapi.link/recipes/sort-by-time_to_cook?sort_order="
    let num_ingredients_ep = "https://worldeatsapi.link/recipes/sort-by-num_ingredients?sort_order="


    let new_ep = ""
    if (option === "upvotes_asc") {
      setSort("Number of Upvotes: least -  most")
      new_ep = upvotes_ep.concat("asc")

    } else if (option === "upvotes_desc") {
      setSort("Number of Upvotes: most - least")
      new_ep = upvotes_ep.concat("desc")

    } else if (option === "calories_asc") {
      setSort("Number of Calories: least -  most")
      new_ep = calories_ep.concat("asc")
    } else if (option === "calories_desc") {
      setSort("Number of Calories: most - least")
      new_ep = calories_ep.concat("desc")
    } else if (option === "cook_time_asc") {
      setSort("Cook Time: least -  most")
      new_ep = cook_time_ep.concat("asc")
    } else if (option === "cook_time_desc") {
      setSort("Cook Time: most - least")
      new_ep = cook_time_ep.concat("desc")

    } else if (option === "num_ingredients_asc") {
      setSort("Number of Ingredients: least -  most")
      new_ep = num_ingredients_ep.concat("asc")

    } else if (option === "num_ingredients_desc") {
      setSort("Number of Ingredients: most - least")
      new_ep = num_ingredients_ep.concat("desc")
    }

    const getRecipesInOrder = async () => {
      const response = await fetch(new_ep)
      const jsonData = await response.json()
      setRecipeIds(jsonData["ids"])
      console.log(jsonData["ids"])
    }

    getRecipesInOrder()

  };


  const clearFilters = () => {
    setRecipeIds(getAllRecipeIds())
    setSort("Select An Option")

  }

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Recipes</h1>

        {/*Create search bar, passing in callback function to run when search is ran.*/}
        <SearchBar
          onSearch={handleSearch}
          barCssClassName="recipe-search-bar"
        ></SearchBar>

        {/*
        Pass your model filter component as props to FilterDropdown.

        Make sure to pass a callback from this component to your model filter component,
        to handle receiving filter results.
        In this case, I'm using handleNewFilterResults().

        Also, passing in lastSearchInput as props to RecipeFilters.
        This is so that if the user searched using a name in the search bar,
        (e.g. bread), we can filter on the recipes with "bread" in the name.
        See RecipeFilters.js to see how the props are used.*/}
        <FilterDropdown
          modelFilters={
            <RecipeFilters
              onFilter={handleNewFilterResults}
              nameFilter={lastSearchInput}
            />
          }
        ></FilterDropdown>

        <Button
          className="clear-filter-button"
          variant="primary"
          onClick={(e) => {
            clearFilters()
          }}
          
          >
          Clear Filters and Sorting
            
  
        </Button>


        <DropdownButton
          id="dropdown-sort"
          title={`Sort by: ${sortby || "Select An Option"}`}
          variant="secondary"
          onSelect={handleSort}
        >
          <Dropdown.Item
            eventKey="upvotes_asc"
            // onSelect={handleSort}
          >
            Number of Upvotes: least -  most
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="upvotes_desc"
            // onSelect={handleSort}
          >
            Number of Upvotes: most - least
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="calories_asc"
            // onSelect={handleSort}
          >
            Number of Calories: least -  most
          </Dropdown.Item>

          <Dropdown.Item
          eventKey="calories_desc"
          // onSelect={handleSort}
          >
            Number of Calories: most - least
          </Dropdown.Item>

          <Dropdown.Item
            eventKey="cook_time_asc"
            // onSelect={handleSort}
          >
            Cook Time: least -  most
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="cook_time_desc"
            // onSelect={handleSort}
          >
            Cook Time: most - least
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="num_ingredients_asc"
            // onSelect={handleSort}
          >
            Number of Ingredients: least -  most
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="num_ingredients_desc"
            // onSelect={handleSort}
          >
            Number of Ingredients: most - least
          </Dropdown.Item>
        </DropdownButton>


        {/*Pagination bar*/}
        <div className="pagination-container">
          <div className="pagination">
            {pageLinks}
            <button
              className="pagination-arrow"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <div className="pagination-page-number">{`Page ${currentPage} of ${totalPages}`}</div>
            <button
              className="pagination-arrow"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>

        {/*Recipe cards grid*/}
        <div className="recipe-cards-container">
          <div className="recipe-cards">
            {currentItems.map((id) => (
              <RecipeCard
                key={id}
                recipeId={id}
                titleHighlightSubstring={lastSearchInput}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipes;
