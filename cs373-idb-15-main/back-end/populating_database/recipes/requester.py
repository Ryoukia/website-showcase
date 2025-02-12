import requests
import json

# this script calls gets recipe data from API's and writes the recipes JSON object to ./data.json

random_recipe_url = (
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random"
)
headers = {
    "X-RapidAPI-Key": "afdc981cb9msh162f8a1c3aa1d47p1937edjsn97cedc8254e2",
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
}

querystring = {"number": "5", "limitLicense": "true"}

# get random recipe
response = requests.request(
    "GET", random_recipe_url, headers=headers, params=querystring
)
recipe_response_json = response.json()

# get recipe nutrition via another API call using recipe id, append to recipe_response_json
for recipe in recipe_response_json["recipes"]:
    # print(recipe["title"])
    recipe_id = recipe["id"]
    recipe_nutrition_url = f"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/{recipe_id}/nutritionWidget.json"
    recipe_nutrition_response = requests.request(
        "GET", recipe_nutrition_url, headers=headers
    )
    nutrition_json = recipe_nutrition_response.json()
    recipe["calories"] = nutrition_json["calories"]
    recipe["carbs"] = nutrition_json["carbs"]
    recipe["fat"] = nutrition_json["fat"]
    recipe["protein"] = nutrition_json["protein"]
    print(
        recipe["title"],
        recipe["calories"],
        recipe["carbs"],
        recipe["fat"],
        recipe["fat"],
    )

# write JSON objects to data.json
with open("data.json", "w") as f:
    json.dump(recipe_response_json, f)
