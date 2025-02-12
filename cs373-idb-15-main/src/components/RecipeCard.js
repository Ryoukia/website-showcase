import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { backendAPIAddress } from "../App";
import "./RecipeCard.css";

const RecipeCard = ({ recipeId, titleHighlightSubstring }) => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState([]);
  const dietColors = {
    "dairy free": "#2A9D8F",
    "lacto ovo vegetarian": "#E9C46A",
    vegan: "#F4A261",
    primal: "#264653",
    ketogenic: "#E76F51",
    pescatarian: "#D62828",
    paleolithic: "#219ebc",
    "gluten free": "#457b9d",
  };

  const recipeEndpoint = backendAPIAddress.concat("recipes/").concat(recipeId);
  useEffect(() => {
    const getRecipeData = async () => {
      const response = await fetch(recipeEndpoint);
      const jsonData = await response.json();
      setRecipeData(jsonData);
    };
    getRecipeData();
  }, []);

  if (recipeData.length == 0) {
    return <p>Loading...</p>;
  }

  let title = recipeData.name;
  // If we received titleHighlightSubstring as props, we will use it to highlight
  // the searched substring in the recipe card title as per assignment spec.
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
          onClick={() => navigate("/Recipes/".concat(recipeId.toString()))}
          className="thumbnail"
          variant="top"
          src={recipeData.image}
          name={"recipe-card-image-link-".concat(recipeId.toString())}
        />

        <Card.Body>
          <div className="diet-wrapper">
            {recipeData.diets.map((diet) => (
              <div
                className="diet-container"
                style={{ backgroundColor: dietColors[diet] }}
              >
                <p>{diet}</p>
              </div>
            ))}
          </div>
          {/* use dangerouslySetInnerHTML to display the highlighted HTML, necessary since
          title might contain html tags */}
          <Card.Title dangerouslySetInnerHTML={{ __html: title }}></Card.Title>{" "}
          <ListGroup variant="flush">
            <ListGroup.Item>{recipeData.likes} upvotes👍</ListGroup.Item>
            <ListGroup.Item>
              {recipeData.num_ingredients} ingredients👨‍🍳
            </ListGroup.Item>
            {recipeData.cuisines.length > 0 ? (
              <ListGroup.Item>{recipeData.cuisines[0]}🌎</ListGroup.Item>
            ) : null}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default RecipeCard;
