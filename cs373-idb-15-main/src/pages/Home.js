import HomeCard from "../components/HomeCard";

import "./Home.css";
import {React, useState, useEffect, useRef} from 'react';
import { Carousel } from 'react-bootstrap';


const Home = () => {

  const TRANSITION_LENGTH = 7000

  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleClick = (itemIndex) => {
    setIndex(itemIndex);
    setTime(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, TRANSITION_LENGTH);
    setTime(TRANSITION_LENGTH);
    return () => clearTimeout(timer);
  }, [index, time]);


  return (
    <div className="container-fluid">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item onClick={() => handleClick(0)}>
          <img
            className="d-block w-100"
            src={require("../images/restaurant-home.png")}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Discover Restaurants</h3>
            <p>Indulge in a culinary expedition and uncover a world of flavors as you discover the finest restaurants in your city and beyond</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() => handleClick(1)}>
          <img
            className="d-block w-100"
            src={require("../images/recipe-home.png")}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Find Recipes</h3>
            <p>Refine your cooking skills by following curated recipes to create impressive and delicious meals</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item onClick={() => handleClick(0)}>
          <img
            className="d-block w-100"
            src={require("../images/city-home.png")}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Explore Cities</h3>
            <p>Embark on a journey of discovery and adventure as you explore the vibrant and diverse cities of the world</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
