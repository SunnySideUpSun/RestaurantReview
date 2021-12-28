"use strict"

var db =require('../db-connection');
const RestaurantImages = require('./RestaurantImages');

class RestaurantImagesDB{
    getAllRestaurantImages(request, respond){
        var sql= "select * from r_images";

        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    getSpecificResImages(request, respond){
        var restaurantid = request.params.id;
        var sql = "select * from r_images where r_id =?"
        db.query(sql, restaurantid, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}
module.exports = RestaurantImagesDB;