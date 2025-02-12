// Hold data from OUR API for unit tests.

export const MockRecipeId1 = {
  calories: "396k",
  carbs: "63g",
  cost_per_serving: "2.09",
  cuisines: ["Korean", "Asian"],
  diets: ["dairy free", "lacto ovo vegetarian", "vegan"],
  dish_types: ["side dish"],
  equipment: ["frying pan", "wok"],
  fat: "14g",
  id: 1,
  image: "https://spoonacular.com/recipeImages/637440-556x370.jpg",
  ingredients: [
    "8 ounces sweet potato vermicelli noodles",
    "1 sweet onion, sliced into thin strips",
    "2 cloves garlic, finely chopped",
    "1/2 pound baby spinach, parboiled",
    "2 carrots, julienned",
    "3 scallions, chopped",
    "5 mushrooms, sliced (I like to use creminis)",
    "1/2 cup zucchini, sliced into half-moons",
    "2 tablespoons olive oil",
    "2 tablespoons sesame oil",
    "3 tablespoons soy sauce",
    "1 teaspoon sugar",
    "Salt to taste",
  ],
  instructions: [
    "Cook noodles according to package directions",
    "In a large pan or wok over medium heat, heat olive oil and 1 Tbsp sesame oil",
    "Add onion slices and garlic and saut for about 1 min",
    "Add rest of vegetables and cook for 4-5 min, until the vegetables are half-cooked and still a bit crispy",
    "Turn heat to low and add cooked noodles, soy sauce, sugar, and the remaining sesame oil",
    "Mix to combine and cook for another 2 min",
    "Add salt or more soy sauce if needed (or if you want it a bit sweeter, add a touch more sugar)",
    "If using sesame seeds, add them at finish",
  ],
  likes: 40,
  name: "Chapchae (Korean Stir-Fried Noodles)",
  num_equipment: 2,
  num_ingredients: 13,
  num_instructions: 8,
  protein: "5g",
  ready_in_minutes: 45,
  summary:
    "Chapchae (Korean Stir-Fried Noodles) is a dairy free, lacto ovo vegetarian, and vegan recipe with 4 servings. This side dish has 397 calories, 5g of protein, and 15g of fat per serving. For $2.09 per serving, this recipe covers 21% of your daily requirements of vitamins and minerals. 40 people have made this recipe and would make it again. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately 45 minutes. A few people really liked this Korean dish. A mixture of soy sauce, salt, baby spinach, and a handful of other ingredients are all it takes to make this recipe so scrumptious. All things considered, we decided this recipe deserves a spoonacular score of 91%. This score is spectacular. Similar recipes include Chapchae (Korean Stir-Fried Noodles), Chapchae (Korean Stir-Fried Noodles), and Korean Stir-Fried Noodles (Chapchae).",
};

export const MockRestaurantId1 = {
  address: "Guatemala 4691, C1425BUK Buenos Aires, Argentina",
  avail_for: [],
  food_types: "Steakhouses",
  id: 1,
  images: [
    "https://s3-media3.fl.yelpcdn.com/bphoto/nVuED2zR_9aiacUkGJ3Vxg/o.jpg",
    "https://s3-media3.fl.yelpcdn.com/bphoto/DFe3gWMIUZarbfzKFX0OOQ/o.jpg",
    "https://s3-media2.fl.yelpcdn.com/bphoto/XROl9y1uizNzl5Fhpp7dnQ/o.jpg",
  ],
  name: "Don Julio",
  open: [
    {
      day: "Monday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
    {
      day: "Tuesday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
    {
      day: "Wednesday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
    {
      day: "Thursday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
    {
      day: "Friday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
    {
      day: "Saturday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
    {
      day: "Sunday",
      end: "4:00PM",
      end1: "7:00PM",
      start: "12:00PM",
      start1: "7:00PM",
    },
  ],
  phone_num: "+54 11 4831-9564",
  price: "$$$$",
  rating: "4.5",
  review_count: 422,
  reviews: [
    {
      name: "Aishwarya S.",
      rating: "5",
      review:
        "One of the best steaks I had in Argentina! Coming from New York, I would say that the NY steak is different from here and probably cannot be compared to...",
    },
    {
      name: "Danni H.",
      rating: "3",
      review:
        "Came here for my birthday dinner. Overall, they have amazing food but the service could be better. \n\nWe didn't have a reservation and was only a party of 2....",
    },
    {
      name: "Nadine A.",
      rating: "5",
      review:
        "I swear if Argentina was close, I would never eat or pay for a steak in the states.  Don Julio steakhouse is a must if you're ever in Buenos Aires. The...",
    },
  ],
};

export const MockCityId1 = {
  country: "Argentina",
  cuisines: "Steakhouses.Argentine.Cocktail Bars.Coffee & Tea.Burgers.",
  id: 1,
  image_url:
    "https://tse4.mm.bing.net/th?id=OIP.yctI29_QJcb-wc1ixTZxVQHaFE&pid=Api",
  name: "BUENOS AIRES",
  price: 2.3191489361702127,
  score: 4.28,
};
