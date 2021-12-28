"use strict"

var db = require('../db-connection');

const favourites = require('./Favourites');

class FavouritesDB{
    // **HERE IS THE 'C' OF CRUD, CREATE**
    addFavourites(request, respond){
        var now = new Date();
        var favouriteObject = new favourites(null, request.body.r_id, request.params.user_id, now.toDateString());
        var sql = "insert into favourites (r_id , user_id, date) values (?,?,?)"
        var values = [favouriteObject.getRestaurantId(), favouriteObject.getUserId(), favouriteObject.getDate()];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    // **HERE IS THE 'R' OF CRUD, RETRIEVE**
    getAllFavourites(request, respond){
        var sql = "select * from favourites"

        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getSpecificFavourites(request, respond){
        var user_id = request.params.user_id;

        var sql = "select * from favourites where user_id = ?"

        db.query(sql, user_id, function(error, result){
            if(error){
                throw error;

            }
            else{
                respond.json(result);
            }
        });
    }
    getFavouritesID(req, res){
        var user_id = req.body.user_id;
        var res_id = req.body.res_id;

        var sql = "select * from favourites where user_id = ? and r_id = ?"

        db.query(sql, [user_id + res_id], (error,result) =>{
            if(error){
                throw error;
            }
            else{
                res.json(result);
            }
        });
    }
    //TO-DO 
    // **HERE IS THE 'D' OF CRUD, DELETE**
    deleteFavourites(request,respond){
        var favouritesid = request.params.f_id;

        var sql = "delete from favourites where fav_id= ?"

        db.query(sql, favouritesid, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}
module.exports = FavouritesDB;