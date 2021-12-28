"use strict"

const connection = require("../db-connection");

class Tags{
    constructor(tag_id, res_id, tags){
        this.tag_id = tag_id;
        this.res_id = res_id;
        this.tags = tags;
    }
//methods
    getId(){
        return this.tag_id;
    }
    getresId(){
        return this.res_id;
    }
    gettags(){
        return this.tags;
    }
}
module.exports = Tags;