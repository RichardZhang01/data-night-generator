const key = "91d53f14a017df935d07d6021001286c";
let chosenMovieId;

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

                    const movieBlocksEl = $(".movie-blocks");
                    movieBlocksEl.empty();

                    const title = data.title;
                    const overview = data.overview;
                    const releaseDate = data.release_date
                    const rating = data.vote_average;
                    const posterPath = data.poster_path;
                    const movieID = data.id;

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
                    movieBlocksEl.append(cardContainerEl);
                    
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

                })
            }
        })
}

init();