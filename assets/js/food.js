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

            newRetaurant.name = $('#restaurantNameR').val();
            newRetaurant.cusine = $('#cuisineR').val();
            newRetaurant.price = $('#priceRangeR').val();         
            newRetaurant.distance = Math.round(((data.distance[1]*1.60934) + Number.EPSILON) * 100) / 100;

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

//Printing options to page
//Place Holder selection for testing purposes until program can navigate to this page and actually filter selections can be carried over
let cusineFilter = 'Italian';
let priceFilter = '1';
let distanceFilter = 5;

const printResults = () => {

    const restaurantBlocksEL = $(".restaurant-blocks");
    const restaurantList = JSON.parse(localStorage.getItem('restaurants'));

    console.log(restaurantList);
    restaurantBlocksEL.empty();

    for (let x in restaurantList) {

        const nameCard = restaurantList[x].name;
        const cusineCard = restaurantList[x].cusine;
        const priceCard = restaurantList[x].price
        const distanceCard = restaurantList[x].distance;

        if(cusineCard === cusineFilter && priceCard === priceFilter && distanceCard <= distanceFilter){

            const cardContainerEl = $('<div class="card text-center">');
            const generateGridEl = $('<div class="grid-x">');
            const textCellEl = $('<div class="cell">');
            const nameContainerEl = $('<div class="card-divider">');
            const retaurantNameEl = $('<h4 class="restaurant-title">');
            const infoContainerEl = $('<div class="card-section">');
            const cusineEl = $('<p>');
            const priceEl = $('<p>');
            const distanceEl = $('<p>');
            const saveBtnEl = $('<button class="button hollow success selectBtn">');

            retaurantNameEl.text(nameCard);
            cusineEl.text('Cuisine: '+cusineCard);
            //adding 1 to priceCard because potential value ranges from 0 to 3
            priceEl.text('Price: '+('$'.repeat((parseInt(priceCard)+1))));
            distanceEl.text('Distance: '+distanceCard+' km');
            saveBtnEl.text('Select');

            nameContainerEl.append(retaurantNameEl);
            infoContainerEl.append(saveBtnEl);
            infoContainerEl.append(cusineEl);
            infoContainerEl.append(priceEl);
            infoContainerEl.append(distanceEl);
            textCellEl.append(nameContainerEl);
            textCellEl.append(infoContainerEl);
            generateGridEl.append(textCellEl);
            cardContainerEl.append(generateGridEl);
            restaurantBlocksEL.append(cardContainerEl)
        }




    }
}

printResults();