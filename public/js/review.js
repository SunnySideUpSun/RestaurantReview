function getuserID(restaurant_data){
    var req = new XMLHttpRequest;
    req.open("GET", "/login", true);
    req.onload = function(){

            var data = JSON.parse(req.responseText);
            var userid = data.id;
            compareUserId(restaurant_data, userid)
            console.log("This is at review.js" + restaurant_array);
    };
    req.send();

}
function compareUserId(restaurant_data, userid) {
    var req2 = new XMLHttpRequest;
    req2.open("GET", "/users/"+userid+"/reviews", true);
    req2.onload = () =>{
        var data2 = JSON.parse(req2.responseText);
        if(data2 != null){
            showRestaurantReviews(userid, restaurant_data);
        }

    }
    req2.send()
}
function showRestaurantReviews(userid, res_data){
    var obj = document.getElementById("reviewsSection");
    totalReviews = res_data.length;
    for (var count = 0; count < totalReviews; count ++){
        if(res_data[count].commentTitle == null){
            obj.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There are no reviews for this restaurant!");
            break;
        }
        else if (userid == res_data[count].userid){
            var cell = `<div class = "reviewMain" id="reviewNo${res_data[count].review_id}">
            <div id="reviewTitle${count}"><img class= "img-rounded profileIcon" src="${res_data[count].userPic}">
                <strong>${res_data[count].commentTitle}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="reviewManipulation"><button id ="reviewEdit${count}" data-toggle="modal" data-target="#editReviewModal" item="${count}" type="button" class="btn btn-primary btn-sm" onclick="getSpecificReviewData(${res_data[count].review_id})">Edit This review</button>
                <button id ="reviewDelete${count}" item="${count}" type="button" class="btn btn-primary btn-sm" onclick="deleteReview(${res_data[count].review_id})" style="margin-top: 5px">Delete This review</button>
            </div>
            <p class = "reviewUserName">${res_data[count].username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${res_data[count].datePosted}</p>
            <p class= "reviewComments">${res_data[count].comments}</p>
            </div>`
            obj.insertAdjacentHTML('beforeend', cell);
            var star = "";
            for (var i = 0; i < res_data[count].ratings; i++) {
                star += "<img src='/images/star-fill.jpg' style='width: 2%; height:2%; padding-left: 0;' />";
            }

            
            document.getElementById("reviewTitle"+count).insertAdjacentHTML('beforeend', star);
        }
        else{
            var cell = `<div class = "reviewMain" id="reviewNo${res_data[count].review_id}">
                            <div id="reviewTitle${count}"><img class= "img-rounded profileIcon" src="${res_data[count].userPic}">
                            <strong>${res_data[count].commentTitle}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <p class = "reviewUserName">${res_data[count].username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${res_data[count].datePosted}</p>
                            <p class= "reviewComments">${res_data[count].comments}</p>
                        </div>`
            obj.insertAdjacentHTML('beforeend', cell);
            var star = "";
            for (var i = 0; i < res_data[count].ratings; i++) {
                star += "<img src='/images/star-fill.jpg' style='width: 2%; height:2%; padding-left: 0;' />";
            }

            
            document.getElementById("reviewTitle"+count).insertAdjacentHTML('beforeend', star);
        }
        showReviewsImages(res_data[count]);

    }
    showReviewsImages(res_data)
}
async function showReviewsImages(res_data){
    var review_id = res_data.review_id;
    if(review_id != null){
        const getReviewImages = JSON.parse(await sendRequest("GET", "/reviewImages/"+ review_id));
        var reviewBody = document.getElementById("reviewNo"+ res_data.review_id);
        var cell = `<img src = "${getReviewImages[0].image}" class="reviewImages img-fluid" style="height: 150px;">`
        reviewBody.insertAdjacentHTML("beforeend", cell)
    }
    else{
        console.log("there is no images for this review")
    }
}
function getSpecificReviewData(reviewID){
    var req = new XMLHttpRequest;

    req.open("GET", "/reviews/"+reviewID,true);

    req.onload = function(){
        var data = JSON.parse(req.responseText);
        review_array = data
        displayCommentModalInfo(data)
    }
    req.send();
}
async function displayCommentModalInfo(data){
    //instantiate the html elements into variables
    var obj1 = document.getElementById("reviewUsername");
    var obj2 = document.getElementById("reviewTitle");
    var obj3 = document.getElementById("reviewContent");
    var obj4 = document.getElementById("submitReview");
    var obj5 = document.getElementById("reviewImagePreview");

    //get the reviews image if it exists
    const getReviewImages = JSON.parse(await sendRequest("GET", "/reviewImages/"+ data[0].review_id));
    if(getReviewImages != null){
        var reviewImage = getReviewImages[0].image;
    }

    //set the data values of the review
    var reviewID = data[0].review_id;
    var username = data[0].username;
    var reviewTitle = data[0].commentTitle;
    var reviewContent = data[0].comments;

    //use DOM to set the value on the HTML elements
    obj1.innerHTML = username;
    obj2.innerHTML = reviewTitle;
    obj3.innerHTML = reviewContent;
    obj4.setAttribute("value", reviewID);
    obj5.src = reviewImage;
    displayColorStar('editstar', data[0].rating);
}
async function changeEditReviewImagePreview(element){
    const encodedImage = await (encodedPicture(element));
    if(encodedImage != null){
        document.getElementById("reviewImagePreview").src = encodedImage
    }
}
async function changeAddReviewImagePreview(element){
    const encodedImage = await (encodedPicture(element));
    if(encodedImage != null){
        document.getElementById("addReviewPicture").src = encodedImage
    }
}
function displayColorStar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
    p.setAttribute("src", starNonFilled);
    }
    changeStarImage(num, classTarget);
}
function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starFilled);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starFilled);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starFilled);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starFilled);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starFilled);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starFilled);
            rating = 5;
            break;
    }
}
function rateIt(element){
    var num = element.getAttribute("value");
    var className = element.getAttribute("class")
    var stars = document.getElementsByClassName(className);
    var classTarget = "." + className;
    for(let star of stars){
        star.setAttribute("src", starNonFilled);
    }
    changeStarImage(num, classTarget);

}
function updateReview(element) {
    var response = confirm("Are you sure you want to update this comment?");
    if (response == true) {
        var rev_id = element.getAttribute("value");
        var req = new XMLHttpRequest;
        req.open("PUT", review_url + "/"+ rev_id, true)
        req.setRequestHeader("Content-Type", "application/json");
        review_array[0].commentTitle = document.getElementById("reviewTitle").value;
        review_array[0].comments = document.getElementById("reviewContent").value;
        review_array[0].ratings = rating;
        req.onload= () =>{
            updateReviewImage(review_array[0].review_id);
        }
        console.log(JSON.stringify(review_array[0]))
        req.send(JSON.stringify(review_array[0]));
    }
}
async function updateReviewImage(review_id){
    // const getReviewImageID = JSON.parse(await sendRequest("GET", "/reviewImages/"+ data[0].review_id))[0]._id;
    var images = {
        image: document.getElementById("reviewImagePreview").src
    }
    var req = new XMLHttpRequest;
    req.open("PUT", "/reviewImages/"+ review_id, true)
    req.setRequestHeader("Content-Type", "application/json");
    console.log(images)
    req.send(JSON.stringify(images));
}
function deleteReview(id){
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var delete_review_url = review_url + "/" + id;
        var req = new XMLHttpRequest();
        req.open("DELETE", delete_review_url, true);
        req.onload = function() {
        };
        req.send();
    }
}
async function addReview(element){
    return new Promise(async (resolve, reject) =>{
        var response = confirm("Are you sure you want to create this review?");
        if (response == true) {
            //get the values of the user inputs.
            var res_id = element.getAttribute("value");
            var user_data = await returnUserSessionData();
            var user_id = user_data.id;
            console.log(user_id);
            var ratings = rating;
            var comments = document.getElementById("addReviewContent").value;
            var commentTitle = document.getElementById("addReviewTitle").value;
            const req_body = {
                restaurantId: res_id,
                userid: user_id,
                ratings: ratings,
                comments: comments,
                commentTitle: commentTitle,
                datePosted : ""
            }
            sendPOSTRequest("POST", "/reviews", JSON.stringify(req_body));
            resolve(req_body);
        }
    } )
}
async function addReviewImage(element){
    const reviewBody = (await addReview(element));
    const reviewData = JSON.parse(await sendRequest("GET", "/reviews/"+reviewBody.userid+"/"+reviewBody.restaurantId));
    if(document.getElementById("addReviewPicture").src != ""){
        var image = document.getElementById("addReviewPicture").src
        var req_body = {
            review_id: reviewData[0].review_id,
            imagesurl: image
        }
        sendPOSTRequest("POST","/reviewImages", JSON.stringify(req_body));
    }

}
async function displayAddReviewModalInfo(element){
    //make requests here
    var res_id = element.getAttribute("value")
    var restaurant_info = await getSpecificRestaurantData(res_id);
    var user_data = await returnUserSessionData();

    //initialise elements here
    var title = document.getElementById("restaurantTitle");
    var username = document.getElementById("addReviewUsername");
    var submitButton = document.getElementById("submitAddReview");
    //Insert values here
    title.insertAdjacentHTML('beforeend', restaurant_info[0].restaurantName);
    username.setAttribute("placeholder", user_data.username);
    submitButton.setAttribute("value", res_id);
}
const getSpecificRestaurantData = async(res_id) =>{
    var res_data = await sendRequest("GET", "/restaurants/" + res_id+ "/data")
    return JSON.parse(res_data);
}
