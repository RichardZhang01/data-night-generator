const submitBtn = $("#submitBtn");
const resturantBtn = $("#restaurantSubmitBtn")
const moviesAPIKey = "91d53f14a017df935d07d6021001286c";

let restaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];
let savedRestaurantsList = JSON.parse(localStorage.getItem('savedRestaurants')) || [];

const retrieveData = () => {

    const genre = $("#genre").val();
    const sort = $("#sort").val();
    const cuisine = $("#cuisine").val();
    const expense = $("#expense").val();
    const distance = $("#distance").val();

    const queryString = `./movies.html?genre=${genre}&sort=${sort}&cuisine=${cuisine}&expense=${expense}&distance=${distance}`;

    location.assign(queryString);
}

//functionality for 'add restaurant button start
let key = 'vmOdGP0ypNDcYTMyoNuk0n9x2sEXniq5';
let userLocation = '';
let restaurantLocation = '';

let newRetaurantSubmit = $('newRetaurantSubmit') ;

let distance = '';
let retaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];

let restaurantSubmitBtn = $('#restaurantSubmitBtn')

function generateRestaurant(){


    userLocation = localStorage.getItem('userLocation');
    let restaurants = JSON.parse(localStorage.getItem('restaurantLocations')); 

    localStorage.removeItem('restaurants');
    
    
    for (let x in restaurants) {

        restaurantLocation = `${restaurants[x].streetNum} ${restaurants[x].streetName},${restaurants[x].city},${restaurants[x].stateProv}`;
        let locations = {
            "locations": [
                userLocation,
                restaurantLocation,
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

                let newRestaurant = {
                    name:"",
                    cusine:"",
                    price:"",
                    address:"",
                    distance:"",
                }

                newRestaurant.name = restaurants[x].restaurantName;
                newRestaurant.cusine = restaurants[x].cuisine;
                newRestaurant.price = restaurants[x].price;
                newRestaurant.address = `${restaurants[x].streetNum} ${restaurants[x].streetName}`;          
                newRestaurant.distance = Math.round(((data.distance[1]*1.60934) + Number.EPSILON) * 100) / 100;

                restaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];
                restaurantARR.push(newRestaurant);

                localStorage.setItem('restaurants',JSON.stringify(restaurantARR));

            }); 

    }

}

const addressSubmitBtn = $('#addressSubmitBtn');

const saveAddress = (event) => {

    event.preventDefault();
    userLocation = $('#UserStreetNumR').val()+' '+$('#UserStreetNameR').val()+','+$('#UserCityR').val()+','+$('#UserStateProvinceR').val();
    localStorage.setItem('userLocation', userLocation);

    generateRestaurant();

}

const saveRestaurant = (event) => {

    event.preventDefault();

    let savedRestaurant = {
        streetNum: $('#streetNumR').val(),
        streetName: $('#streetNameR').val(),
        city: $('#cityR').val(),
        stateProv: $('#stateProvinceR').val(),
        cuisine: $('#cuisineR').val(),
        restaurantName: $('#restaurantNameR').val(),
        price: $('#priceRangeR').val(),
    }
    
    savedRestaurantsList = JSON.parse(localStorage.getItem('restaurantLocations')) || [];
    savedRestaurantsList.push(savedRestaurant);
    localStorage.setItem('restaurantLocations', JSON.stringify(savedRestaurantsList));

    generateRestaurant();
}

addressSubmitBtn.on('click', saveAddress);
restaurantSubmitBtn.on('click', saveRestaurant);
submitBtn.click(retrieveData)
//functionality for add restaurant button end