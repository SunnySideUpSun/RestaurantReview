function getRestaurantData(){
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);

    request.onload = function(){
        var restaurant_array1 = JSON.parse(request.responseText);
        displayRestaurants(restaurant_array1);
        navbar();
    };
    request.send();
}
function displayRestaurants(data){
    var table = document.getElementById("restaurantTable");
    table.innerHTML="";
    totalRestaurants = data.length;
    for (var count = 0; count < totalRestaurants; count ++){
        var thumbnail = data[count].thumb;
        var title = data[count].restaurantName;
                    var cell = `<div class = "col-md-3" style= "width: 250px; height: 100px;">
                        <div class= "start">
                            <div class = "row tableItem">
                                <a id = "restaurants" href = "${restaurant_url}/${data[count]._id}" data-target="#specificRestaurant" item="${count}" Onclick ="showSpecificRestaurant(${count})">
                                    <img id = "thumbnail" class = "img-fluid img-thumbnail" src ="${thumbnail}"/>
                                    <p id = "restaurantTitle">${title}</p>
                                </a>
                            </div>
                        </div>
                    </div>`;
        table.insertAdjacentHTML('beforeend', cell);
        restaurantCount++;
    }
    restaurantCount = 0;
}

async function displayIndividualRestaurants(data){
    var body = document.getElementById("restaurantData");
    var cell = '<div class = "restaurantMain">'+ 
        '<h2 id="restaurantName">'+data[0].restaurantName+'</h2>'+
        '<img src = "" value = "'+data[0]._id+'" Onclick="addToFavourites()" id="favourites"/>'+
        '<img src = "/'+ data[0].thumb+'" id="restaurantMainPicture" />'+
        '<section class = "restaurantDetails">'+
            '<div class= "tagsDetails">'+'<h3>Tags:</h3>'+'<br>'+data[0].tags+'</div>'+
            '<div class = "aboutDetails">'+
                '<p id = "addressDetails">'+"<h4>Location:</h4>"+data[0].location+'</p>'+
                '<p id = "openingHours">'+"<h4>Opening Hours:</h4>"+data[0].openinghours+'</p>'+
                '<p id = "contactNumber">'+'<h4>Contact:</h4>'+data[0].phonenumber+'</p>'+
                '<p id = "description">'+'<h4>Description:</h4>'+data[0].description+'</p>'+
            '</div>'+
            '<div class = "embedMap">'+data[0].map+'</div>'+
        '</section>'+
        '<section id = "reviewsSection">'+
            '<h3 id = "startofReviews">Reviews</h3>'+
            
        '</section>'+
        '</div>'
    body.insertAdjacentHTML('beforeend', cell);
    const userLoggedIn = await isLoggedIn();
    if(userLoggedIn == true){
        document.getElementById("reviewsSection").insertAdjacentHTML("beforeend", '<a style="float: right; margin-right: 40px; font-color: blue; text-decoration: underline; padding-bottom: 20px" data-toggle="modal" data-target="#addReviewModal" href="#" value = "'+data[0]._id+'"'+'onclick="displayAddReviewModalInfo(this)">'+'<img src = "/images/edit-line.png">'+"Add a review"+'</a>')
        document.getElementById("favourites").setAttribute("src" , "/images/heart.png");
        checkIfRestaurantsInFavourites();

    }

}
const displaySearchedResult = async () =>{
    var searchbar = document.getElementById("searchbar");
    var searchbarValue = searchbar.value;
    if(searchbarValue == "" || searchbarValue == " "){
        location.reload();
    }else{
        var res_data = JSON.parse( await sendRequest("GET", "/restaurants/search/" + searchbarValue)); 
        displayRestaurants(res_data);
    }

}
const checkIfRestaurantsInFavourites = async ()=>{
    var getuserID = (await returnUserSessionData()).id;
    if (getuserID != null){
        console.log("RAN")
        var userData = JSON.parse(await sendRequest("GET", "/users/" + getuserID));
        var usersFavourites = JSON.parse(await sendRequest("GET", "/users/" + userData[0].user_id+ "/favourites"));
        var res_id = document.getElementById("favourites").getAttribute("value");
        for(var count = 0; count < usersFavourites.length; count ++){
            if(res_id == usersFavourites[count].r_id){
                console.log("hi");
                document.getElementById("favourites").setAttribute("src", "/images/heart-filled.png");
                document.getElementById("favourites").setAttribute("onclick", "removeFavourites()");
            }
        }
    }
}
const addToFavourites = async() =>{
    var userid = (await returnUserSessionData()).id;
    var heart = document.getElementById("favourites");
    var data = new Object();
    data.r_id = heart.getAttribute("value");
    sendPOSTRequest("POST", "/users/" +userid+"/favourites", JSON.stringify(data));
    confirm("You Have added this restaurants to your favourites.")
    location.reload();
    
}
const removeFavourites = async () =>{
    var heart = document.getElementById("favourites");
    var userid = (await returnUserSessionData()).id;
    var usersFavourites = JSON.parse(await sendRequest("GET", "/users/" + userid+ "/favourites")); 
    var res_id = heart.getAttribute("value");
    for(var count = 0; count < usersFavourites.length; count ++){
        if(res_id == usersFavourites[count].r_id){
            var fav_id = usersFavourites[count].fav_id;
        }
    }
    sendRequest("DELETE", "/favourites/" + fav_id);
    confirm("You Have deleted this restaurants from your favourites.")
    location.reload();
}
function showSpecificRestaurant(){
    var request = new XMLHttpRequest();
    request.open('GET', document.URL + '/data', true);

    request.onload = function(){
        const data = JSON.parse(request.responseText);
        console.log(data);
        displayIndividualRestaurants(data);
        getuserID(data)
        navbar();
    };
    request.send();
}



