"use strict"

const favouriteDB = require('../models/FavouritesDB');

var favouritesDBObject = new favouriteDB;

function routeFavourites(app){
    app.route('/favourites')
        .get(favouritesDBObject.getAllFavourites);
    app.route('/favourites/:user_id')
        .get(favouritesDBObject.getSpecificFavourites)
        .post(favouritesDBObject.addFavourites);
    app.route('/favourites/:f_id')
        .delete(favouritesDBObject.deleteFavourites);
    // app.route('/favourites/deleteFavourites')
    //     .get(favouritesDBObject.getFavouritesID);
}
module.exports = {routeFavourites};