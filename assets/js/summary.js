const key = "91d53f14a017df935d07d6021001286c";
let chosenMovieId;
const movieBlocksEl = $(".movie-blocks");
let storedRestaurant = localStorage.getItem("selectedRestaurant");

function init(){
    let storedMovieId = JSON.parse(localStorage.getItem("selectedMovieId"));
    console.log(storedMovieId);
    chosenMovieId = storedMovieId;
    chosenMovie(); 

}

function chosenMovie() {
    let chosenMovieUrl = "https://api.themoviedb.org/3/movie/" + chosenMovieId + "?api_key=" + key;

    fetch(chosenMovieUrl)
        .then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(data){
                    console.log(data);

                    movieBlocksEl.empty();

                    const title = data.title;
                    const overview = data.overview;
                    const releaseDate = data.release_date
                    const rating = data.vote_average;
                    const posterPath = data.poster_path;
                    const movieID = data.id;

                    const cellMovEl = $('<div class="cell">');
                    const equalizerEl = $('<div data-equalizer-watch="foo">')
                    const cardContainerEl = $('<div class="card">');
                    const generateGridEl = $('<div class="grid-x">');
                    const posterCellEl = $('<div class="cell large-2 medium-4 small-0">');
                    const posterImageEl = $('<img>');
                    const textCellEl = $('<div class="cell large-10 medium-8 small-12">');
                    const titleContainerEl = $('<div class="card-divider">');
                    const movieTitleEl = $('<h4 class="movie-title">');
                    const infoContainerEl = $('<div class="card-section info-container">');
                    const ratingEl = $('<p>');
                    const ratingValueEl = $('<span>');
                    const overviewEl = $('<p class="overview">');

                    posterImageEl.attr('src', `https://image.tmdb.org/t/p/original${posterPath}`);
                    posterImageEl.attr('alt', `Movie Poster for ${title}`);
                    movieTitleEl.text(`${title} (${releaseDate})`);
                    ratingEl.text('Rating: ');
                    ratingValueEl.text(rating);
                    overviewEl.text(`Overview: ${overview}`);

                    ratingEl.append(ratingValueEl);
                    
                    infoContainerEl.append(ratingEl);
                    infoContainerEl.append(overviewEl);
                    titleContainerEl.append(movieTitleEl);
                    textCellEl.append(titleContainerEl);
                    textCellEl.append(infoContainerEl);
                    posterCellEl.append(posterImageEl);
                    generateGridEl.append(posterCellEl);
                    generateGridEl.append(textCellEl);
                    cardContainerEl.append(generateGridEl);
                    equalizerEl.append(cardContainerEl)
                    cellMovEl.append(equalizerEl);
                    movieBlocksEl.append(cellMovEl);
                    
                    const genresEl = $("<p>");
                    genresEl.text("Genres: ");
                    infoContainerEl.append(genresEl);

                    const selectedGenre = data.genres;
                    console.log(selectedGenre);

                    for (let x in selectedGenre){
                        genreSpanEl = $("<span>");
                        genreSpanEl.text(`[${selectedGenre[x].name}] `);
                        genresEl.append(genreSpanEl);
                    }

                    chosenRestaurant(storedRestaurant);
                })

            }

        })
    
}

const chosenRestaurant = (restaurantIndex) => {

    const storedRestaurantList = JSON.parse(localStorage.getItem('restaurants'));

    const restaurant = storedRestaurantList[restaurantIndex];

    console.log(restaurant);

    const nameCard = restaurant.name;
    const cusineCard = restaurant.cusine;
    const priceCard = restaurant.price
    const distanceCard = restaurant.distance;

    const cellEl = $('<div class="cell">');
    const equalizerEl = $('<div data-equalizer-watch>')
    const cardContainerEl = $('<div class="card text-center">');
    const generateGridEl = $('<div class="grid-x">');
    const textCellEl = $('<div class="cell">');
    const nameContainerEl = $('<div class="card-divider">');
    const restaurantNameEl = $('<h4 class="restaurant-title">');
    const infoContainerEl = $('<div class="card-section">');
    const cusineEl = $('<p>');
    const priceEl = $('<p>');
    const distanceEl = $('<p>');

    restaurantNameEl.text(nameCard);
    cusineEl.text('Cuisine: '+cusineCard);
    //adding 1 to priceCard because potential value ranges from 0 to 3
    priceEl.text('Price: '+('$'.repeat((parseInt(priceCard)+1))));
    distanceEl.text('Distance: '+ distanceCard +' km');

    nameContainerEl.append(restaurantNameEl);
    infoContainerEl.append(cusineEl);
    infoContainerEl.append(priceEl);
    infoContainerEl.append(distanceEl);
    textCellEl.append(nameContainerEl);
    textCellEl.append(infoContainerEl);
    generateGridEl.append(textCellEl);
    cardContainerEl.append(generateGridEl);
    equalizerEl.append(cardContainerEl);
    cellEl.append(equalizerEl);
    movieBlocksEl.append(cellEl);

}

init();