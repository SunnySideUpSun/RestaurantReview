function login(){
    var response= "";
    var credentials = new Object();
    credentials.username = document.getElementById("username").value;
    credentials.password = document.getElementById("password").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
        response = JSON.parse(request.responseText);

        if(response.message == "SUCCESS!")
            window.location = "index.html";
        else{
            document.getElementById("message").textContent = response.message;
        }

    };
    request.send(JSON.stringify(credentials));

}
function register(){
    var response = "";
    var credentials =  new Object();
    
    credentials.firstname = document.getElementById("fName").value;
    credentials.lastname = document.getElementById("lName").value;
    credentials.username = document.getElementById("uName").value;
    credentials.birthDate = document.getElementById("birthDate").value;
    credentials.password = document.getElementById("pass").value;
    credentials.email = document.getElementById("email").value;
    credentials.address = document.getElementById("address").value;
    credentials.mobileNumber = document.getElementById("mNumber").value;
    credentials.gender = document.getElementById("gender").value;
    var check = JSON.parse(JSON.stringify(credentials));
    if (nullCheck(check) == false){
        console.log("There are null fields");
    }
    else{
        var request = new XMLHttpRequest();
        request.open("POST", "/users", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function(){
            response = JSON.parse(request.responseText);

            if(response.message == "success")
                window.location = "index.html";
        };
        request.send(JSON.stringify(credentials));
    }

}
function nullCheck(arraylist){
    for(i in arraylist){
        if (arraylist[i] == null || arraylist[i] == ""){
            document.getElementById("message").innerHTML = "Fields cannot be NULL";
            return false;
        }
    }
}
function sendRequest(method, url){
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.onload = function() {
            if(req.responseText != null){
                resolve(req.responseText);
            }
            else{
                resolve(false);
            }
        }
        req.send();
    });
    
}
const isLoggedIn = async() =>{
    const userid = await sendRequest("GET", "/login");
    if(userid != "false"){
        return true;
    }
    else{
        return false;
    }
}
const navbar = async() =>{
    const userLoggedIn = await isLoggedIn();
    var userID = (await returnUserSessionData()).id;
    var userData = JSON.parse(await sendRequest("GET", "/users/"+userID));
    if (userLoggedIn != false){
        $("#signup").hide();
        $("#login").hide();
        const cell = '<li class="nav-item active">'+'<a class="nav-link" href="/profile.html">profile</a>'+'</li>'+
                    '<li class="nav-item active">'+'<a class="nav-link" href="#" onclick = "logout()">logout</a>'+'</li>'+
                    '<li class="nav-item active">'+'<img class= "img-rounded profileIcon" src = "'+userData[0].userPic+'" id="profileIcon"></li>'
        document.getElementById("menuItems").insertAdjacentHTML("beforeend", cell);
    }
    else{
    }
};
const returnUserSessionData = async() => {
    const userdata = await sendRequest("GET", "/login");
    if(userdata != "false"){
        return JSON.parse(userdata);

    }
    else{
        return false;
    }
}
function sendPOSTRequest(method, url, req_body){

        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = function() {

        }
        req.send(req_body);
    };
