"use strict"

const e = require('express');
var db = require('../db-connection');
const Review = require('./Review');
const Tags = require('./Tags');

class RestaurantDB{
    // **HERE IS THE 'R' OF CRUD, RETRIEVE**
    getAllRestaurants(request, respond){
        var sql = "select restaurant.*, tags.tags from restaurant left join tags on restaurant._id = tags.res_id group by restaurant._id";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    //Retrieve
    getSpecificRestaurant(request, respond){
        respond.sendFile("/restaurant-specific.html",{root: "../website/public"});

    }
    getFetchData(request,respond){
        var restaurantId = request.params.id;
        var sql = "select restaurant.*, reviews.*, users.username,users.userPic, tags.tags from restaurant left join reviews on restaurant._id = reviews.restaurantId left join users on reviews.userid = users.user_id left join tags on restaurant._id = tags.res_id where _id = ? limit 2"

        db.query(sql, restaurantId, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.send(result);
            }
        });
    }

    //Retrieve
    filterByTags(request, respond){
        var tags = request.params.tags;

        var sql ="select restaurant.restaurantName, restaurant.thumb, restaurant.description, tags.* from restaurant_review.tags tags inner join restaurant_review.restaurant on tags.res_id = restaurant._id where tags = ?"

        db.query(sql, tags, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });


    }
    //Retrieve
    searchRestaurantByName(request, respond){
        var search = '%' + request.params.query + '%';
        var sql = "select restaurant.restaurantName, restaurant.thumb, restaurant.description from restaurant where restaurantName like ?";
        db.query(sql, search, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    //Retrieve
    getRestaurantsByRatings(request, respond){
        var ratingsDesired = request.params.rating;
        var sql = "select restaurant.restaurantName, restaurant.thumb, restaurant.description, avg(reviews.ratings) from restaurant inner join reviews on restaurant._id = reviews.restaurantId group by restaurantId having avg(ratings) >= ?";
        db.query(sql,ratingsDesired, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        } );
    }
    //Retrieve
    getRestaurantsReviews(request,respond){
        var restaurantid = request.params.id;

        var sql = "select reviews.*, users.username from reviews inner join users on reviews.userid = users.user_id where reviews.restaurantId = ?"

        db.query(sql, restaurantid, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    //Get image of restaurant
    getRestaurantImages(request, respond){
        var restaurant_id = request.params.r_id;

        var sql = "select * from r_images where r_id = ?";

        db.query(sql, restaurant_id, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    // **HERE IS THE 'C' OF CRUD, CREATE**
    addRestaurantTags(request, respond){
        var restaurantId = request.params.id;
        var tagObject = new Tags(null, restaurantId, request.body.tags);
        var sql = "insert into tags (res_id, tags) values (?,?)";
        var values = [restaurantId, tagObject.gettags()]
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    


    //TO-DO:

}

module.exports = RestaurantDB;