import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import "./CityPage.css";
import { Link } from "react-router-dom";
import { backendAPIAddress } from "../App";

const CityPage = () => {
  const [cityData, setCityData] = useState([]);
  const cityId = parseInt(useParams()["id"]);
  const cityEndpoint = backendAPIAddress
  // const cityEndpoint = "http://127.0.0.1:5000/"
  .concat("city/")
  .concat(cityId);  const [relatedModelsByCuisineData, setRelatedModelsByCuisineData] = useState(
    []
  );
  useEffect(() => {
    const getCityData = async () => {
      const response = await fetch(cityEndpoint);
      const jsonData = await response.json();
      setCityData(jsonData);
    };

    const getRelatedModelsByCuisine = async () => {
      let relatedModelsByCuisineEndpoint = backendAPIAddress.concat(
        "api/models/by-cuisine?"
      );

      // add cuisine params to endpoint
      let cuisines = cityData.cuisines.split(".");
      relatedModelsByCuisineEndpoint += "cuisines=";
      for (let i = 0; i < cuisines.length - 1; i++) {
        relatedModelsByCuisineEndpoint += cuisines[i];
        relatedModelsByCuisineEndpoint += ",";
      }
      if (cuisines.length > 0) {
        relatedModelsByCuisineEndpoint += cuisines[cuisines.length - 1];
      }

      // add number matching model params to endpoint
      relatedModelsByCuisineEndpoint += "&number_related_models=1";

      const response = await fetch(relatedModelsByCuisineEndpoint);
      const jsonData = await response.json();

      setRelatedModelsByCuisineData(jsonData);
    };

    if (cityData.length == 0) {
      getCityData();
    } else {
      getRelatedModelsByCuisine();
    }
  }, [cityData]);
  if (cityData.length == 0) {
    return <p>Loading...</p>;
  }
  var price = Math.round(cityData.price * 100) / 100;
  var score = Math.round(cityData.score * 100) / 100;
  const cuisines = cityData.cuisines.split(".");
  return (
    <>
      <div>
        <h1 className="city-name">{cityData.name}</h1>
        <img
          className="city-image"
          src={cityData.image_url}
          alt="city image"
        ></img>
       <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <h3 className="city-name">Country: {cityData.country}</h3>
            <h3 className="city-name">Average Restaurant Rating:</h3>
            <p className="city-name">{score}/5.0</p>

            <h3 className="city-name">Known for: </h3>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>{cuisines[0]}</li>
            </ul>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>{cuisines[1]}</li>
            </ul>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>{cuisines[2]}</li>
            </ul>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>{cuisines[3]}</li>
            </ul>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>{cuisines[4]}</li>
            </ul>
            <h3 className="city-name">Average Price (in Yelp Dollars): </h3>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStylePosition: "inside",
              }}
            >
              <li>{price}</li>
            </ul>
            <h2> Come Visit Us!  </h2>
                    <iframe
                        width="600"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBzIzVgulpHqAUJPm9e-L4h1i24WXqxJj4&q=${cityData.latitude} ${cityData.longitude}`}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CityPage;
