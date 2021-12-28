"use strict"

var db = require('../db-connection');
const r_images = require('./Review_images');

class review_images{
    //Retrieve 
    getAllReviewImages(request, respond){
        var sql = "SELECT * FROM restaurant_review.review_images";
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
    getSpecificReviewImage(request, respond){
        var reviewId = request.params.id;
        var sql = "select * from review_images where review_id = ?"
        db.query(sql, reviewId,function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    //Create
    addReviewImage(request, respond){
        var reviewImageObject = new r_images(null, request.body.review_id, request.body.imagesurl);

        var sql = "insert into review_images (review_id, image) values (?,?)";

        var values = [reviewImageObject.getreview_id(), reviewImageObject.getimages()];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    updateReviewImage(req, res){
        var reviewImageObject = new r_images(req.params.id, req.body.review_id, req.body.image);
        
        var sql = "update review_images set image = ? where review_id = ?"

        var values = [reviewImageObject.getimages(), reviewImageObject.getId()];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                res.json(result);
            }
        })
    }
}
module.exports = review_images;