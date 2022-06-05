const key = "91d53f14a017df935d07d6021001286c";

let cuisine;
let expense;
let distance;

function getParams(){

    const queryString = document.location.search.split(/[=&]+/);

    const genre = queryString[1];
    const sort = queryString[3];
    cuisine = queryString[5];
    expense = queryString[7];
    distance = queryString[9];
    
    console.log(document.location.search)
    console.log(queryString);
    console.log(genre);
    console.log(sort);
    console.log(cuisine);
    console.log(expense);
    console.log(distance);

    searchAPI(genre, sort);
}

const searchAPI = (genre, sort) => {

    if (genre === "%20" && sort === "%20") {
        console.log("sort and genre empty");
        searchTrending();
        return;
    }

    if (sort === "top_rated") {
      console.log("rating");
      searchTopRated();
      return;
  }

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genre}&sort_by=${sort}&release_date.lte=${today}`;

    fetch(movieUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      
    //   resultTextEl.textContent = locRes.search.query;

      console.log(data);

      if (!data.results.length) {
        console.log('No results found!');
        // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        // resultContentEl.textContent = '';
        // for (var i = 0; i < locRes.results.length; i++) {
        //   printResults(locRes.results[i]);
        // }
        printResults(data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}

const searchTrending = () => {

  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`;

  fetch(trendingUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      
    //   resultTextEl.textContent = locRes.search.query;

      console.log(data);

      if (!data.results.length) {
        console.log('No results found!');
        // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        // resultContentEl.textContent = '';
        // for (var i = 0; i < locRes.results.length; i++) {
        //   printResults(locRes.results[i]);
        // }
        printResults(data);
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}

const searchTopRated = () => {

  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`;

  fetch(topRatedUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      
    //   resultTextEl.textContent = locRes.search.query;

      console.log(data);

      if (!data.results.length) {
        console.log('No results found!');
        // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        // resultContentEl.textContent = '';
        // for (var i = 0; i < locRes.results.length; i++) {
        //   printResults(locRes.results[i]);
        // }
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

    console.log(movieList);
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
              // console.log(response);
              response.json().then(function(data){
                // console.log("---genrelist---");
                // console.log(data.genres);
                // console.log(movieList);
                // console.log(movieList.length);

                let genreList = data.genres;
                
                
                  let genre_ids = movieList[x].genre_ids;
                  // console.log(`---- iteration ${x} -----`);
                  // console.log(genre_ids);

                  // genresEl = $("<p>");
                  // genresEl.text("Genres: ");
                  infoContainerEl.append(genresEl);

                  for (let y in genre_ids) {
                    for (let z in genreList){

                      
                      // console.log("---- COMPARISON ----")
                      // console.log(genre_ids[y]);
                      // console.log(genreList[z].id);

                      if(genre_ids[y]===genreList[z].id){
                        // console.log("----SUCCESS----");
                        // console.log(genreList[z].name);

                        genreSpanEl = $("<span>");
                        genreSpanEl.text(`[${genreList[z].name}] `);
                        genresEl.append(genreSpanEl);

                        // 
                      }

                    }
                  }

              })
            }
          })

          

    }

}

getParams();

let movieBlocks = $(".movie-blocks");

console.log(movieBlocks);

// When the select button is pressed, it links to the food.html and the selected movie ID is added to local storage. 

movieBlocks.on("click",".selectBtn",function(){
  selectedMovieId = $(this).attr("value");
  console.log(selectedMovieId);
  localStorage.setItem("selectedMovieId",JSON.stringify(selectedMovieId));  
  location.assign("./food.html?cuisine=" + cuisine + "&expense=" + expense + "&distance=" + distance);
});