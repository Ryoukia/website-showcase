const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

//let siteAddress = "https://www.worldeats.us/";
let siteAddress = "http://localhost:3000/";

describe("World Eats App", function () {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("Test Home Cards Link to Correct Page", async () => {
    const cardNames = [
      "about-card",
      "recipes-card",
      "restaurants-card",
      "cities-card",
    ];
    const expectedLinkedPages = ["About", "Recipes", "Restaurants", "Cities"];

    for (let i = 0; i < cardNames.length; i++) {
      await driver.get(siteAddress);

      const homeCard = await driver.findElement(By.name(cardNames[i]));
      await homeCard.click();

      const currentURL = await driver.getCurrentUrl();
      const expectedURL = siteAddress + expectedLinkedPages[i];

      assert.strictEqual(
        currentURL,
        expectedURL,
        `Expected to be on correct page from ${cardNames[i]}`
      );
    }
  });

  it("Test Navbar Links to Correct Page", async () => {
    const navbarElementNames = [
      "nav-site-title",
      "nav-about",
      "nav-recipes",
      "nav-restaurants",
      "nav-cities",
    ];
    const expectedLinkedPages = [
      "",
      "About",
      "Recipes",
      "Restaurants",
      "Cities",
    ];

    for (let i = 0; i < navbarElementNames.length; i++) {
      await driver.get(siteAddress);

      const navElement = await driver.findElement(
        By.name(navbarElementNames[i])
      );
      await navElement.click();

      const currentURL = await driver.getCurrentUrl();
      const expectedURL = siteAddress + expectedLinkedPages[i];

      assert.strictEqual(
        currentURL,
        expectedURL,
        `Expected to be on correct page from ${navbarElementNames[i]}`
      );
    }
  });

  it("Test Recipe Card Links to Recipe With Id Page", async () => {
    await driver.get(siteAddress);

    // navigate to recipes through nav bar, necessary for recipe cards to load
    const navElement = await driver.findElement(By.name("nav-recipes"));
    await navElement.click();

    // allow time for cards to load
    await driver.sleep(1500);

    const recipeCard = await driver.findElement(
      By.name("recipe-card-image-link-1")
    );
    await recipeCard.click();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = siteAddress.concat("Recipes/1");

    assert.strictEqual(
      currentURL,
      expectedURL,
      "Expected to be on correct recipe page, id:1"
    );
  });

  it("Test Restaurant Card Links to Restaurant With Id Page", async () => {
    await driver.get(siteAddress);

    // navigate to recipes through nav bar, necessary for recipe cards to load
    const navElement = await driver.findElement(By.name("nav-restaurants"));
    await navElement.click();

    // allow time for cards to load
    await driver.sleep(1500);

    const restaurantCard = await driver.findElement(
      By.name("restaurant-card-image-link-1")
    );
    await restaurantCard.click();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = siteAddress.concat("Restaurants/1");

    assert.strictEqual(
      currentURL,
      expectedURL,
      "Expected to be on correct restaurant page, id:1"
    );
  });

  it("Test Cities Card Links to City With Id Page", async () => {
    await driver.get(siteAddress);

    // navigate to recipes through nav bar, necessary for recipe cards to load
    const navElement = await driver.findElement(By.name("nav-cities"));
    await navElement.click();

    // allow time for cards to load
    await driver.sleep(1500);

    const citiesCard = await driver.findElement(
      By.name("city-card-image-link-1")
    );
    await citiesCard.click();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = siteAddress.concat("Cities/1");

    assert.strictEqual(
      currentURL,
      expectedURL,
      "Expected to be on correct cities page, id:1"
    );
  });

  it("Test Site-Wide Search, Ensure Recipe Results", async () => {
    await driver.get(siteAddress);

    // navigate to search bar in navbar
    const searchBarInput = await driver.findElement(
      By.name("sb-input-site-search-bar")
    );
    await searchBarInput.click();
    await searchBarInput.sendKeys("la", Key.ENTER);

    // allow time for search to complete
    await driver.sleep(2000);

    // Select a recipe search result.
    const recipeResultCard = await driver.findElement(
      By.name("recipe-card-image-link-7")
    );
    await recipeResultCard.click();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = siteAddress.concat("Recipes/7");

    assert.strictEqual(
      currentURL,
      expectedURL,
      "Expected to be on recipe page with id 7 after search"
    );
  });

  it("Test Site-Wide Search, Ensure Restaurant Results", async () => {
    await driver.get(siteAddress);

    // navigate to search bar in navbar
    const searchBarInput = await driver.findElement(
      By.name("sb-input-site-search-bar")
    );
    await searchBarInput.click();
    await searchBarInput.sendKeys("bread", Key.ENTER);

    // allow time for search to complete
    await driver.sleep(2000);

    // Select a restaurant search result.
    const restaurantResultCard = await driver.findElement(
      By.name("restaurant-card-image-link-290")
    );
    await restaurantResultCard.click();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = siteAddress.concat("Restaurants/290");

    assert.strictEqual(
      currentURL,
      expectedURL,
      "Expected to be on restaurant page with id 290 after search"
    );
  });

  it("Test Site-Wide Search, Ensure Cities Results", async () => {
    await driver.get(siteAddress);

    // navigate to search bar in navbar
    const searchBarInput = await driver.findElement(
      By.name("sb-input-site-search-bar")
    );
    await searchBarInput.click();
    await searchBarInput.sendKeys("new york", Key.ENTER);

    // allow time for search to complete
    await driver.sleep(2000);

    // Select a restaurant search result.
    const cityResultCard = await driver.findElement(
      By.name("city-card-image-link-336")
    );
    await cityResultCard.click();

    const currentURL = await driver.getCurrentUrl();
    const expectedURL = siteAddress.concat("Cities/336");

    assert.strictEqual(
      currentURL,
      expectedURL,
      "Expected to be on cities page with id 336 after search"
    );
  });
});
