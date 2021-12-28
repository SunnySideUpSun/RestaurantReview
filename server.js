"use strict";

const express = require("express");
const routeRestaurant = require('./routes/routeRestaurants');
const routeReview = require("./routes/routeReviews");
const routeUser = require("./routes/routeUsers");
const routeReviewImage = require("./routes/routeReviewImages");
const routeRestaurantImages =require("./routes/routeResImages");
const routeFavourites = require("./routes/routeFavourites");
const routeTags = require("./routes/routeTags");
const bodyParser = require("body-parser");
const session = require("express-session");
const fetch = require('node-fetch');
var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: false
}));

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.set('view engine', 'ejs');

routeRestaurant.routeRestaurants(app);
routeReview.routeReviews(app);
routeUser.routeUsers(app);
routeReviewImage.routeReviewImages(app);
routeRestaurantImages.routeResImages(app)
routeFavourites.routeFavourites(app);
routeTags.routeTags(app);
function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
