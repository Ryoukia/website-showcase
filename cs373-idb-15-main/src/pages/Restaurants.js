import RestaurantCard from "../components/RestaurantCard";
import "./Restaurants.css";
import React, {useState, useEffect} from "react";
import {SearchBar} from "../components/SearchBar"
import { FilterDropdown } from "../components/FilterDropdown";
import { RestaurantFilters } from "../components/RestaurantFilters";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { json } from "react-router-dom";
import Button from "react-bootstrap/Button";






const Restaurants = () => {
  // return <h1>Restaurants</h1>;

  const NUM_RESTS_IN_DB = 345

  // #345 is number of restaurants I ahve in DB rn
  // const restaurantIds = Array.from({length: 345}, (_, index) => index + 1);

 
  const getAllRestaurantIds = () => {
    return Array.from({length: NUM_RESTS_IN_DB}, (_, index) => index + 1)
  }

  const [restaurantIds, setRestaurantIds] = useState(getAllRestaurantIds())

// Pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); //change this for how many cards you want per page

  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = restaurantIds.slice(indexOfFirstItem, indexOfLastItem);

  let totalPages = Math.ceil(restaurantIds.length / itemsPerPage);

  const [pageLinks, setPageLinks] = useState([]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  useEffect(() => {
    setCurrentPage(1);
    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;

    currentItems = restaurantIds.slice(indexOfFirstItem, indexOfLastItem);

    totalPages = Math.ceil(restaurantIds.length / itemsPerPage);

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
  }, [restaurantIds]);

  const searchEndpoint = "https://worldeatsapi.link/restaurants/get-ids?"
  
  const [lastSearchInput, setLastSearchInput] = useState("");

  const handleSearch = (searchInput) => {
    setLastSearchInput(searchInput)

    const endpoint = searchEndpoint.concat("name=").concat(searchInput)

    const getRestaurantIdsForSearch = async () => {
      const response = await fetch(endpoint)
      const jsonData = await response.json()
      console.log(jsonData)
      setRestaurantIds(jsonData["ids"])
    }
    if (searchInput.length > 0) {
      getRestaurantIdsForSearch(searchInput)
    } else {
      setRestaurantIds(getAllRestaurantIds())
    }
  }


  const [sortby, setSort] = useState("")

  const handleSort = (option) => {
    //not printing this
    // console.log("inside handleSort")
    // console.log(restaurantIds)
   

    let price_endpoint = "https://worldeatsapi.link/restaurants/sort-by-price?sort_order="
    let alpha_endpoint = "https://worldeatsapi.link/restaurants/sort-by-alpha?sort_order="
    let rating_endpoint = "https://worldeatsapi.link/restaurants/sort-by-rating?sort_order="


    if (option === "priceLowToHigh") {
      setSort("Price: low - high")

      const ep = price_endpoint.concat("price_low_high")

      const getRestaurantsInOrder = async () => {
        const response = await fetch(ep)
        const jsonData = await response.json()
        setRestaurantIds(jsonData["ids"])
        console.log(jsonData["ids"])
      }

      getRestaurantsInOrder()




    } else if (option === "priceHighToLow") {
      setSort("Price: high - low")

      const ep = price_endpoint.concat("price_high_low")

      const getRestaurantsInOrder = async () => {
        const response = await fetch(ep)
        const jsonData = await response.json()
        setRestaurantIds(jsonData["ids"])
        console.log(jsonData["ids"])
      }

      getRestaurantsInOrder()



    } else if (option === "nameAToZ") {
      setSort("A-Z")
      const ep = alpha_endpoint.concat("asc")

      const getRestaurantsInOrder = async () => {
        const response = await fetch(ep)
        const jsonData = await response.json()
        setRestaurantIds(jsonData["ids"])
        console.log(jsonData["ids"])
      }

      getRestaurantsInOrder()



    } else if (option === "nameZToA") {
      setSort("Z-A")
      const ep = alpha_endpoint.concat("desc")

      const getRestaurantsInOrder = async () => {
        const response = await fetch(ep)
        const jsonData = await response.json()
        setRestaurantIds(jsonData["ids"])
        console.log(jsonData["ids"])
      }

      getRestaurantsInOrder()


    } else if (option === "ratingLowToHigh") {
      setSort("Rating: low - high")
      const ep = rating_endpoint.concat("asc")

      const getRestaurantsInOrder = async () => {
        const response = await fetch(ep)
        const jsonData = await response.json()
        setRestaurantIds(jsonData["ids"])
        console.log(jsonData["ids"])
      }

      getRestaurantsInOrder()
      



    } else if (option === "ratingHighToLow") {
      setSort("Rating: high - low")
      const ep = rating_endpoint.concat("desc")

      const getRestaurantsInOrder = async () => {
        const response = await fetch(ep)
        const jsonData = await response.json()
        setRestaurantIds(jsonData["ids"])
        console.log(jsonData["ids"])
      }

      getRestaurantsInOrder()

    }

   

  };



  const handleNewFilterResults = (ids) => {
    console.log(ids);
    setRestaurantIds(ids);
  };


  const clearFilters = () => {
    setRestaurantIds(getAllRestaurantIds())
    setSort("Select An Option")

  }



  return (
    <>
      <div>
        <h1 style={{textAlign: "center"}}>Restaurants</h1>
        <SearchBar 
          onSearch={handleSearch}  
          barCssClassName="restaurant-search-bar">

        </SearchBar>

        

        <FilterDropdown
          modelFilters={
            <RestaurantFilters 
            onFilter={handleNewFilterResults} 
            nameFilter = {lastSearchInput}
          />
          }
          buttonContainerClassName="filter-button-container"
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
            eventKey="priceLowToHigh"
            // onSelect={handleSort}
          >
            Price: low - high
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="priceHighToLow"
            // onSelect={handleSort}
          >
            Price: high - low
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="nameAToZ"
            // onSelect={handleSort}
          >
            A-Z
          </Dropdown.Item>

          <Dropdown.Item
          eventKey="nameZToA"
          // onSelect={handleSort}
          >
            Z-A
          </Dropdown.Item>

          <Dropdown.Item
            eventKey="ratingLowToHigh"
            // onSelect={handleSort}
          >
            Rating: low - high
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="ratingHighToLow"
            // onSelect={handleSort}
          >
            Rating: high - low
          </Dropdown.Item>
        </DropdownButton>


        

        <div className="pagination-container">
          <div className="pagiantion">{pageLinks}
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

          <div className="restaurant-cards-container">
            <div className="restaurant-cards">
              {currentItems.map(id => (
                <RestaurantCard 
                key={id} 
                restaurantId={id} 
                titleHighlightSubstring={lastSearchInput} 
                />
              ))}
            </div>
          
        </div>
      </div>
    </>
  )
};

export default Restaurants;
