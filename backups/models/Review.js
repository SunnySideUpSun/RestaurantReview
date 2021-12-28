"use strict"

const connection = require("../db-connection");

class Review{
    constructor(id, restaurantId, userid, ratings, comments, commentsTitle, datePosted){
        this.id = id;
        this.restaurantId = restaurantId;
        this.userid = userid;
        this.ratings = ratings;
        this.comments = comments;
        this.commentsTitle = commentsTitle;
        this.datePosted = datePosted;
    }
    //methods here
    getId(){
        return this.id;
    }
    getrestaurantId(){
        return this.restaurantId;
    }
    getuserId(){
        return this.userid;
    }
    getratings(){
        return this.ratings;
    }
    getComments(){
        return this.comments;
    }
    getCommentsTitle(){
        return this.commentsTitle;
    }
    getdatePosted(){
        return this.datePosted;
    }
    setrestaurantId(restaurantId){
        this.restaurantId = restaurantId;
    }
    setUserId(userId){
        this.userid = userId;
    }
    setRatings(ratings){
        this.ratings = ratings;
    }
    setComments(comments){
        this.comments = comments;
    }
    setCommentsTitle(commentTitle){
        this.commentsTitle = commentTitle
    }
    setDatePosted(datePosted){
        this.datePosted = datePosted;
    }
}
module.exports = Review;