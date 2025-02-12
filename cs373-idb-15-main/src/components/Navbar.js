import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { SearchBar } from "./SearchBar";

const MyNavbar = () => {
  const navigate = useNavigate();

  const searchEndpoint = "https://worldeatsapi.link/api/models/ids-by-name?";
  const handleSearch = (searchInput) => {
    if (!searchInput || searchInput.length === 0) {
      return;
    }
    const params = new URLSearchParams({
      name: searchInput,
    });
    let url = searchEndpoint.concat(params.toString());

    // Async function definition for fulfulling request.
    const getModelResultsForSearchInput = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      navigate("/search-results", {
        state: { searchResults: jsonData, searchInput: searchInput },
      });
    };

    getModelResultsForSearchInput();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="brand" href="/">WorldEats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/recipes">Recipes</Nav.Link>
          <Nav.Link href="/restaurants">Restaurants</Nav.Link>
          <Nav.Link href="/cities">Cities</Nav.Link>

          <NavDropdown title="Visualizations" id="basic-nav-dropdown">
            <NavDropdown.Item href="/visualization/recipe">Recipes</NavDropdown.Item>
            <NavDropdown.Item href="/visualization/restauraunt">Restauraunts</NavDropdown.Item>
            <NavDropdown.Item href="/visualization/cities">Cities</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/visualization/provider">Provider Visualizations</Nav.Link>


        </Nav>
        
        <SearchBar
        name="nav-search-bar"
        onSearch={handleSearch}
        barCssClassName="site-search-bar"
        className="ml-auto"
      ></SearchBar>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