async function logout(){
    const data = await sendRequest("GET", "/logout");
    if(data != null){
        if(window.location == "../index.html"){
            location.reload()
        }else{
        window.location = "../index.html"
        }
    }
}
const loadUserProfileData = async() =>{
    //get the user data
    navbar();
    
    const userSessionData = await returnUserSessionData();
    var user_id = userSessionData.id;
    const userProfileData = JSON.parse(await sendRequest("GET", "/users/"+user_id));

    console.log(userProfileData);
    //initialise DOM elements;
    var profilePicture = document.getElementById("UserProfilePicture");
    var profileEmail = document.getElementById("profileEmail");
    var profileFirstName = document.getElementById("profileFirstName");
    var profileLastName = document.getElementById("profileLastName");
    var profileusername = document.getElementById("profileusername");
    var profilePassword = document.getElementById("profilePassword");
    var profilebirthDate = document.getElementById("profilebirthDate");
    var profileAddress = document.getElementById("profileAddress");
    var profileNumber = document.getElementById("profileNumber");
    var profileGender = document.getElementById("profileGender");
    var profileBio = document.getElementById("profileBio");

    //set DOM elements value;
    profilePicture.setAttribute("src", userProfileData[0].userPic);
    profileEmail.setAttribute("placeholder", userProfileData[0].email);
    profileFirstName.setAttribute("placeholder", userProfileData[0].firstname);
    profileLastName.setAttribute("placeholder", userProfileData[0].lastname);
    profileusername.setAttribute("placeholder", userProfileData[0].username);
    profilePassword.value = userProfileData[0].password;
    profilebirthDate.setAttribute("placeholder", userProfileData[0].birthdate);
    profileAddress.setAttribute("placeholder", userProfileData[0].address);
    profileNumber.setAttribute("placeholder", userProfileData[0].mobilenumber);
    profileGender.value = userProfileData[0].gender;
    profileBio.setAttribute("placeholder", userProfileData[0].user_bio);
}
const updateUserInfo = async () =>{
    var user_data = []
    user_data = await returnUserSessionData();
    console.log(user_data);
    if(await checkuserProfileFieldNull(document.getElementById("profileFirstName").value) == true){
        user_data.firstName = document.getElementById("profileFirstName").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profileLastName").value) == true){
        user_data.lastName = document.getElementById("profileLastName").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profilebirthDate").value) == true){
        user_data.birthDate = document.getElementById("profilebirthDate").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profileAddress").value) == true){
        user_data.address = document.getElementById("profileAddress").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profileNumber").value) == true){
        user_data.mobileNumber = document.getElementById("profileNumber").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profileGender").value) == true){
        user_data.gender = document.getElementById("profileGender").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profileBio").value) == true){
        user_data.user_bio = document.getElementById("profileBio").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("UserProfilePicture").value) == true){
        user_data.userPic = document.getElementById("UserProfilePicture").src;
        console.log("hi")
    }
    console.log(user_data)
    sendUpdatedCredentials(user_data);
    location.reload();

}
const updateUserSecurity = async() =>{
    var user_data = await returnUserSessionData();
    if(await checkuserProfileFieldNull(document.getElementById("profileusername").value) == true){
        user_data.username = document.getElementById("profileusername").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profilePassword").value) == true){
        user_data.password = document.getElementById("profilePassword").value;
    }
    if(await checkuserProfileFieldNull(document.getElementById("profileEmail").value) == true){
        user_data.email = document.getElementById("profileEmail").value;
    }
    var response = confirm("Are you sure you want to change your security Information?")
    if(response == true){
    sendUpdatedCredentials(user_data)
    location.reload
    }
}
function sendUpdatedCredentials(user_data){
    var req = new XMLHttpRequest;
    req.open("PUT", "/users/"+user_data.id, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(user_data));
}
const checkuserProfileFieldNull = (field_value) =>{
    return new Promise((resolve, reject) => {
        if(field_value == ""){
            resolve(false);
        }
        else{
            resolve(true);
        }
    });
}
function encode(){

    var selectedFile = document.getElementById("uploadProfilePicture").files;
    var picture;
    console.log(selectedFile);
    if(selectedFile.length > 0){
        var imageFile = selectedFile[0];
        var fileReader = new FileReader;
        fileReader.onload = async (fileLoadedEvent)=>{
            picture = fileLoadedEvent.target.result;
            document.getElementById("UserProfilePicture").src = picture;
        }
        fileReader.readAsDataURL(imageFile);

    }
}
const encodedPicture = (element)=>{
    return new Promise((resolve,reject)=>{
        var picture;
        var selectedFile = element.files;
        if(selectedFile.length > 0){
            var imageFile = selectedFile[0]
            var fileReader = new FileReader;
            fileReader.onload = async (fileLoadedEvent) =>{
                picture = fileLoadedEvent.target.result;
                resolve(picture)
            }
        }
        fileReader.readAsDataURL(imageFile);

    })
}
