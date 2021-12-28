"use strict"

class Favourites{
    constructor(fav_id, r_id, user_id, date){
        this.fav_id =fav_id;
        this.r_id = r_id;
        this.user_id = user_id;
        this.date = date;
    }
    //methods
    getId(){
        return this.fav_id;
    }
    getRestaurantId(){
        return this.r_id;
    }
    getUserId(){
        return this.user_id;
    }
    getDate(){
        return this.date;
    }
    setRestaurantId(restaurantId){
        this.r_id = restaurantId;
    }
    setUserId(user_id){
        this.user_id = user_id;
    }
    setDate(date){
        this.date = date;
    }
}
module.exports = Favourites;