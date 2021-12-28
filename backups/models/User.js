"use strict"

class User{
    constructor(id, firstName, lastName, username, birthDate, password, gender, email, mobileNumber, userPic, address, user_bio){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.birthDate = birthDate;
        this.password = password;
        this.gender = gender;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.userPic = userPic;
        this.user_bio = user_bio;
        this.address = address;
    }
    //methods
    getId(){
        return this.id;
    }
    getfirstName(){
        return this.firstName;
    }
    getlastName(){
        return this.lastName;
    }
    getusername(){
        return this.username;
    }
    getbirthDate(){
        return this.birthDate;
    }
    getpassword(){
        return this.password;
    }
    getgender(){
        return this.gender;
    }
    getemail(){
        return this.email;
    }
    getmobileNumber(){
        return this.mobileNumber;
    }
    getuserPic(){
        return this.userPic;
    }
    getuser_bio(){
        return this.user_bio;
    }
    getaddress(){
        return this.address;
    }
    toObject() {
        const { id, firstName, lastName, username, birthDate, password, gender, email, mobileNumber, userPic, address, user_bio } = this;
        return { id, firstName, lastName, username, birthDate, password, gender, email, mobileNumber, userPic, address, user_bio }
    }
}
module.exports = User;
