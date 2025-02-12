import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "../pages/About";
import Recipes from "../pages/Recipes";
import Restaurants from "../pages/Restaurants";
import Cities from "../pages/Cities";
import Navbar from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import RestaurantCard from "../components/RestaurantCard";
import CityCard from "../components/CityCard";
import { MockRecipeId1, MockRestaurantId1, MockCityId1 } from "./MockData.js";
import "@testing-library/jest-dom";

test("Render about page", () => {
  const { getByText } = render(<About />, { wrapper: MemoryRouter });
  const titleText = getByText(/About Us/);
  expect(titleText).toBeInTheDocument();
});

test("Render recipes page", () => {
  const { getByText } = render(<Recipes />, { wrapper: MemoryRouter });
  const titleText = getByText(/Recipes/);
  expect(titleText).toBeInTheDocument();
});

test("Render restaurants page", () => {
  const { getByText } = render(<Restaurants />, { wrapper: MemoryRouter });
  const titleText = getByText(/Restaurants/);
  expect(titleText).toBeInTheDocument();
});

test("Render cities page", () => {
  const { getByText } = render(<Cities />, { wrapper: MemoryRouter });
  const titleText = getByText(/Cities/);
  expect(titleText).toBeInTheDocument();
});

test("Render nav bar", () => {
  const { getByText } = render(<Navbar />, { wrapper: MemoryRouter });

  // Ensure nav bar has correct elements.
  const siteTitleText = getByText(/WorldEats/);
  expect(siteTitleText).toBeInTheDocument();

  const recipesNavText = getByText(/Recipes/);
  expect(recipesNavText).toBeInTheDocument();

  const restaurantsNavText = getByText(/Restaurants/);
  expect(restaurantsNavText).toBeInTheDocument();

  const citiesNavText = getByText(/Cities/);
  expect(citiesNavText).toBeInTheDocument();
});

test("Test search bar input propogates to callback onSearch()", () => {
  const onSearchMock = jest.fn();
  const { getByPlaceholderText } = render(
    <SearchBar onSearch={onSearchMock} />
  );

  const searchInput = getByPlaceholderText("Search...");
  fireEvent.change(searchInput, { target: { value: "bread" } });
  fireEvent.submit(searchInput);

  expect(onSearchMock).toHaveBeenCalledWith("bread");
});

describe("RecipeCard", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValueOnce({
      ok: true,
      json: () => Promise.resolve(MockRecipeId1),
    });
  });

  afterAll(() => {
    window.fetch.mockRestore();
  });

  it("Render Recipe Card with correct API Data", async () => {
    render(<RecipeCard recipeId={1} />, { wrapper: MemoryRouter });
    // Wait for the API call within RecipeCard to finish and update the component state
    await waitFor(() => {
      const titleElement = screen.getByText(MockRecipeId1.name);
      expect(titleElement).toBeInTheDocument();
    });
  });
});

describe("RestaurantCard", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValueOnce({
      ok: true,
      json: () => Promise.resolve(MockRestaurantId1),
    });
  });

  afterAll(() => {
    window.fetch.mockRestore();
  });

  it("Render Restaurant Card with correct API Data", async () => {
    render(<RestaurantCard restaurantId={1} />, { wrapper: MemoryRouter });
    // Wait for the API call within RecipeCard to finish and update the component state
    await waitFor(() => {
      const titleElement = screen.getByText(MockRestaurantId1.name);
      expect(titleElement).toBeInTheDocument();
    });
  });
});

describe("CityCard", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValueOnce({
      ok: true,
      json: () => Promise.resolve(MockCityId1),
    });
  });

  afterAll(() => {
    window.fetch.mockRestore();
  });

  it("Render City Card with correct API Data", async () => {
    render(<CityCard cityId={1} />, { wrapper: MemoryRouter });
    // Wait for the API call within RecipeCard to finish and update the component state
    await waitFor(() => {
      const titleElement = screen.getByText(MockCityId1.name);
      expect(titleElement).toBeInTheDocument();
    });
  });
});
