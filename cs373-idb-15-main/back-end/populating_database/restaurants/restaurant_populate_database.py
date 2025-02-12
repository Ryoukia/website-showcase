import psycopg2
from restaurant_class import Restaurant
from restaurant_requester import get_processed_restaurants
from typing import List


def insert_into_database(restaurants: List[Restaurant]):
    for restaurant in restaurants:
        conn = psycopg2.connect(
            host="worldeats.cmnxckdadt3c.us-east-2.rds.amazonaws.com",
            database="worldeats_initial_name",
            user="worldeats_user",
            password="worldeats_password",
        )
        curr = conn.cursor()
        curr.execute(
            """
            INSERT INTO restaurants (name, rating, price, food_types, address, phone_num, review_count, longitude, latitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                restaurant.name,
                restaurant.rating,
                restaurant.price,
                restaurant.food_types,
                restaurant.address,
                restaurant.phone_num,
                restaurant.review_count,
                restaurant.longitude,
                restaurant.latitude,
            ),
        )

        restaurant_db_id = curr.fetchone()[0]
        # print(restaurant_db_id)
        # pass

        # print(restaurant.open_hours['0'].get('name'))
        for key in restaurant.open_hours:
            # print(key)
            # print(restaurant.open_hours[key])
            name = restaurant.open_hours[key]["name"]
            start = (
                restaurant.open_hours[key].get("start")
                if restaurant.open_hours[key].get("start") != None
                else ""
            )
            end = (
                restaurant.open_hours.get(key).get("end")
                if restaurant.open_hours[key].get("end") != None
                else ""
            )
            start1 = (
                restaurant.open_hours[key].get("start1")
                if restaurant.open_hours[key].get("start1") != None
                else ""
            )
            end1 = (
                restaurant.open_hours[key].get("end1")
                if restaurant.open_hours[key].get("end1") != None
                else ""
            )
            # print(name)
            # print(start)
            # print(end)
            # print(start1)
            # print(end1)
            # print(key)
            # 9
            curr.execute(
                """
                INSERT INTO restaurant_hours (restaurant_id, day, start_time, end_time, start_time1, end_time1)
                VALUES (%s, %s, %s, %s, %s, %s);
            """,
                (restaurant_db_id, name, start, end, start1, end1),
            )

        for type in restaurant.avail_for:
            curr.execute(
                """
                INSERT INTO restaurant_avail_for (restaurant_id, type)
                VALUES (%s, %s);
            """,
                (restaurant_db_id, type),
            )

        for review in restaurant.reviews:
            curr.execute(
                """
                INSERT INTO restaurant_reviews (restaurant_id, name, rating, review)
                VALUES (%s, %s, %s, %s);
            
            """,
                (restaurant_db_id, review["name"], review["rating"], review["text"]),
            )

        for image in restaurant.images:
            curr.execute(
                """
                INSERT INTO restaurant_images (restaurant_id, image)
                VALUES (%s, %s);
            """,
                (restaurant_db_id, image),
            )

        conn.commit()
        curr.close()
        conn.close()


processed_restaurants = get_processed_restaurants()
# print(processed_restaurants)
insert_into_database(processed_restaurants)
