import requests
import json
from restaurant_class import Restaurant


restaurant_url = "https://api.yelp.com/v3/businesses/search"
yelp_header = {
    "Authorization": "Bearer PKv46r79v-ZqUF_GLWAAEKbPJc4xts6b4xLvymgUi2icLeKu61hoLzDI9L4AToXcmBBB5IbmWqoHzk8ab6olA02CWinof1XebOAXCFilu38iAYxn2dPgfnPNBCpAZHYx"
}


objects = []

# count = 0
# city ids of other cities in other countries to get variety
# city_ids = [33, 34, 35, 70, 71, 79, 85, 86, 91, 92, 101, 102, 103, 104, 105, 106, 108, 110, 111, 113, 119]
# city_ids1 = [128, 130, 133, 134, 145, 146, 187, 189, 209, 230, 233, 234, 245, 244, 260, 270, 271, 279, 287, 298, 299]
# for city_id in city_ids1:

# US: 308-353
for city_id in range(309, 353):
    print(city_id)
    print("above method")

    # loaded DB for cities 1 - 20
    # for city_id in range(1, 20):
    # need to have dev container and docker open/running in the
    #  back end for this to work
    city_endpoint = f"http://127.0.0.1:5000/city/{city_id}"
    city_data = []
    response = requests.get(city_endpoint)
    jsonData = response.json()
    if jsonData:
        city_data = jsonData
    else:
        print("Error: Unable to retrieve city data")

    city = city_data["name"]
    params = {"term": "restaurants", "sort_by": "best_match", "location": f"{city}"}

    restaurant_response = requests.get(
        restaurant_url, headers=yelp_header, params=params
    )
    restaurant_response_json = restaurant_response.json()

    # with open(f'RestaurantData{count}.json', "w") as f:
    #     json.dump(restaurant_response_json, f)

    obj = {}
    obj["city"] = city
    restaurants = []

    # if yelp returns no restaurants for the city it will skip the city
    try:
        restaurant_response_json["businesses"]
    except KeyError as e:
        continue

    for restaurant in restaurant_response_json["businesses"]:
        rest = {}
        # rest['city'] = city
        rest_id = restaurant.get("id")
        rest["id"] = rest_id
        rest["name"] = restaurant.get("name")
        rest["rating"] = restaurant.get("rating")
        rest["price"] = restaurant.get("price")
        coordinates = restaurant.get("coordinates")
        rest["latitude"] = coordinates.get("latitude")
        rest["longitude"] = coordinates.get("longitude")
        rest_food_types = ""
        for i, type in enumerate(restaurant.get("categories")):
            if i != 0:
                rest_food_types += ", "
            rest_food_types += type.get("title")

        rest["food_types"] = rest_food_types
        rest["avail_for"] = restaurant.get(
            "transactions"
        )  # a list of types (delivery, pickup, etc)
        rest["address"] = ", ".join(restaurant.get("location").get("display_address"))
        rest["phone_num"] = restaurant.get("display_phone")

        # can also get longitude and latitude from this to potentially use for a google map

        # make second api call to get the hours of operation and images
        second_rest_url = f"https://api.yelp.com/v3/businesses/{rest_id}"

        second_resp_json = requests.get(second_rest_url, headers=yelp_header).json()

        rest_review_count = second_resp_json.get("review_count")
        rest["review_count"] = rest_review_count
        rest["images"] = (
            second_resp_json.get("photos")
            if second_resp_json.get("photos") != None
            else []
        )

        hours = ""
        # a map of the restaurants days and the respective start and end times
        rest_days = {
            0: {"name": "Monday"},
            1: {"name": "Tuesday"},
            2: {"name": "Wednesday"},
            3: {"name": "Thursday"},
            4: {"name": "Friday"},
            5: {"name": "Saturday"},
            6: {"name": "Sunday"},
        }
        try:
            rest_open_hours = second_resp_json["hours"][0][
                "open"
            ]  # list of objects of days w opeon tiems
        except KeyError:
            hours = "No Hours of Operation Given."
        else:
            for day in rest_open_hours:
                start1 = day["start"][0:2]
                start2 = day["start"][2:]
                start = f"{start1}:{start2}"
                start = (
                    start if int(start1) <= 12 else str(int(start1) - 12) + ":" + start2
                )
                start = start + "AM" if int(start1) < 12 else start + "PM"

                end1 = day["end"][0:2]
                end2 = day["end"][2:]
                end = f"{end1}:{end2}"
                end = end if int(end1) <= 12 else str(int(end1) - 12) + ":" + end2
                end = end + "AM" if int(end1) < 12 else end + "PM"

                # print(start)
                # print(end)

                day_name = rest_days[day["day"]]

                day_num = day["day"]

                # the restaurant has a break in the day where theyre closed, so add these as start1 and end1
                if rest_days[day_num].get("start") != None:
                    rest_days[day_num]["start1"] = start
                    rest_days[day_num]["end1"] = start
                else:
                    rest_days[day_num]["start"] = start
                    rest_days[day_num]["end"] = end
            # print(rest_days)

        # hours of operation were given
        # if hours == '':
        rest["open_hours"] = rest_days
        # hours of operation were not given
        # else:
        # rest['open_hours'] = {0: {'name': hours}}

        if rest_review_count != None and rest_review_count > 0:
            rest_reviews_url = f"https://api.yelp.com/v3/businesses/{rest_id}/reviews"

            params = {"limit": 20, "sort_by": "yelp_sort"}

            reviews_response_json = requests.get(
                rest_reviews_url, headers=yelp_header, params=params
            ).json()

            # with open(f'RestaurantReviews{count}.json', "w") as f:
            #     json.dump(reviews_response_json, f)

            rest_reviews = []
            for review in reviews_response_json["reviews"]:
                text = review["text"]
                name = review["user"]["name"]
                rating = review["rating"]

                review = {"name": f"{name}", "rating": f"{rating}", "text": f"{text}"}
                # print(review)
                rest_reviews.append(review)

            rest["reviews"] = rest_reviews
        else:
            rest["reviews"] = []
        restaurants.append(rest)

    # append restaurants for this city
    obj["restaurants"] = restaurants

    objects.append(obj)

    # count +=1


# Do this here instead so that I don't have to load into a json and can just load it straight into the backend
# could modify to add this code into the api call but I think this is fine for now
def get_processed_restaurants():
    processed_restaurants = []
    # with open("data.json", "r") as f:
    #     data = json.load(f)
    # for now I'm only doing 5 cities, we can upscale it though
    # each object has a city string and an array of restaurnt objects
    # for obj in data:
    for obj in objects:
        city = obj["city"]
        restaurants = obj["restaurants"]
        # every restaurant per city, I think the api only gives 20 per city
        for rest_data in restaurants:
            restaurant = Restaurant()
            restaurant.name = rest_data["name"]
            restaurant.rating = rest_data["rating"]
            restaurant.price = rest_data["price"]
            restaurant.food_types = rest_data["food_types"]
            restaurant.avail_for = rest_data["avail_for"]
            restaurant.address = rest_data["address"]
            restaurant.phone_num = rest_data["phone_num"]
            restaurant.review_count = rest_data["review_count"]
            restaurant.images = rest_data["images"]
            restaurant.open_hours = rest_data["open_hours"]
            restaurant.reviews = rest_data["reviews"]
            restaurant.longitude = rest_data["longitude"]
            restaurant.latitude = rest_data["latitude"]
            processed_restaurants.append(restaurant)

    return processed_restaurants
