from flask import Flask, jsonify, request
from sqlalchemy import or_, cast, func, Integer
from sqlalchemy import desc
from models import (
    db,
    Recipe,
    RecipeEquipment,
    RecipeInstruction,
    RecipeIngredient,
    RecipeCuisine,
    RecipeDishType,
    RecipeDiet,
    City,
    Restaurant,
    RestaurantHours,
    RestaurantAvailFor,
    RestaurantReviews,
    RestaurantImages,
)
from flask_cors import CORS
from random import randint

app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://worldeats_user:worldeats_password@worldeats.cmnxckdadt3c.us-east-2.rds.amazonaws.com:5432/worldeats_initial_name"

db.init_app(app)


@app.route("/")
def home():
    return "hello world!"


# Get all recipes.
# Optionally, can elect to get only some recipes or some recipe data.
# Params
# limit: an int, defines how many recipes to get
# getBasicData: True/False, parameter presence indicates to get at least basic recipe data for every recipe
# getEquipment: True/False, parameter presence indicates to get recipe equipment list
# getInstructions: True/False, parameter presence indicates to get recipe instruction list
# getIngredients: True/False, parameter presence indicates to get recipe ingredients
# getCuisines: True/False, parameter presence indicates to get recipe cuisines list
# getDishTypes: True/False, parameter presence indicates to get recipe dish type list
# getDiets: True/False, parameter presence indicates to ger recipe diets list
@app.route("/recipes")
def recipes():
    limit = request.args.get("limit")
    recipes = None
    if limit:
        limit = int(limit)
        recipes = Recipe.query.limit(limit).all()
    else:
        recipes = Recipe.query.all()
    if not recipes:
        return jsonify({"error": "No recipes found"})

    get_basic_data = request.args.get("getBasicData", False) == "True"
    get_equipment = request.args.get("getEquipment", False) == "True"
    get_instructions = request.args.get("getInstructions", False) == "True"
    get_ingredients = request.args.get("getIngredients", False) == "True"
    get_cuisines = request.args.get("getCuisines", False) == "True"
    get_dish_types = request.args.get("getDishTypes", False) == "True"
    get_diets = request.args.get("getDiets", False) == "True"

    results = []
    for recipe in recipes:
        result = {"id": recipe.id}
        if get_basic_data:
            result = {
                "id": recipe.id,
                "name": recipe.name,
                "image": recipe.image_url,
                "summary": recipe.summary,
                "likes": recipe.likes,
                "ready_in_minutes": recipe.ready_in_minutes,
                "cost_per_serving": recipe.cost_per_serving,
                "num_equipment": recipe.num_equipment,
                "num_instructions": recipe.num_instructions,
                "num_ingredients": recipe.num_ingredients,
                "calories": recipe.calories,
                "protein": recipe.protein,
                "fat": recipe.fat,
                "carbs": recipe.carbs,
            }

        # get equipment by recipe id from recipe_equipment table
        if get_equipment:
            equipment = RecipeEquipment.query.filter_by(recipe_id=recipe.id).all()
            equipment_list = [i.equipment for i in equipment]
            result["equipment"] = equipment_list

        # get instructions by recipe id from recipe_instructions table
        if get_instructions:
            instructions = RecipeInstruction.query.filter_by(recipe_id=recipe.id).all()
            instruction_list = [i.instruction for i in instructions]
            result["instructions"] = instruction_list

        # get ingredients by recipe id from recipe_ingredients table
        if get_ingredients:
            ingredients = RecipeIngredient.query.filter_by(recipe_id=recipe.id).all()
            ingredient_list = [i.ingredient for i in ingredients]
            result["ingredients"] = ingredient_list

        # get cuisine by recipe id from recipe_cuisines table
        if get_cuisines:
            cuisines = RecipeCuisine.query.filter_by(recipe_id=recipe.id).all()
            cuisine_list = [i.cuisine for i in cuisines]
            result["cuisines"] = cuisine_list

        # get dish_type by recipe id from recipe_dish_types table
        if get_dish_types:
            dish_types = RecipeDishType.query.filter_by(recipe_id=recipe.id).all()
            dish_types_list = [i.dish_type for i in dish_types]
            result["dish_types"] = dish_types_list

        # get diets by recipe id from recipe_diets table
        if get_diets:
            diets = RecipeDiet.query.filter_by(recipe_id=recipe.id).all()
            diets_list = [i.diet for i in diets]
            result["diets"] = diets_list

        results.append(result)

    return jsonify(results)


