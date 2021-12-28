"use strict"

const restaurant_imagesdb = require('../models/RestaurantImagesDB');

var ResImageDBObject = new restaurant_imagesdb();

function routeResImages(app){
    app.route("/restaurantImages")
        .get(ResImageDBObject.getAllRestaurantImages);
    app.route("/restaurantImages/:id")
        .get(ResImageDBObject.getSpecificResImages);
}
module.exports = {routeResImages};