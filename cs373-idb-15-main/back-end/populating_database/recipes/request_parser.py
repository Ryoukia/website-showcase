import json
import re


# simple Recipe class definition for storing recipe data
class Recipe:
    def __init__(self) -> None:
        self.name = ""
        self.image_url = ""
        self.summary = ""
        self.likes = 0
        self.ready_in_minutes = 0
        self.cost_per_serving = 0
        self.equipment = []
        self.instructions = []
        self.ingredients = []
        self.calories = 0
        self.protein = 0
        self.fat = 0
        self.carbs = 0
        self.cuisines = []
        self.dish_types = []
        self.diets = []

    def __str__(self) -> str:
        ret = ""
        ret += self.name + "\n"
        ret += self.image_url + "\n"
        ret += self.summary + "\n"
        ret += str(self.likes) + "\n"
        ret += str(self.ready_in_minutes) + "\n"
        ret += str(self.cost_per_serving) + "\n"
        for equip in self.equipment:
            ret += equip + "\n"
        for instr in self.instructions:
            ret += instr + "\n"
        for ingredient in self.ingredients:
            ret += ingredient + "\n"
        ret += str(self.calories) + "\n"
        ret += str(self.protein) + "\n"
        ret += str(self.fat) + "\n"
        ret += str(self.carbs) + "\n"
        for cuisine in self.cuisines:
            ret += cuisine + "\n"
        for dish_type in self.dish_types:
            ret += dish_type + "\n"
        for diet in self.diets:
            ret += diet + "\n"
        return ret


# parse API responses into Recipe objects
def get_processed_recipes():
    processed_recipes = []
    with open("data.json", "r") as f:
        data = json.load(f)
        recipes = data["recipes"]
        for recipe_data in recipes:
            recipe = Recipe()
            if "title" not in recipe_data:
                continue
            recipe.name = recipe_data["title"]
            if "image" not in recipe_data:
                print(recipe.name + " did not have image")
                continue
            recipe.image_url = recipe_data["image"]

            # getting recipe summary without html tags and truncating
            if "summary" not in recipe_data:
                print(recipe.name + " did not have summary")
                continue
            recipe_summary = recipe_data["summary"]
            recipe_summary = re.sub(r"<[^>]*>", "", recipe_summary)
            recipe_summary = recipe_summary.split(" With a spoonacular score")[
                0
            ].strip()
            recipe.summary = recipe_summary

            if "aggregateLikes" not in recipe_data:
                print(recipe.name + " did not have likes")
                continue
            recipe.likes = recipe_data["aggregateLikes"]
            if "readyInMinutes" not in recipe_data:
                print(recipe.name + " did not have ready in minutes")
                continue
            recipe.ready_in_minutes = recipe_data["readyInMinutes"]
            if "pricePerServing" not in recipe_data:
                print(recipe.name + " did not have ready in price per serving")
                continue
            recipe.cost_per_serving = round(recipe_data["pricePerServing"] / 100, 2)

            # get recipe instruction/equipment list
            if (
                "analyzedInstructions" not in recipe_data
                or len(recipe_data["analyzedInstructions"]) == 0
            ):
                print(recipe.name + " did not have instructions")
                continue
            recipe_instruction_api_data = recipe_data["analyzedInstructions"][0][
                "steps"
            ]
            for instr in recipe_instruction_api_data:
                recipe.instructions.append(instr["step"])
                for equip in instr["equipment"]:
                    recipe.equipment.append(equip["name"])

            # get recipe ingredients list
            for ingredient in recipe_data["extendedIngredients"]:
                recipe.ingredients.append(ingredient["original"])

            # get nutrition
            if "calories" not in recipe_data:
                print(recipe.name + " did not have calories")
                continue
            recipe.calories = recipe_data["calories"]
            if "protein" not in recipe_data:
                print(recipe.name + " did not have protein")
                continue
            recipe.protein = recipe_data["protein"]
            if "fat" not in recipe_data:
                print(recipe.name + " did not have fat")
                continue
            recipe.fat = recipe_data["fat"]
            if "carbs" not in recipe_data:
                print(recipe.name + " did not have carbs")
                continue
            recipe.carbs = recipe_data["carbs"]
            processed_recipes.append(recipe)

            for cuisine in recipe_data["cuisines"]:
                recipe.cuisines.append(cuisine)

            for dish_type in recipe_data["dishTypes"]:
                recipe.dish_types.append(dish_type)

            for diet in recipe_data["diets"]:
                recipe.diets.append(diet)
    print(str(len(processed_recipes)) + " recipes ready for database insertion")
    return processed_recipes
