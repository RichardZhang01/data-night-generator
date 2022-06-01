key = "91d53f14a017df935d07d6021001286c";

function getGenre(){
    let apiURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + key + "&language=en-US";

    fetch(apiURL)
    .then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
            })
        }
    })
}

getGenre();