import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import Button from "react-bootstrap/Button";
import { json } from "react-router-dom";


export const RestaurantFilters = ({ onFilter }) => {
    const filterEndpoint = "https://worldeatsapi.link/restaurants/get-ids?"


    // price = request.args.get("price")
    // min_rating = request.args.get("min_rating")
    // min_review_count = request.args.get("min_review_count")
    
    const [price, setPrice] = useState('$')
    const [min_rating, setRating] = useState(0)
    const [min_review_count, setReviewCount] = useState(0)


    const [filterIds, setFilterIds] = useState([]);


    useEffect(() => {
        if (filterIds.length > 0){
            onFilter(filterIds)

        }
    }, [filterIds])


    const getFilteredResults = async () => {
        let modifiedEndpoint = filterEndpoint
        modifiedEndpoint = modifiedEndpoint
            .concat("price=")
            .concat(price)
            .concat("&")
        modifiedEndpoint = modifiedEndpoint
            .concat("min_rating=")
            .concat(min_rating)
            .concat("&")
        modifiedEndpoint = modifiedEndpoint
            .concat("min_review_count=")
            .concat(min_review_count)
        const response = await fetch(modifiedEndpoint);
        const jsonData = await response.json();
        if (response.ok) {
            setFilterIds(jsonData["ids"]);
        } else {
            console.error(`Failed to retrieve filtered results: ${response.status} ${response.statusText}`, jsonData);
        }

    }


    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ textAlign: "center" }}>Price</p>
                <select value={price} onChange={(event) => setPrice(event.target.value)}>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ textAlign: "center" }}>Minimum Rating</p>
                <select value={min_rating} onChange={(event) => setRating(parseInt(event.target.value))}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ textAlign: "center" }}>Minimum Number of Reviews</p>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={0}
                    min={0}
                    max={1500}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    onChange={(value) => setReviewCount(value)}
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
                Submit
                </Button>
            </div>

        
        </>
    )
}