import psycopg2
from request_parser import Recipe, get_processed_recipes
from typing import List


# insert list of recipe objects into database
def insert_into_database(recipes: List[Recipe]):
    for recipe in recipes:
        print("inserting", recipe.name, "into db")
        conn = psycopg2.connect(
            host="worldeats.cmnxckdadt3c.us-east-2.rds.amazonaws.com",
            database="worldeats_initial_name",
            user="worldeats_user",
            password="worldeats_password",
        )
        curr = conn.cursor()
        # Insert the recipe data into the recipes table
        curr.execute(
            """
            INSERT INTO recipes (name, image_url, summary, likes, ready_in_minutes, cost_per_serving, num_equipment, num_instructions, num_ingredients, calories, protein, fat, carbs)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                recipe.name,
                recipe.image_url,
                recipe.summary,
                recipe.likes,
                recipe.ready_in_minutes,
                recipe.cost_per_serving,
                len(recipe.equipment),
                len(recipe.instructions),
                len(recipe.ingredients),
                recipe.calories,
                recipe.protein,
                recipe.fat,
                recipe.carbs,
            ),
        )

        recipe_db_id = curr.fetchone()[0]
        pass

        # Insert the equipment data into the recipe_equipment table
        for equipment in recipe.equipment:
            curr.execute(
                """
                INSERT INTO recipe_equipment (recipe_id, equipment)
                VALUES (%s, %s);
                """,
                (recipe_db_id, equipment),
            )

        # Insert the instruction data into the recipe_instructions table
        step = 1
        for instruction in recipe.instructions:
            curr.execute(
                """
                INSERT INTO recipe_instructions (recipe_id, step_number, instruction)
                VALUES (%s, %s, %s);
                """,
                (recipe_db_id, step, instruction),
            )
            step += 1

        # Insert the ingredient data into the recipe_ingredients table
        for ingredient in recipe.ingredients:
            curr.execute(
                """
                INSERT INTO recipe_ingredients (recipe_id, ingredient)
                VALUES (%s, %s);
                """,
                (recipe_db_id, ingredient),
            )

        # Insert the cuisine data into the recipe_cuisines table
        for cuisine in recipe.cuisines:
            curr.execute(
                """
                INSERT INTO recipe_cuisines (recipe_id, cuisine)
                VALUES (%s, %s);
                """,
                (recipe_db_id, cuisine),
            )

        # Insert the dish_type data into the recipe_dish_types table
        for dish_type in recipe.dish_types:
            curr.execute(
                """
                INSERT INTO recipe_dish_types (recipe_id, dish_type)
                VALUES (%s, %s);
                """,
                (recipe_db_id, dish_type),
            )

        # Insert the ingredient data into the ingredients table
        for diet in recipe.diets:
            curr.execute(
                """
                INSERT INTO recipe_diets (recipe_id, diet)
                VALUES (%s, %s);
                """,
                (recipe_db_id, diet),
            )

        # Commit the changes to the database and close the connection
        conn.commit()
        curr.close()
        conn.close()


# process recipes from ./data.json into Recipe objects, and insert into db
processed_recipes = get_processed_recipes()
insert_into_database(processed_recipes)
