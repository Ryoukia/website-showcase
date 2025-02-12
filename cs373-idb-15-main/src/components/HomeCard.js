import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import "./HomeCard.css";
import city_pic from "../images/cities_image.png"
import restaurant_pic from "../images/restaurant_image.png"
import recipe_pic from "../images/recipe_image.png"
import about_pic from "../images/about_pic.png"


const HomeCard = ({card_type, name }) => {
    let image;

    if (card_type == "About") {
        image = about_pic

    } else if (card_type == "Recipes") {
        image = recipe_pic
        

    } else if (card_type == "Restaurants") {
        image = restaurant_pic
        

    } else if (card_type == "Cities") {
        image = city_pic

    } else {
        console.log("something is wrong")
    }
     
    return (
        <>
          <Card name={ name } style={{ width: "18rem" }}>
            <Link to={card_type}>
              <Card.Img className="thumbnail" variant="top" src = {image}/>
            </Link>
            <Card.Body>
              <Card.Title>{card_type}</Card.Title>
              <Card.Text> </Card.Text>
            </Card.Body>
    
          </Card>
        </>
      );
    };
    
    export default HomeCard;
    
