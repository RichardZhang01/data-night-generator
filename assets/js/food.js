//functionality for 'add restaurant button'
let key = 'vmOdGP0ypNDcYTMyoNuk0n9x2sEXniq5';
let userLocation = '';
let restaurantLocation = '';

let newRestaurantSubmit = $('newRestaurantSubmit');

let distance = '';
let restaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];
// if (localStorage.getItem('restaurants') !== null){
//     restaurantARR = JSON.parse(localStorage.getItem('restaurants'));
// }

let newRestaurant = {
    name:"",
    cusine:"",
    price:"",
    distance:"",
}

let restaurantSubmitBtn = $('#restaurantSubmitBtn');

const getParams = () => {

    const queryString = document.location.search.split(/[=&]+/);

    const cuisine = queryString[1];
    const expense = queryString[3];
    const distance = queryString[5];

    console.log(document.location.search)
    console.log(queryString);
    console.log(cuisine);
    console.log(expense);
    console.log(distance);

    // searchAPI(cuisine, expense, distance);
}

const searchAPI = (cuisine, expense, distance) => {
    
    // const queryURL = `http://www.mapquestapi.com/directions/v2/routematrix?key=${key}&cuisine=${cuisine}&expense=${expense}&distance=${distance}` or something

    // fetch(queryURL).then().then();
    
    return;
}

function generateRestaurant(event){
    userLocation = $('#UserStreetNumR').val()+' '+$('#UserStreetNameR').val()+','+$('#UserCityR').val()+','+$('#UserStateProvinceR').val();
    restaurantLocation = $('#streetNumR').val()+" "+$('#streetNameR').val()+','+$('#cityR').val()+','+$('#stateProvinceR').val();
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
            console.log(data)
            newRestaurant.name = $('#restaurantNameR').val();
            newRestaurant.cusine = $('#cuisineR').val();
            newRestaurant.price = $('#priceRangeR').val();         
            newRestaurant.distance = data.distance[1];
            if(localStorage.getItem('restaurants')!==null){
                restaurantARR = JSON.parse(localStorage.getItem('restaurants'));
            }
            restaurantARR.push(newRestaurant);
            localStorage.setItem('restaurants',JSON.stringify(retaurantARR));
        });

}

getParams();

restaurantSubmitBtn.on('click',generateRestaurant)
//functionality for add restaurant button end