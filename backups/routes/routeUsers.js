"use strict"

const userdb = require("../models/UsersDB");
const favouritesDB1 =require("../models/FavouritesDB");


var userDBObject = new userdb;
var favouritesDB1Object = new favouritesDB1;


function routeUsers(app){
    app.route("/users")
        .get(userDBObject.getAllUsers)
        .post(userDBObject.addUser);
    app.route("/login")
        .post(userDBObject.getLoginCredentials)
        .get(userDBObject.checkUserSession);
    app.route("/users/:user_id/favourites")
        .post(favouritesDB1Object.addFavourites)
        .get(favouritesDB1Object.getSpecificFavourites);
    app.route("/users/:userid")
        .delete(userDBObject.deleteUser)
        .put(userDBObject.updateUserCredentials)
        .get(userDBObject.getSpecificUser);
    app.route("/users/:userid/reviews")
        .get(userDBObject.getSpecificUserReviews);
    app.route("/logout")
        .get(userDBObject.destroyUserSession);
}
module.exports = {routeUsers}