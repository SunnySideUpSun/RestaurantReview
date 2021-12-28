"use strict"

const tagsdb = require("../models/TagsDB");

var TagsDBObject = new tagsdb;

function routeTags(app){
    app.route('/tags')
        .get(TagsDBObject.getAllTags);
}
module.exports= {routeTags}