# Get recipe by id.
@app.route("/recipes/<int:recipe_id>")
def get_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    if not recipe:
        return jsonify({"error": "Recipe not found"})

    # get equipment by recipe id from recipe_equipment table
    equipment = RecipeEquipment.query.filter_by(recipe_id=recipe_id).all()
    equipment_list = [i.equipment for i in equipment]

    # get instructions by recipe id from recipe_instructions table
    instructions = RecipeInstruction.query.filter_by(recipe_id=recipe_id).all()
    instruction_list = [i.instruction for i in instructions]

    # get ingredients by recipe id from recipe_ingredients table
    ingredients = RecipeIngredient.query.filter_by(recipe_id=recipe_id).all()
    ingredient_list = [i.ingredient for i in ingredients]

    # get cuisine by recipe id from recipe_cuisines table
    cuisines = RecipeCuisine.query.filter_by(recipe_id=recipe_id).all()
    cuisine_list = [i.cuisine for i in cuisines]

    # get dish_type by recipe id from recipe_dish_types table
    dish_types = RecipeDishType.query.filter_by(recipe_id=recipe_id).all()
    dish_types_list = [i.dish_type for i in dish_types]

    # get diets by recipe id from recipe_diets table
    diets = RecipeDiet.query.filter_by(recipe_id=recipe_id).all()
    diets_list = [i.diet for i in diets]

    result = {
        "id": recipe.id,
        "name": recipe.name,
        "image": recipe.image_url,
        "summary": recipe.summary,
        "likes": recipe.likes,
        "ready_in_minutes": recipe.ready_in_minutes,
        "cost_per_serving": recipe.cost_per_serving,
        "num_equipment": recipe.num_equipment,
        "num_instructions": recipe.num_instructions,
        "num_ingredients": recipe.num_ingredients,
        "calories": recipe.calories,
        "protein": recipe.protein,
        "fat": recipe.fat,
        "carbs": recipe.carbs,
        "equipment": equipment_list,
        "instructions": instruction_list,
        "ingredients": ingredient_list,
        "cuisines": cuisine_list,
        "dish_types": dish_types_list,
        "diets": diets_list,
    }

    return jsonify(result)


# Get recipe ids that match certain filter parameters.
@app.route("/recipes/get-ids")
def get_recipes_ids():
    name = request.args.get("name")
    min_calories = request.args.get("min_calories")
    max_calories = request.args.get("max_calories")
    max_cook_time = request.args.get("max_cook_time")
    max_instructions = request.args.get("max_instructions")
    max_cost_per_serving = request.args.get("max_cost_per_serving")
    max_ingredients = request.args.get("max_ingredients")

    query = Recipe.query

    # filter by name
    if name:
        query = query.filter(Recipe.name.ilike(f"%{name}%"))

    # filter by calories
    if min_calories and max_calories:
        # Remove "k" character from calories values using regexp_replace()
        # and then cast the result to an integer using cast()
        calories_int = cast(func.regexp_replace(Recipe.calories, "k", ""), Integer)
        query = query.filter(calories_int.between(int(min_calories), int(max_calories)))

    # filter by cook time
    if max_cook_time:
        cook_time_minutes = int(max_cook_time) * 60
        query = query.filter(Recipe.ready_in_minutes <= cook_time_minutes)

    # filter by instruction count
    if max_instructions:
        query = query.filter(Recipe.num_instructions <= max_instructions)

    # filter by cost per serving
    if max_cost_per_serving:
        query = query.filter(Recipe.cost_per_serving <= max_cost_per_serving)

    if max_ingredients:
        # filter by max ingredients
        query = query.filter(Recipe.num_ingredients <= max_ingredients)

    recipes = query.all()
    ids = [i.id for i in recipes]
    return jsonify({"ids": ids})


@app.route("/recipes/sort-by-upvotes")
def get_upvotes_sort_recipes():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        recipes = Recipe.query.order_by(Recipe.likes.asc()).all()
    else:
        recipes = Recipe.query.order_by(desc(Recipe.likes)).all()

    ids = [r.id for r in recipes]
    return jsonify({"ids": ids})


