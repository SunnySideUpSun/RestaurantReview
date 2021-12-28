"use strict"

class Restaurant{
    constructor(id, restaurantName, location, description, thumb, map, openinghours, phonenumber) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.location = location;
        this.description = description;
        this.thumb = thumb;
        this.map = map;
        this.openinghours = openinghours;
        this.phonenumber = phonenumber;
    }
    //methods here
    getId(){
        return this.id;
    }
    getrestaurantName(){
        return this.restaurantName;
    }
    getlocation(){
        return this.location;
    }
    getdescription(){
        return this.description;
    }
    getthumb(){
        return this.thumb;
    }
    getmap(){
        return this.map;
    }
    getopeninghours(){
        return this.openinghours;
    }
    getphoneNumber(){
        return this.phonenumber;
    }
}

module.exports = Restaurant;