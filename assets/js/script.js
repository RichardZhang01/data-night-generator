const submitBtn = $("#submitBtn");
const resturantBtn = $("#restaurantSubmitBtn")
const moviesAPIKey = "91d53f14a017df935d07d6021001286c";

const retrieveData = () => {

    const genre = $("#genre").val();
    const sort = $("#sort").val();
    const cuisine = $("#cuisine").val();
    const expense = $("#expense").val();
    const distance = $("#distance").val();

    console.log(genre, sort, cuisine, expense, distance);

    const queryString = `./movies.html?genre=${genre}&sort=${sort}&cuisine=${cuisine}&expense=${expense}&distance=${distance}`;

    location.assign(queryString);
}

const saveRestaurant = () => {

    const priceRange = $("#priceRangeR").val();

    console.log(priceRange);

}


//functionality for 'add restaurant button start
let key = 'vmOdGP0ypNDcYTMyoNuk0n9x2sEXniq5';
let userLocation = '';
let retaurantLocation = '';

let newRetaurantSubmit = $('newRetaurantSubmit') ;

let distance = '';
let retaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];

let newRetaurant = {
    name:"",
    cusine:"",
    price:"",
    distance:"",
}

let restaurantSubmitBtn = $('#restaurantSubmitBtn')

function generateRestaurant(event){
    event.preventDefault();

    userLocation = localStorage.getItem('userLocation');
    console.log(userLocation);
    retaurantLocation = $('#streetNumR').val()+" "+$('#streetNameR').val()+','+$('#cityR').val()+','+$('#stateProvinceR').val();
    let locations = {
        "locations": [
            userLocation,
            retaurantLocation,
        ],
    }

    fetch('http://www.mapquestapi.com/directions/v2/routematrix?key='+key, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(locations)

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {  
            console.log(data)
            newRetaurant.name = $('#restaurantNameR').val();
            newRetaurant.cusine = $('#cuisineR').val();
            newRetaurant.price = $('#priceRangeR').val();         
            newRetaurant.distance = data.distance[1];
            retaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];
            retaurantARR.push(newRetaurant);
            console.log("array");
            console.log(retaurantARR);
            localStorage.setItem('restaurants',JSON.stringify(retaurantARR));
        });

}

const addressSubmitBtn = $('#addressSubmitBtn');

const saveAddress = (event) => {

    event.preventDefault();
    userLocation = $('#UserStreetNumR').val()+' '+$('#UserStreetNameR').val()+','+$('#UserCityR').val()+','+$('#UserStateProvinceR').val();
    localStorage.setItem('userLocation', userLocation);

}

addressSubmitBtn.on('submit', saveAddress);
restaurantSubmitBtn.on('click', generateRestaurant);
submitBtn.click(retrieveData)
resturantBtn.click(saveRestaurant);
//functionality for add restaurant button end