"use strict"

var db = require("../db-connection");

const Tags = require("../models/Tags");

class TagsDB{
    getAllTags(request, respond){
        var sql = "select * from Tags";
    
    db.query(sql, function(error, result){
        if(error){
            throw error;
        }
        else{
            respond.json(result);
        }
    });

    }
}
module.exports = TagsDB;