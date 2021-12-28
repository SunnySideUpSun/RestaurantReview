"use strict"

class ReviewImages{
    constructor(_id, review_id, images){
        this._id = _id;
        this.review_id = review_id;
        this.images = images;
    }
//methods
    getId(){
        return this._id;
    }
    getreview_id(){
        return this.review_id;
    }
    getimages(){
        return this.images;
    }
}
module.exports = ReviewImages;