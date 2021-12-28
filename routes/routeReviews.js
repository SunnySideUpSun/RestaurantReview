"use strict"

const reviewdb = require("../models/ReviewsDB");

var reviewsDBObject = new reviewdb;

function routeReviews(app){
    app.route("/reviews")
        .post(reviewsDBObject.addReviews)
        .get(reviewsDBObject.getAllReviews);
    app.route("/reviews/:id")
        .delete(reviewsDBObject.deleteReviews)
        .get(reviewsDBObject.getSpecificReview)
        .put(reviewsDBObject.updateReview);
    app.route("/reviews/:userid/:resid")
        .get(reviewsDBObject.getReviewWithUserIDandResID);
}
module.exports = {routeReviews};