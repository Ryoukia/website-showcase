import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import Button from "react-bootstrap/Button";

export const CityFilters = ({ onFilter, nameFilter }) => {
    
    const filterEndpoint = "https://worldeatsapi.link/city/get-ids?";


    const [tScore, setScore] = useState(1);
    const [tPrice, setPrice] = useState(1);
    const [filterIds, setFilterIds] = useState([]);

    // const [filteredOnce, setFilteredOnce] = useState(false);

    // useEffect(() => {
    //     // call callback on main model page to render the ids we just got
    //     // from filtering.
    //     if (filteredOnce) {
    //         onFilter(filterIds);
    //     }
    // }, [filterIds]);

    useEffect(() => {
        if (filterIds.length > 0){
            onFilter(filterIds)

        }
    }, [filterIds])


    const getFilteredResults = async () => {
        let modifiedEndpoint = filterEndpoint
        // modifiedEndpoint = modifiedEndpoint
        //     .concat("country=")
        //     .concat(country)
        //     .concat("&")
        modifiedEndpoint = modifiedEndpoint
            .concat("score=")
            .concat(tScore)
            .concat("&")
        modifiedEndpoint = modifiedEndpoint
            .concat("price=")
            .concat(tPrice)
        const response = await fetch(modifiedEndpoint);
        const jsonData = await response.json();
        if (response.ok) {
            setFilterIds(jsonData["ids"]);
        } else {
            console.error(`Failed to retrieve filtered results: ${response.status} ${response.statusText}`, jsonData);
        }

    }




    // const getFilteredResults = async () => {
    //     const params = new URLSearchParams({
    //         score: tScore,
    //         price: tPrice,
    //     });
    //     // Is the user filtering on name as well?
    //     if (nameFilter && nameFilter.length > 0) {
    //         params.append("name", nameFilter);
    //     }

    //     const url = filterEndpoint.concat(params.toString());
    //     const response = await fetch(url);
    //     const jsonData = await response.json();
    //     setFilteredOnce(true);
    //     setFilterIds(jsonData["ids"]);
    // };

    return (
        <>
            <div className="all-filter-ui-container">
                {/*Should probably make all these components in the future (phase 4 code cleanup?)
         Note: these are making use of css from FilterDropdown.css
         I decided to do it this way so the filter UI would have a consistent
         look across the website.*/}
                <div className="slider-content-container">
                    <p style={{ textAlign: "center" }}>Minimum Price Level</p>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        defaultValue={1}
                        min={1}
                        max={4}
                        step={0.05}
                        renderThumb={(props, state) => (
                            <div {...props}>{state.valueNow}</div>
                        )}
                        onChange={(value) => setPrice(value)}
                    />


                </div>
                <div className="slider-content-container">
                    <p style={{ textAlign: "center" }}>Minimum Rating</p>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        defaultValue={1}
                        min={1}
                        max={5}
                        step={0.05}
                        renderThumb={(props, state) => (
                            <div {...props}>{state.valueNow}</div>
                        )}
                        onChange={(value) => setScore(value)}
                    />
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
            </div>
        </>
    );
};
