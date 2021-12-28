"use strict"

class RestaurantImages{
    constructor(images_id, r_id, images_url){
        this.images_id = images_id;
        this.r_id = r_id;
        this.images_url = images_url;
    }
    //methods
    getId(){
        return this.images_id;
    
    }
    getresId(){
        return this.r_id;
    }
    getImagesURL(){
        return this.images_url;
    }
}
module.exports = RestaurantImages;