"use strict"

const reviewimgdb = require('../models/Review_imagesDB');

var reviewImageObject = new reviewimgdb();

function routeReviewImages(app){
    app.route('/reviewImages')
        .get(reviewImageObject.getAllReviewImages)
        .post(reviewImageObject.addReviewImage);
    app.route('/reviewImages/:id')
        .get(reviewImageObject.getSpecificReviewImage)
        .put(reviewImageObject.updateReviewImage);
}
module.exports = {routeReviewImages};