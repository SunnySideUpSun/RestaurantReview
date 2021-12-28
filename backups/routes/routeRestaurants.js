"use strict"

const restaurantdb = require('../models/RestaurantsDB');

var restaurantDBObject = new restaurantdb();

function routeRestaurants(app){
    app.route('/restaurants')
        .get(restaurantDBObject.getAllRestaurants);
    app.route('/restaurants/:id')
        .get(restaurantDBObject.getSpecificRestaurant);
    app.route('/restaurants/:id/tags')
        .post(restaurantDBObject.addRestaurantTags);
    app.route('/restaurants/filterby/tags/:tags')
        .get(restaurantDBObject.filterByTags);
    app.route('/restaurants/search/:query')
        .get(restaurantDBObject.searchRestaurantByName);
    app.route('/restaurants/filterby/ratings/:rating')
        .get(restaurantDBObject.getRestaurantsByRatings);
    app.route('/restaurants/images/:r_id')
        .get(restaurantDBObject.getRestaurantImages);
    app.route('/restaurants/:id/reviews')
        .get(restaurantDBObject.getRestaurantsReviews);
    app.route('/restaurants/:id/data')
        .get(restaurantDBObject.getFetchData);
}
module.exports = {routeRestaurants};