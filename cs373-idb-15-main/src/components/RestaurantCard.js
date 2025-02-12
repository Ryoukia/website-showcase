import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { backendAPIAddress } from "../App";
import "./RestaurantCard.css";

// const RestaurantCard = ({restaurantId}) => {

// const restaurant = RestaurantData.find((restaurant) => restaurant.id == restaurantId);
// var price = restaurant.price;
// console.log(restaurant.price);
// if (price == undefined) {
//   price = "Unknown";
// }

const RestaurantCard = ({ restaurantId, titleHighlightSubstring }) => {
  const navigate = useNavigate();

  const [restaurant, setRestaurantData] = useState([]);

  const restaurantEndpoint = backendAPIAddress
    .concat("restaurants/")
    .concat(restaurantId);
  useEffect(() => {
    const getRestaurantData = async () => {
      const response = await fetch(restaurantEndpoint);
      const jsonData = await response.json();
      setRestaurantData(jsonData);
    };
    getRestaurantData();
  }, []);

  if (restaurant.length == 0) {
    return <p>Loading...</p>;
  }

  let price = !restaurant.price ? "?" : restaurant.price;

  let title = restaurant.name;
  // If we received titleHighlightSubstring as props, we will use it to highlight
  // the searched substring in the card title as per assignment spec.
  if (title && titleHighlightSubstring && titleHighlightSubstring.length > 0) {
    // create a regex to match the substring
    const regex = new RegExp(`(${titleHighlightSubstring})`, "gi");
    // replace the substring with a highlighted version of it
    title = title.replace(regex, "<mark>$1</mark>");
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          onClick={() =>
            navigate("/Restaurants/".concat(restaurantId.toString()))
          }
          className="thumbnail"
          variant="top"
          src={restaurant.images[0]}
          name={"restaurant-card-image-link-".concat(restaurantId.toString())}
        />
        <Card.Body>
          {/* use dangerouslySetInnerHTML to display the highlighted HTML, necessary since
          title might contain html tags */}
          <Card.Title dangerouslySetInnerHTML={{ __html: title }}></Card.Title>{" "}
          <Card.Text>{`Rating: ${restaurant.rating}`}</Card.Text>
          <Card.Text>{`Cost: ${price}`}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default RestaurantCard;