@app.route("/recipes/sort-by-calories")
def get_calories_sort_recipes():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        recipes = Recipe.query.order_by(Recipe.calories.asc()).all()
    else:
        recipes = Recipe.query.order_by(desc(Recipe.calories)).all()

    ids = [r.id for r in recipes]
    return jsonify({"ids": ids})


@app.route("/recipes/sort-by-time_to_cook")
def get_time_to_cook_sort_recipes():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        recipes = Recipe.query.order_by(Recipe.ready_in_minutes.asc()).all()
    else:
        recipes = Recipe.query.order_by(desc(Recipe.ready_in_minutes)).all()

    ids = [r.id for r in recipes]
    return jsonify({"ids": ids})


@app.route("/recipes/sort-by-num_ingredients")
def get_num_ingredients_sort_recipes():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        recipes = Recipe.query.order_by(Recipe.num_ingredients.asc()).all()
    else:
        recipes = Recipe.query.order_by(desc(Recipe.num_ingredients)).all()

    ids = [r.id for r in recipes]
    return jsonify({"ids": ids})


@app.route("/city/<int:city_id>")
def get_city(city_id):
    city: City = City.query.filter_by(id=city_id).first()
    if not city:
        return jsonify({"error": "City not found"})

    result = {
        "id": city.id,
        "name": city.name,
        "image_url": city.image_url,
        "country": city.country,
        "score": city.score,
        "price": city.price,
        "cuisines": city.cuisines,
        "longitude": city.longitude,
        "latitude": city.latitude,
    }

    return jsonify(result)


@app.route("/city/get-ids")
def get_city_ids():
    # print("top of cities get-ids")
    name = request.args.get("name")
    # filter by name
    if name:
        # print(f"Searching for {name}")
        query = City.query.filter(City.name.ilike(f"%{name}%"))
        cities = query.all()
        ids = [i.id for i in cities]
        # print(f"Num query results{len(cities)}")
        return jsonify({"ids": ids})
    # return jsonify({"test": "nothing, yet"})

    # country = request.args.get("country")
    score = request.args.get("score")
    price = request.args.get("price")
    # cuisines = request.args.get("cuisines")

    query = City.query

    # filter by country

    # TODO UNDO comment when country aspect is figured out
    # if country and score and price:
    #     query = query.filter(City.country.ilike(f'%{country}%'))

    if score and price:
        # filter by score
        # if score:
        query = query.filter(City.score >= score)

        # filter by price
        # if price:
        query = query.filter(City.price >= price)

        cities = query.all()
        ids = [i.id for i in cities]
        return jsonify({"ids": ids})
    else:
        return jsonify({"message": "invalid request for get_city_ids"})


@app.route("/city/sort-by-score")
def get_score_sort_city():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        cities = City.query.order_by(City.score.asc()).all()
    else:
        cities = City.query.order_by(desc(City.score)).all()

    ids = [r.id for r in cities]
    return jsonify({"ids": ids})


@app.route("/city/sort-by-price")
def get_price_sort_city():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        cities = City.query.order_by(City.price.asc()).all()
    else:
        cities = City.query.order_by(desc(City.price)).all()

    ids = [r.id for r in cities]
    return jsonify({"ids": ids})


# Random Functions


@app.route("/city/random/<int:num>")
def get_random_cities(num):
    cities = City.query.order_by(func.random()).limit(num).all()

    city_list = []
    for city in cities:
        city_dict = {
            "id": city.id,
            "name": city.name,
            "longitude": city.longitude,
            "latitude": city.latitude,
            "population": city.population,
        }
        city_list.append(city_dict)
    return jsonify(city_list)


@app.route("/restaurants/random/<int:num>")
def get_random_restaurants(num):
    restaurants = Restaurant.query.order_by(func.random()).limit(num).all()

    restaurants_list = []
    for restaurant in restaurants:
        images = RestaurantImages.query.filter_by(restaurant_id=restaurant.id).all()
        image_urls = [image.image for image in images]
        restaurant_dict = {
            "id": restaurant.id,
            "name": restaurant.name,
            "rating": restaurant.rating,
            "price": restaurant.price,
            "food_types": restaurant.food_types,
            "address": restaurant.address,
            "phone_num": restaurant.phone_num,
            "review_count": restaurant.review_count,
            "longitude": restaurant.longitude,
            "latitude": restaurant.latitude,
            "image_urls": image_urls,
        }
        restaurants_list.append(restaurant_dict)
    return jsonify(restaurants_list)


