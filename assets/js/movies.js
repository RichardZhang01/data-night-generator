const key = "91d53f14a017df935d07d6021001286c";
// let sort = "popularity.desc";
// let genre = "Family";

// let mov1 = $("#mov1");
// let mov2 = $("#mov2");
// let mov3 = $("#mov3");
// let mov4 = $("#mov4");
// let mov5 = $("#mov5");

// let desc1 = $("#desc1");
// let desc2 = $("#desc2");
// let desc3 = $("#desc3");
// let desc4 = $("#desc4");
// let desc5 = $("#desc5");

function getParams(){

    const queryString = document.location.search.split(/[=&]+/);

    const genre = queryString[1];
    const sort = queryString[3];
    
    console.log(queryString);
    console.log(genre);
    console.log(sort);

    // document.location.replace("./foods.html?cuisine=${cuisine}&distance=${distance}");

    searchAPI(genre, sort);
}

const searchAPI = (genre, sort) => {

    // if (genre === "%20" && sort === "%20") {

    // }

    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genre}&sort_by=${sort}`

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
        const posterCellEl = $('<div class="cell large-2 medium-3 small-4">');
        const posterImageEl = $('<img>');
        const textCellEl = $('<div class="cell large-10 medium-9 small-8">');
        const titleContainerEl = $('<div class="card-divider">');
        const movieTitleEl = $('<h4 class="movie-title">');
        const infoContainerEl = $('<div class="card-section info-container">');
        const ratingEl = $('<p>');
        const ratingValueEl = $('<span>');
        const overviewEl = $('<p>');
        const saveBtnEl = $('<button class="button hollow success selectBtn">')

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
        

        let genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + key + "&language=en-US";

        fetch(genreURL)
          .then(function(response){
            if(response.ok){
              console.log(response);
              response.json().then(function(data){
                console.log("---genrelist---");
                console.log(data.genres);
                console.log(movieList);
                console.log(movieList.length);

                let genreList = data.genres;
                
                
                  let genre_ids = movieList[x].genre_ids;
                  console.log(`---- iteration ${x} -----`);
                  console.log(genre_ids);

                  genresEl = $("<p>");
                  genresEl.text("Genres: ");
                  infoContainerEl.append(genresEl);

                  for (let y in genre_ids) {
                    for (let z in genreList){

                      
                      console.log("---- COMPARISON ----")
                      console.log(genre_ids[y]);
                      console.log(genreList[z].id);

                      if(genre_ids[y]===genreList[z].id){
                        console.log("----SUCCESS----");
                        console.log(genreList[z].name);

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