import requests
import json

output = open("cityCoords.csv", "w")
cutoff_size = 400000


def loop_cities():
    cities_url = "https://countriesnow.space/api/v0.1/countries/population/cities"
    name_response = requests.request("GET", cities_url)
    names = name_response.json()
    # output.write("test")
    for city in names["data"]:
        for population in city["populationCounts"]:
            try:
                if float(population["value"]) > cutoff_size:
                    name = city["city"]
                    country = city["country"]
                    calc_city(name, country, population["value"])
            except:
                pass
            break


def calc_city(cityName, countryName, population):
    headers = {
        "Authorization": "Bearer cKV71sObweyye1aK-gurdS7ECQokXHzfLJgtPsWxkTl2CPrD2MOmwL1aMPh-gQ9O7efTvMDqqEQmI7o-0BmBLzc0YSwf7Ka5qGwbFViII0eazo0ulTk-KZpUpz4_ZHYx"
    }

    querystring = {"location": cityName, "sort_by": "best_match", "limit": "1"}
    # loop through a bunch of cities
    # create an array of cities

    url = "https://api.yelp.com/v3/businesses/search"

    response = requests.request("GET", url, headers=headers, params=querystring)
    city = response.json()

    # print(city)
    score = 0.0
    price = 0
    cusines = {}
    numprices = 0
    numrestaurants = 0
    latitude = 0
    longitude = 0

    try:
        for restaurant in city["businesses"]:
            output.write(str(restaurant["coordinates"]["latitude"]) + ",")
            output.write(str(restaurant["coordinates"]["longitude"]) + ",")
            output.write(cityName + ",")
            output.write(str(population))
            output.write("\n")
    except:
        pass


def main():
    # calc_city("Austin", "United States", 3000000)
    loop_cities()
    # print(get_city_image("Houston"))
    output.close()


if __name__ == "__main__":
    main()
