//functionality for 'add restaurant button'
let key = 'vmOdGP0ypNDcYTMyoNuk0n9x2sEXniq5';
let userLocation = '';
let restaurantLocation = '';
let cuisine;
let expense;
let distance;

let restaurantSubmitBtn = $('#restaurantSubmitBtn');
let newRestaurantSubmit = $('newRestaurantSubmit');
const restaurantBlocksEL = $(".restaurant-blocks");
const addressSubmitBtn = $('#addressSubmitBtn');

let restaurantARR = JSON.parse(localStorage.getItem('restaurants')) || [];
let savedRestaurantsList = JSON.parse(localStorage.getItem('savedRestaurants')) || [];

const getParams = () => {

    const queryString = document.location.search.split(/[=&]+/);

    cuisine = queryString[1];
    expense = queryString[3];
    distance = queryString[5];

    printResults(cuisine, expense, distance);
}

const fetchRestaurants = () => {

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

                printResults(cuisine, expense, distance);

            }); 

    }

}

//functionality for add restaurant button end

const printResults = (cusineFilter, priceFilter, distanceFilter) => {

    const restaurantList = JSON.parse(localStorage.getItem('restaurants'));

    restaurantBlocksEL.empty();

    for (let x in restaurantList) {

        const nameCard = restaurantList[x].name;
        const cusineCard = restaurantList[x].cusine;
        const priceCard = restaurantList[x].price
        const distanceCard = restaurantList[x].distance;
        const addressCard = restaurantList[x].address;

        if(cusineCard === cusineFilter && priceCard <= priceFilter && distanceCard <= distanceFilter){

            const cellContainerEl = $('<div class="cell">');
            const cardContainerEl = $('<div class="card text-center">');
            const generateGridEl = $('<div class="grid-x">');
            const textCellEl = $('<div class="cell">');
            const nameContainerEl = $('<div class="card-divider">');
            const restaurantNameEl = $('<h4 class="restaurant-title">');
            const infoContainerEl = $('<div class="card-section">');
            const cusineEl = $('<p>');
            const priceEl = $('<p>');
            const distanceEl = $('<p>');
            const addressEl = $('<p>');
            const saveBtnEl = $('<button class="button hollow success selectBtn">');

            restaurantNameEl.text(nameCard);
            cusineEl.text('Cuisine: '+cusineCard);
            //adding 1 to priceCard because potential value ranges from 0 to 3
            priceEl.text('Price: '+('$'.repeat((parseInt(priceCard)+1))));
            distanceEl.text('Distance: '+ distanceCard +' km');
            addressEl.text('Address: '+ addressCard)
            saveBtnEl.text('Select');
            saveBtnEl.attr('value', x);

            nameContainerEl.append(restaurantNameEl);
            infoContainerEl.append(saveBtnEl);
            infoContainerEl.append(cusineEl);
            infoContainerEl.append(priceEl);
            infoContainerEl.append(addressEl);
            infoContainerEl.append(distanceEl);
            textCellEl.append(nameContainerEl);
            textCellEl.append(infoContainerEl);
            generateGridEl.append(textCellEl);
            cardContainerEl.append(generateGridEl);
            cellContainerEl.append(cardContainerEl);
            restaurantBlocksEL.append(cellContainerEl);
        }
    }
}

const toResultsPage = (event) => {

    const buttonClicked = $(event.target).val();

    localStorage.setItem('selectedRestaurant', buttonClicked);
    location.assign('./summary.html');
}

const saveAddress = (event) => {

    event.preventDefault();
    userLocation = $('#UserStreetNumR').val()+' '+$('#UserStreetNameR').val()+','+$('#UserCityR').val()+','+$('#UserStateProvinceR').val();
    localStorage.setItem('userLocation', userLocation);

    fetchRestaurants();
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

    fetchRestaurants();
}


// printResults();
restaurantSubmitBtn.on('click', saveRestaurant);
restaurantBlocksEL.on('click', '.selectBtn', toResultsPage);
addressSubmitBtn.on('click', saveAddress);


getParams();
