import CityCard from "../components/CityCard";
import "./Cities.css";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { FilterDropdown } from "../components/FilterDropdown";
import { CityFilters } from "../components/CityFilters";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Cities = () => {
    const numberOfCitiesInDatabase = 350

    const getAllCityIds = () => {
        return Array.from(
            { length: numberOfCitiesInDatabase },
            (_, index) => index + 1
        );
    };
    // Pagination code
    const [cityIds, setCityIds] = useState(getAllCityIds());
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20); //change this for how many cards you want per page

    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = cityIds.slice(indexOfFirstItem, indexOfLastItem);
    let totalPages = Math.ceil(cityIds.length / itemsPerPage);

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

        currentItems = cityIds.slice(indexOfFirstItem, indexOfLastItem);

        totalPages = Math.ceil(cityIds.length / itemsPerPage);

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
    }, [cityIds]);

    const searchEndpoint = "https://worldeatsapi.link/city/get-ids?";
    // Substring to highlight in recipe card components when we search.
    const [lastSearchInput, setLastSearchInput] = useState("");

    // Callback function to handle a search.
    const handleSearch = (searchInput) => {
        setLastSearchInput(searchInput);

        // Add parameters to request
        const endpoint = searchEndpoint.concat("name=").concat(searchInput);

        // Async function definition for fulfulling request.
        const getCityIdsForSearch = async () => {
            // console.log("in get city ids for search")
            const response = await fetch(endpoint);
            const jsonData = await response.json();
            // console.log(jsonData);
            setCityIds(jsonData["ids"]);
        };

        if (searchInput.length > 0) {
            getCityIdsForSearch(searchInput);
        } else {
            // Empty search, display all recipes again.
            setCityIds(getAllCityIds());
        }
    };

    // Callback to update ids to render when response
    // for filtering is received.
    const handleNewFilterResults = (ids) => {
        // console.log(ids);
        setCityIds(ids);
    };



    const [sortby, setSort] = useState("")

    const handleSort = (option) => {
        let score_ep = "https://worldeatsapi.link/city/sort-by-score?sort_order="
        let price_ep = "https://worldeatsapi.link/city/sort-by-price?sort_order="


        let new_ep = ""
        if (option === "score_asc") {
            setSort("Average Restaurant Score: lowest - highest")
            new_ep = score_ep.concat("asc")

        } else if (option === "score_desc") {
            setSort("Average Restaurant Score: highest - lowest")
            new_ep = score_ep.concat("desc")

        } else if (option === "price_asc") {
            setSort("Average Restaurant Price: cheapest - most expensive")
            new_ep = price_ep.concat("asc")

        } else if (option === "price_desc") {
            setSort("Average Restaurant Price: most expensive - cheapest")
            new_ep = price_ep.concat("desc")
        }
        const getCitiesInOrder = async () => {
            const response = await fetch(new_ep)
            const jsonData = await response.json()
            setCityIds(jsonData["ids"])
            console.log(jsonData["ids"])
        }

        getCitiesInOrder()

    };

    const clearFilters = () => {
        setCityIds(getAllCityIds())
        setSort("Select An Option")

    }

    return (
        <>
          <div>
                <h1 style={{ textAlign: "center" }}>Cities</h1>

                {/*Create search bar, passing in callback function to run when search is ran.*/}
                <SearchBar
                    onSearch={handleSearch}
                    barCssClassName="city-search-bar"
                ></SearchBar>

                <FilterDropdown
                    modelFilters={
                        <CityFilters
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
                        eventKey="score_asc"
                    // onSelect={handleSort}
                    >
                        Average Restaurant Rating: lowest - highest
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="score_desc"
                    // onSelect={handleSort}
                    >
                        Average Restaurant Rating: highest - lowest
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="price_asc"
                    // onSelect={handleSort}
                    >
                        Average Restaurant Price: cheapest - most expensive
                    </Dropdown.Item>

                    <Dropdown.Item
                        eventKey="price_desc"
                    // onSelect={handleSort}
                    >
                        Average Restaurant Price: most expensive - cheapest
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


            <div className="city-cards-container">
              <div className="city-cards">
                {currentItems.map(id => (
                  <CityCard key={id} cityId={id} titleHighlightSubstring={lastSearchInput}/>
                ))}
              </div>
              
            </div>
          </div>
        </>
    )
};

export default Cities;