@app.route("/restaurants/<int:restaurant_id>")
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.filter_by(id=restaurant_id).first()
    if not restaurant:
        return jsonify({"error": "Restaurant not found"})

    hours = RestaurantHours.query.filter_by(restaurant_id=restaurant_id).all()
    hours_of_op = []
    # list of days
    for obj in hours:
        open_hours = {
            "day": obj.day,
            # 'start' : obj.start_time,
            # 'end' : obj.end_time
        }
        if obj.start_time != None:
            open_hours["start"] = obj.start_time

        if obj.end_time != None:
            open_hours["end"] = obj.end_time

        if obj.start_time1 != None:
            open_hours["start1"] = obj.start_time1

        if obj.end_time1 != None:
            open_hours["end1"] = obj.end_time1

        hours_of_op.append(open_hours)

    avail_for = RestaurantAvailFor.query.filter_by(restaurant_id=restaurant_id).all()
    avail_for_list = [t.type for t in avail_for]

    images = RestaurantImages.query.filter_by(restaurant_id=restaurant_id).all()
    # images_len = len(images)
    images_list = [i.image for i in images]

    reviews = RestaurantReviews.query.filter_by(restaurant_id=restaurant_id).all()
    # images_len = len(images)
    reviews_list = []

    for obj in reviews:
        item = {"name": obj.name, "rating": obj.rating, "review": obj.review}
        reviews_list.append(item)

    result = {
        "id": restaurant.id,
        "name": restaurant.name,
        "rating": restaurant.rating,
        "price": restaurant.price,
        "food_types": restaurant.food_types,
        "address": restaurant.address,
        "phone_num": restaurant.phone_num,
        "review_count": restaurant.review_count,
        "open": hours_of_op,
        "avail_for": avail_for_list,
        "images": images_list,
        "reviews": reviews_list,
        "longitude": restaurant.longitude,
        "latitude": restaurant.latitude,
    }

    return jsonify(result)


@app.route("/restaurants/get-ids")
def get_restaurant_ids():
    name = request.args.get("name")
    if name:
        # print(f"Searching for {name}")
        query = Restaurant.query.filter(Restaurant.name.ilike(f"%{name}%"))
        restaurants = query.all()
        ids = [i.id for i in restaurants]
        # print(f"Num query results{len(restaurants)}")
        # print(ids)
        return jsonify({"ids": ids})
    # return jsonify({"test": "nothing, yet"})

    # TODO: add an open now feature and maybe a proximity feature

    # filter by:
    """
    price
    rating
    min number of reviews
    
    future (maybe):
    by city maybe
    proximity
    open now
    """

    price = request.args.get("price")
    min_rating = request.args.get("min_rating")
    min_review_count = request.args.get("min_review_count")

    if price and min_rating and min_review_count:
        # filter by price
        query = Restaurant.query.filter(Restaurant.price == price)

        # filter by rating
        query = query.filter(Restaurant.rating >= min_rating)

        # filter by min review count
        query = query.filter(Restaurant.review_count >= min_review_count)

        restaurants = query.all()
        ids = [i.id for i in restaurants]
        return jsonify({"ids": ids})
    else:
        return jsonify({"message": "invalid request for get_restaurants_ids"})


@app.route("/restaurants/sort-by-price")
def get_price_sort():
    sort_order = request.args.get("sort_order")
    if sort_order == "price_high_low":
        restaurants = Restaurant.query.order_by(
            Restaurant.price == "$",
            Restaurant.price == "$$",
            Restaurant.price == "$$$",
            Restaurant.price == "$$$$",
            Restaurant.price == "?",
        ).all()
    else:
        restaurants = Restaurant.query.order_by(
            Restaurant.price == "$$$$",
            Restaurant.price == "$$$",
            Restaurant.price == "$$",
            Restaurant.price == "$",
            Restaurant.price == "?",
        ).all()

    ids = [r.id for r in restaurants]
    return jsonify({"ids": ids})


@app.route("/restaurants/sort-by-alpha")
def get_alpha_sort_restaurants():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        restaurants = Restaurant.query.order_by(Restaurant.name.asc()).all()
    else:
        restaurants = Restaurant.query.order_by(desc(Restaurant.name)).all()

    ids = [r.id for r in restaurants]
    return jsonify({"ids": ids})


