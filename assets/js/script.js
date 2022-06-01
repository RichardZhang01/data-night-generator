{

const submitBtn = $("#submitBtn");
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

// fetchmovies = () => {

//     const url = "https://api.themoviedb.org/3/discover/movie?api_key="+ moviesAPIKey +"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

//     fetch(url)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

// }

// fetchmovies();

submitBtn.click(retrieveData)

}