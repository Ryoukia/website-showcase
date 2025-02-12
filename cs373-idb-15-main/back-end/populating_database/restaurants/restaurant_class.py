import json
import re


class Restaurant:
    def __init__(self):
        self.name = ""
        self.rating = ""
        self.price = ""
        self.food_types = ""
        self.avail_for = []
        self.address = ""
        self.phone_num = ""
        self.review_count = ""
        self.images = []
        self.open_hours = {}
        self.reviews = []
        self.longitude = 0.0
        self.latitude = 0.0
