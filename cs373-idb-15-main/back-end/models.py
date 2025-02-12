from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    image_url = db.Column(db.String)
    summary = db.Column(db.String)
    likes = db.Column(db.Integer)
    ready_in_minutes = db.Column(db.Integer)
    cost_per_serving = db.Column(db.Numeric(10, 2))
    num_equipment = db.Column(db.Integer)
    num_instructions = db.Column(db.Integer)
    num_ingredients = db.Column(db.Integer)
    calories = db.Column(db.String)
    protein = db.Column(db.String)
    fat = db.Column(db.String)
    carbs = db.Column(db.String)


class RecipeEquipment(db.Model):
    __tablename__ = "recipe_equipment"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    equipment = db.Column(db.String)


class RecipeInstruction(db.Model):
    __tablename__ = "recipe_instructions"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    instruction = db.Column(db.String)


class RecipeIngredient(db.Model):
    __tablename__ = "recipe_ingredients"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    ingredient = db.Column(db.String(255))


class RecipeCuisine(db.Model):
    __tablename__ = "recipe_cuisines"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    cuisine = db.Column(db.String(255))


class RecipeDishType(db.Model):
    __tablename__ = "recipe_dish_types"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    dish_type = db.Column(db.String(255))


class RecipeDiet(db.Model):
    __tablename__ = "recipe_diets"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    diet = db.Column(db.String(255))


class City(db.Model):
    __tablename__ = "city"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True)
    image_url = db.Column(db.Text)
    country = db.Column(db.String(200))
    score = db.Column(db.Float)
    price = db.Column(db.Float)
    cuisines = db.Column(db.Text)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    population = db.Column(db.Float)


class Restaurant(db.Model):
    __tablename__ = "restaurants"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    rating = db.Column(db.String(255))
    price = db.Column(db.String(255))
    food_types = db.Column(db.String)
    address = db.Column(db.String)
    phone_num = db.Column(db.String)
    review_count = db.Column(db.Integer)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)


class RestaurantHours(db.Model):
    __tablename__ = "restaurant_hours"
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer)
    day = db.Column(db.String(255))
    start_time = db.Column(db.String(255))
    end_time = db.Column(db.String(255))
    start_time1 = db.Column(db.String(255))
    end_time1 = db.Column(db.String(255))


class RestaurantAvailFor(db.Model):
    __tablename__ = "restaurant_avail_for"
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer)
    type = db.Column(db.String(255))


class RestaurantReviews(db.Model):
    __tablename__ = "restaurant_reviews"
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer)
    name = db.Column(db.String(255))
    rating = db.Column(db.String(255))
    review = db.Column(db.String)


class RestaurantImages(db.Model):
    __tablename__ = "restaurant_images"
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer)
    image = db.Column(db.String)
