import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { backendAPIAddress } from "../App";
import "./CityCard.css";

const CityCard = ({ cityId, titleHighlightSubstring }) => {
  const navigate = useNavigate();

  const [cityData, setCityData] = useState([]);
  const [title, setTitle] = useState("");
  const cityEndpoint = backendAPIAddress.concat("city/").concat(cityId);
  var score = Math.round(cityData.score * 100) / 100;
  var price = Math.round(cityData.price * 100) / 100;
  useEffect(() => {
    const getCityData = async () => {
      const response = await fetch(cityEndpoint);
      const jsonData = await response.json();
      setCityData(jsonData);
      setTitle(jsonData.name);
    };
    getCityData();
  }, []);

  useEffect(() => {
    let name = cityData.name ? cityData.name : "";
    // If we received titleHighlightSubstring as props, we will use it to highlight
    // the searched substring in the card title as per assignment spec.
    if (titleHighlightSubstring && titleHighlightSubstring.length > 0) {
      // create a regex to match the substring
      const regex = new RegExp(`(${titleHighlightSubstring})`, "gi");
      // replace the substring with a highlighted version of it
      setTitle(name.replace(regex, "<mark>$1</mark>"));
    }
  }, [cityData]);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          onClick={() => navigate("/Cities/".concat(cityId.toString()))}
          className="thumbnail"
          variant="top"
          src={cityData.image_url}
          name={"city-card-image-link-".concat(cityId.toString())}
        />
        <Card.Body>
          {/* use dangerouslySetInnerHTML to display the highlighted HTML, necessary since
          title might contain html tags */}
          <Card.Title dangerouslySetInnerHTML={{ __html: title }}></Card.Title>{" "}
                  <Card.Text> {`Rating: ${score}`} 👍 </Card.Text>
                  <Card.Text> {`Avg. Yelp Price: ${price}`} 💰 </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CityCard;
