"use strict"

var db = require("../db-connection");

const User = require("../models/User")

class UserDB{
    // **HERE IS THE 'C' OF CRUD, CREATE**
    addUser(request,respond){
        var msg = "";
        var username = request.body.username
        var sql = "insert into restaurant_review.users (firstname, lastname, username, birthdate, password, gender, email, mobileNumber, userPic, address, user_bio)  values(?,?,?,?,?,?,?,?,?,?,?)"
        var userObject = new User(null, request.body.firstname, request.body.lastname, request.body.username, request.body.birthDate, request.body.password, request.body.gender, request.body.email, request.body.mobileNumber, request.body.userPic, request.body.address, request.body.user_bio);
        var values = [userObject.getfirstName(), userObject.getlastName(), userObject.getusername(), userObject.getbirthDate(), userObject.getpassword(), userObject.getgender(), userObject.getemail(), userObject.getmobileNumber(), userObject.getuserPic(), userObject.getaddress(), userObject.getuser_bio()];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                msg = "success";
                request.session.userid = username;
                respond.json(prepareMessage(msg));
            }
        });
    }
    // **HERE IS THE 'R' OF CRUD, RETRIEVE**
    getAllUsers(request, respond){
        var sql = "select * from restaurant_review.users";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
                
            }
        });
    }

    getLoginCredentials(request, respond){
        var username = request.body.username;
        var password = request.body.password;
        var msg= "";

        var sql = "select * from restaurant_review.users where username = ?";

            db.query(sql, [username], function(error,result){
                if(error){
                    throw error;
                }
                else{
                    if(result.length>0){
                        if(password == result[0].password){
                            msg = "SUCCESS!";
                            request.session.userid = (result[0]);
                            // console.log(request.session.userid);
                        }
                        else{
                            msg = "FAIL!";
                            console.log(msg);
                        }
                    }
                    else{
                        msg = "USER NOT FOUND!";
                        console.log(msg);
                    }
                    respond.json(prepareMessage(msg));
                }
            });
    }
    //check user session see if this guy is logged in
    checkUserSession(req, res){
        if(req.session.userid != null){
            var userOBJ = new User(req.session.userid.user_id,req.session.userid.firstname, req.session.userid.lastname, req.session.userid.username, req.session.userid.birthdate, req.session.userid.password, req.session.userid.gender, req.session.userid.email, req.session.userid.mobilenumber, req.session.userid.userPic, req.session.userid.address, req.session.userid.user_bio)
            res.send(userOBJ.toObject());
        }
        else{
            res.send(false);
        }
    }
    destroyUserSession(req, res){
        if(req.session.userid != null){
            req.session.destroy();
            res.send("You Have been logged out");

        }
        else{
            res.status(401);
            res.send("You are not logged in")
        }
    }
    //get User Reviews
    getSpecificUserReviews(request, respond){
        var userid = request.params.userid;

        var sql = "select users.user_id, users.username, reviews.commentTitle, restaurant.restaurantName from users left join reviews on users.user_id = reviews.userid right join restaurant on reviews.restaurantId = restaurant._id where user_id = ?"

        db.query(sql, userid, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    getSpecificUser(request,respond){
        var userid = request.params.userid;
        var sql = "select *  from users where user_id = ?"
        db.query(sql, userid, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        })
    }
    //TO-DO
    // **HERE IS THE 'U' OF CRUD, UPDATE**
    updateUserCredentials(request,respond){

        var userObject = new User(request.params.userid, request.body.firstName, request.body.lastName, request.body.username, request.body.birthDate, request.body.password, request.body.gender, request.body.email, request.body.mobileNumber, request.body.userPic, request.body.address, request.body.user_bio);

        var sql = "update users set firstname = ?, lastname = ?, username = ?, birthdate = ?, password = ?, gender = ?, email = ?, mobileNumber = ?, userPic = ?, address = ?, user_bio = ? where user_id =?"

        var values = [userObject.getfirstName(), userObject.getlastName(), userObject.getusername(), userObject.getbirthDate(), userObject.getpassword(), userObject.getgender(), userObject.getemail(), userObject.getmobileNumber(), userObject.getuserPic(), userObject.getaddress(), userObject.getuser_bio(), userObject.getId()];

        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    // **HERE IS THE 'D' OF CRUD, DELETE**
    deleteUser(request, respond){
        var userid = request.params.userid;

        var sql = "delete from users where user_id = ?"

        db.query(sql, [userid], function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}
function prepareMessage(msg){
    var obj = {"message": msg};
    return obj;
}
module.exports = UserDB;