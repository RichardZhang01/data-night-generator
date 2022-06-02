{

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

submitBtn.click(retrieveData)
resturantBtn.click(saveRestaurant);

}