@app.route("/restaurants/sort-by-rating")
def get_rating_sort_restaurants():
    sort_order = request.args.get("sort_order")
    if sort_order == "asc":
        restaurants = Restaurant.query.order_by(Restaurant.rating.asc()).all()
    else:
        restaurants = Restaurant.query.order_by(desc(Restaurant.rating)).all()

    ids = [r.id for r in restaurants]
    return jsonify({"ids": ids})


# Gets records for each model that have cuisines/food_types that match
# any of the supplied cuisine strings.
# param1: key: 'cuisines',             value: a comma separated string of cuisines
# param2 key: 'number_related_models', value: an int (number of matches to get per model)
@app.route("/api/models/by-cuisine")
def get_model_data_by_cuisine():
    # get request params
    cuisin_param_str = request.args.get("cuisines")
    num_matches_per_model = int(request.args.get("number_related_models"))
    cuisines_list = cuisin_param_str.split(",")

    # find database entries for each model that matches any of the cuine args
    recipe_cuisines_responses = []
    restaurant_responses = []
    city_responses = []
    recipe_cuisines_responses += (
        RecipeCuisine.query.filter(
            or_(
                *[
                    RecipeCuisine.cuisine.ilike(f"%{cuisine}%")
                    for cuisine in cuisines_list
                ]
            )
        )
        .limit(num_matches_per_model)
        .all()
    )
    restaurant_responses += (
        Restaurant.query.filter(
            or_(
                *[
                    Restaurant.food_types.ilike(f"%{cuisine}%")
                    for cuisine in cuisines_list
                ]
            )
        )
        .limit(num_matches_per_model)
        .all()
    )
    city_responses += (
        City.query.filter(
            or_(*[City.cuisines.ilike(f"%{cuisine}%") for cuisine in cuisines_list])
        )
        .limit(num_matches_per_model)
        .all()
    )

    # get JSON serializable data for each model
    recipes = []
    for recipe_cuisine in recipe_cuisines_responses:
        recipe_dict = get_recipe(recipe_cuisine.recipe_id).json
        recipes.append(recipe_dict)

    restaurants = []
    for restaurant in restaurant_responses:
        restaurant_dict = get_restaurant(restaurant.id).json
        restaurants.append(restaurant_dict)

    cities = []
    for city in city_responses:
        city_dict = get_city(city.id).json
        cities.append(city_dict)

    # if no related data, get random record for each model for now
    if len(recipes) == 0:
        recipe = get_recipe(randint(0, 100)).json
        recipes.append(recipe)

    if len(restaurants) == 0:
        restaurant = get_restaurant(randint(0, 100)).json
        restaurant.append(recipe)

    if len(cities) == 0:
        city = get_city(randint(0, 100)).json
        cities.append(recipe)

    result = {"recipes": recipes, "restaurants": restaurants, "cities": cities}
    return jsonify(result)


@app.route("/city/country_stats")
def get_city_country_stats():
    results = (
        City.query.with_entities(
            City.country,
            db.func.count(City.id).label("num_cities"),
            db.func.avg(City.score).label("avg_score"),
        )
        .group_by(City.country)
        .all()
    )

    # Convert the results to a list of dictionaries
    stats = []
    for r in results:
        stats.append(
            {"country": r.country, "num_cities": r.num_cities, "avg_score": r.avg_score}
        )

    return jsonify(stats)


# Get records from all models that whose name matches a given string.
# Used for site-wide searching.
@app.route("/api/models/ids-by-name")
def get_model_ids_by_name():
    name = request.args.get("name")
    if not name:
        return jsonify({"error": "invalid args"})

    recipes = Recipe.query.filter(Recipe.name.ilike(f"%{name}%")).all()
    restaurants = Restaurant.query.filter(Restaurant.name.ilike(f"%{name}%")).all()
    cities = City.query.filter(City.name.ilike(f"%{name}%")).all()

    recipe_ids = [i.id for i in recipes]
    restaurant_ids = [i.id for i in restaurants]
    city_ids = [i.id for i in cities]

    response = jsonify(
        {
            "recipe_ids": recipe_ids,
            "restaurant_ids": restaurant_ids,
            "city_ids": city_ids,
        }
    )
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run()
