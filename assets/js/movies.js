const key = "91d53f14a017df935d07d6021001286c";
const paginationDiv = $("#pagination");

let cuisine;
let expense;
let distance;
let genre;
let sort;

let counter = 1;
let maxPages = 10;

function getParams(){

    const queryString = document.location.search.split(/[=&]+/);

    genre = queryString[1];
    sort = queryString[3];
    cuisine = queryString[5];
    expense = queryString[7];
    distance = queryString[9];
    
    searchAPI(genre, sort);
}

const searchAPI = (genre, sort) => {

    if (genre === "%20" && sort === "%20") {
        searchTrending();
        return;
    }

    if (sort === "top_rated") {
      searchTopRated();
      return;
  }

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=${counter}&with_genres=${genre}&sort_by=${sort}&release_date.lte=${today}`;

    fetch(movieUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      
      if (!data.results.length) {
        console.log('No results found!');
      } else {
        printResults(data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}

const searchTrending = () => {

  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?page=${counter}&api_key=${key}`;

  fetch(trendingUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      
      if (!data.results.length) {
        console.log('No results found!');
      } else {
        printResults(data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}

const searchTopRated = () => {

  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?page=${counter}&api_key=${key}&language=en-US`;

  fetch(topRatedUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      
      if (!data.results.length) {
        console.log('No results found!');
      } else {
        printResults(data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}

const printResults = (data) => {

    const movieBlocksEl = $(".movie-blocks");
    const movieList = data.results;

    movieBlocksEl.empty();

    for (let x in movieList) {

        const title = movieList[x].title;
        const overview = movieList[x].overview;
        const releaseDate = movieList[x].release_date
        const rating = movieList[x].vote_average;
        const posterPath = movieList[x].poster_path;
        const movieID = movieList[x].id;

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
        const saveBtnEl = $('<button class="button hollow success selectBtn">');

        posterImageEl.attr('src', `https://image.tmdb.org/t/p/original${posterPath}`);
        posterImageEl.attr('alt', `Movie Poster for ${title}`);
        movieTitleEl.text(`${title} (${releaseDate})`);
        ratingEl.text('Rating: ');
        ratingValueEl.text(rating);
        overviewEl.text(`Overview: ${overview}`);
        saveBtnEl.attr('value', movieID);
        saveBtnEl.text('Select');

        ratingEl.append(ratingValueEl);
        infoContainerEl.append(saveBtnEl);
        infoContainerEl.append(ratingEl);
        infoContainerEl.append(overviewEl);
        titleContainerEl.append(movieTitleEl);
        textCellEl.append(titleContainerEl);
        textCellEl.append(infoContainerEl);
        posterCellEl.append(posterImageEl);
        generateGridEl.append(posterCellEl);
        generateGridEl.append(textCellEl);
        cardContainerEl.append(generateGridEl);
        movieBlocksEl.append(cardContainerEl);
        
        const genresEl = $("<p>");
        genresEl.text("Genres: ");
        infoContainerEl.append(genresEl);
        
        

        let genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + key + "&language=en-US";

        fetch(genreURL)
          .then(function(response){
            if(response.ok){
              response.json().then(function(data){

                let genreList = data.genres;
                
                
                  let genre_ids = movieList[x].genre_ids;

                  infoContainerEl.append(genresEl);

                  for (let y in genre_ids) {
                    for (let z in genreList){

                      if(genre_ids[y]===genreList[z].id){

                        genreSpanEl = $("<span>");
                        genreSpanEl.text(`[${genreList[z].name}] `);
                        genresEl.append(genreSpanEl);

                      }

                    }
                  }

              })
            }
          })

    }

}



let movieBlocks = $(".movie-blocks");

// When the select button is pressed, it links to the food.html and the selected movie ID is added to local storage. 

movieBlocks.on("click",".selectBtn",function(){
  selectedMovieId = $(this).attr("value");
  console.log(selectedMovieId);
  localStorage.setItem("selectedMovieId",JSON.stringify(selectedMovieId));  
  location.assign("./food.html?cuisine=" + cuisine + "&expense=" + expense + "&distance=" + distance);
});

const changePage = (event) => {

  const btnClicked = $(event.target);

  if (btnClicked.hasClass("pagination-previous")) {

    if (counter === 1) {
      console.log("counter = 1");
      return;
    }

    counter--;

    if (counter === 1) {
      btnClicked.attr("disabled", "");
    }

    if (counter < maxPages) {
      $(".pagination-next").removeAttr("disabled");
    }

    searchAPI(genre, sort);

  }

  if (btnClicked.hasClass("pagination-next")) {

    if (counter === maxPages) {
      console.log("counter = max");
      return;
    }

    counter++;

    if (counter === maxPages) {
      btnClicked.attr("disabled", "");
    }

    if (counter > 1) {
      $(".pagination-previous").removeAttr("disabled");
    }

    searchAPI(genre, sort);

  }

}

paginationDiv.on("click", changePage);

getParams();