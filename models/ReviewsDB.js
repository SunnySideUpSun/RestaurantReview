"use strict"

var db = require("../db-connection")

const Review = require("../models/Review")

class ReviewDB{
    // **HERE IS THE 'C' OF CRUD, CREATE**
    addReviews(request, respond){
        var now = new Date();
        var reviewObject = new Review(null, request.body.restaurantId, request.body.userid, request.body.ratings, request.body.comments,
            request.body.commentTitle, now.toDateString());

        var sql = "INSERT INTO restaurant_review.reviews (restaurantId, userid, ratings, comments, commentTitle, datePosted) VALUES(?,?,?,?,?,?)";
        var values = [reviewObject.getrestaurantId(), reviewObject.getuserId(), reviewObject.getratings(), reviewObject.getComments(), reviewObject.getCommentsTitle(), reviewObject.getdatePosted()];
        db.query(sql,values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    // **HERE IS THE 'R' OF CRUD, RETRIEVE**
    getAllReviews(request, respond){
        var sql = "SELECT * FROM restaurant_review.reviews";
        db.query(sql, function(error, result){
            if(error){
                throw erorr;
            }
            else{
                respond.json(result);
            }
        });
    }
    //Retrieve
    getSpecificReview(request, respond){
        var reviewId = request.params.id;

        var sql = "select reviews.*,users.username from restaurant_review.reviews inner join restaurant_review.users on reviews.userid = users.user_id where `review_id` = ?";
        db.query(sql, reviewId, function(error,result){
            if(error){
                throw error;
            }
            else{
                respond.json(result)
            }
        });
    }
    getReviewWithUserIDandResID(req, res){
        var userid = req.params.userid;
        var resid = req.params.resid;

        var sql = "select * from reviews where restaurantId = ? and userid = ?"
        var values = [resid, userid];
        db.query(sql, values, (error,result) =>{
            if(error){
                throw error;
            }
            else{
                res.json(result);
            }
        })
    }
    // **HERE IS THE 'U' OF CRUD, UPDATE**
    updateReview(request, respond){

        var now = new Date();

        var reviewObject = new Review(request.params.id, request.body.restaurantId, request.body.userid, request.body.ratings, request.body.comments,
            request.body.commentTitle, now.toDateString());

        var sql = "update restaurant_review.reviews set commentTitle= ?, comments = ?, ratings = ?, datePosted = ? where review_id = ?"

        var values = [reviewObject.getCommentsTitle(), reviewObject.getComments(), reviewObject.getratings(), reviewObject.getdatePosted(), reviewObject.getId()];

        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result)
            }
        });
    }

    // **HERE IS THE 'D' OF CRUD, DELETE**
    deleteReviews(request, respond){
        var reviewId = request.params.id;

        var sql = "DELETE FROM restaurant_review.reviews WHERE `review_id` = ?";
        db.query(sql, reviewId, function(error,result){
            if(error){
                throw error;
            }
            else{
                respond.json(result)
            }
        });
    }


}

module.exports = ReviewDB;