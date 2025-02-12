// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import "./RestaurantPage.css";
import { Link } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { backendAPIAddress } from "../App";


// import {Map, GoogleApiWrapper } from 'google-maps-react'

const RestaurantPage = () => {


  // const {isLoaded} = useLoadScript({
  //   googleMapsApiKey: "AIzaSyBzIzVgulpHqAUJPm9e-L4h1i24WXqxJj4"});


  const [restaurant, setRestaurantData] = useState([]);
  const restaurantId = parseInt(useParams()["id"]);
  const restaurantEndpoint = backendAPIAddress
  // const restaurantEndpoint = "http://127.0.0.1:5000/"
    .concat("restaurants/")
    .concat(restaurantId);

  const [relatedModelsByCuisineData, setRelatedModelsByCuisineData] = useState(
    []
  );
  useEffect(() => {
    const getRestaurantData = async () => {
      const response = await fetch(restaurantEndpoint);
      const jsonData = await response.json();
      setRestaurantData(jsonData);
    };

    const getRelatedModelsByCuisine = async () => {
      let relatedModelsByCuisineEndpoint = backendAPIAddress.concat(
        "api/models/by-cuisine?"
      );

      // add cuisine params to endpoint
      let food_types = restaurant.food_types.split(",");
      relatedModelsByCuisineEndpoint += "cuisines=";
      for (let i = 0; i < food_types.length - 1; i++) {
        relatedModelsByCuisineEndpoint += food_types[i];
        relatedModelsByCuisineEndpoint += ",";
      }
      if (food_types.length > 0) {
        relatedModelsByCuisineEndpoint += food_types[food_types.length - 1];
      }

      // add number matching model params to endpoint
      relatedModelsByCuisineEndpoint += "&number_related_models=1";

      const response = await fetch(relatedModelsByCuisineEndpoint);
      const jsonData = await response.json();
      
      setRelatedModelsByCuisineData(jsonData);
    };

    if (restaurant.length == 0) {
      getRestaurantData();
    } else {
      getRelatedModelsByCuisine();
    }
  }, [restaurant]);

  if (restaurant.length == 0) {
    return <p>Loading...</p>;
  }

  var times_strings = [];
  restaurant.open.forEach((day, index) => {
    var sent = "";
    if (day["start"] != "") {
      sent = day["start"] + " - " + day["end"];
    } else {
      sent = "Closed.";
      times_strings.push(sent);
      return;
    }

    if (day["start1"] != "") {
      sent += ", " + day["start1"] + " - " + day["end1"];
    }

    times_strings.push(sent);
  });

  let price = !restaurant.price ? "?" : restaurant.price;

  const getReviewList = () => {
    return restaurant.reviews.map((review) => (
      <li key={review.id}>
        {review.name} ({review.rating}/5.0): {review.review}
      </li>
    ));
  };


  // let lat = 42
  // let long = 42

  
  console.log(restaurant.latitude)
  console.log(restaurant.longitude)

  function ImageSlider({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    function handlePrevClick() {
      const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
    }

    function handleNextClick() {
      const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img className="restaurant-image" src={images[currentImageIndex]} />
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <button style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid black', backgroundColor: 'white' }} onClick={handlePrevClick}>{"<"}</button>
        <button style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid black', backgroundColor: 'white', marginLeft: '10px' }} onClick={handleNextClick}>{">"}</button>
      </div>
    </div>
  );
  }
  


  //add something where it displays the google maps of the address (form of media)
  //need to flash pictures from yelp
  return (
    <>
      <div>
        <h1 className="restaurant-name">{restaurant.name}</h1>
        {/* this was images code before the carousel */}
        <ImageSlider images={restaurant.images} />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h2>Rating: </h2> <p> {restaurant.rating}/5.0 </p>
            <h2>Price: </h2> <p> {price} </p>
            <h2>Types of Food: </h2>
            <p>{restaurant.food_types} </p>
            <h2>Hours: </h2>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>Monday: {times_strings[0]}</li>
              <li>Tuesday: {times_strings[1]}</li>
              <li>Wednesday: {times_strings[2]}</li>
              <li>Thursday: {times_strings[3]}</li>
              <li>Friday: {times_strings[4]}</li>
              <li>Saturday: {times_strings[5]}</li>
              <li>Sunday: {times_strings[6]}</li>
            </ul>
            <h2>Available For: </h2>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              {restaurant.avail_for.length > 0 ? (
                restaurant.avail_for.map((str) => {
                  return <li>{str}</li>;
                })
              ) : (
                <li>Unknown</li>
              )}
            </ul>
            {/* <p>{transacsString} </p> */}
            <h2>Location: </h2>
            {/* todo: hyperlink Austin to take you to the cities page */}
            <p>{restaurant.address} </p>
            <h2>Reviews: </h2>
            <ul
              id="reviews-list"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              {restaurant.reviews.length > 0 ? (
                getReviewList()
              ) : (
                <li>No Reviews Found</li>
              )}
            </ul>
            <h2>Come Visit Us!</h2>
            <iframe
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBzIzVgulpHqAUJPm9e-L4h1i24WXqxJj4&q=${restaurant.latitude} ${restaurant.longitude}`}
              ></iframe>



            {/*Links to other models*/}
            <h2>Related recipes you might enjoy:</h2>
            <ul>
              {relatedModelsByCuisineData.recipes?.map((recipe) => {
                return (
                  <li key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
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
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
