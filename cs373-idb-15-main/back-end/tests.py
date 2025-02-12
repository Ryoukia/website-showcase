import unittest
from app import app
from expected_test_data import (
    recipe_data_id_1,
    restaurant_data_id_1,
    city_data_id_1,
    models_by_cuisine_data_0,
    model_id_by_name_data_0,
    recipe_ids_by_filter_data_0,
)


# Test our back-end API.
class our_api_tests(unittest.TestCase):
    # @app.route("/recipes/<int:recipe_id>")
    def test_recipe_id(self):
        with app.test_client() as client:
            response = client.get("/recipes/1")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, recipe_data_id_1)

    # @app.route("/recipes/get-ids")
    def test_get_recipe_ids(self):
        with app.test_client() as client:
            response = client.get(
                "/recipes/get-ids?min_calories=0&max_calories=327&max_cook_time=20&max_instructions=6&max_cost_per_serving=20&max_ingredients=25&name=pasta"
            )
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, recipe_ids_by_filter_data_0)

    # @app.route("/restaurants/<int:restaurant_id>")
    def test_restaurant_id(self):
        with app.test_client() as client:
            response = client.get("/restaurants/1")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, restaurant_data_id_1)

    # @app.route("/city/<int:city_id>")
    def test_city_id(self):
        with app.test_client() as client:
            response = client.get("/city/1")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, city_data_id_1)

    # @app.route("/api/models/by-cuisine")
    def test_get_models_by_cuisine(self):
        with app.test_client() as client:
            response = client.get(
                "api/models/by-cuisine?cuisines=mexican,korean&number_related_models=1"
            )
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, models_by_cuisine_data_0)

    # @app.route("/api/models/ids-by-name")
    def test_get_model_ids_by_name(self):
        with app.test_client() as client:
            response = client.get("api/models/ids-by-name?name=bread")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, model_id_by_name_data_0)


if __name__ == "__main__":
    unittest.main()
