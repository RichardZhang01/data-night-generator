let key = "91d53f14a017df935d07d6021001286c";
let sort = "popularity.desc";
let genre = "Family";

let mov1 = $("#mov1");
let mov2 = $("#mov2");
let mov3 = $("#mov3");
let mov4 = $("#mov4");
let mov5 = $("#mov5");

let desc1 = $("#desc1");
let desc2 = $("#desc2");
let desc3 = $("#desc3");
let desc4 = $("#desc4");
let desc5 = $("#desc5");

function getGenre(){
    let apiURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + key + "&language=en-US&sort_by=" + sort + "&page=1&with_genres=" + genre;

    fetch(apiURL)
    .then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                
                let mov1Value = data.results[0].title;
                console.log(mov1Value);
                let mov2Value = data.results[1].title;
                console.log(mov2Value);
                let mov3Value = data.results[2].title;
                console.log(mov3Value);
                let mov4Value = data.results[3].title;
                console.log(mov4Value);
                let mov5Value = data.results[4].title;
                console.log(mov5Value);

                mov1.text(mov1Value);
                mov2.text(mov2Value);
                mov3.text(mov3Value);
                mov4.text(mov4Value);
                mov5.text(mov5Value);

                let desc1Value = data.results[0].overview;
                console.log(desc1Value);
                let desc2Value = data.results[1].overview;
                console.log(desc2Value);
                let desc3Value = data.results[2].overview;
                console.log(desc3Value);
                let desc4Value = data.results[3].overview;
                console.log(desc4Value);
                let desc5Value = data.results[4].overview;
                console.log(desc5Value);

                desc1.text(desc1Value);
                desc2.text(desc2Value);
                desc3.text(desc3Value);
                desc4.text(desc4Value);
                desc5.text(desc5Value);
            })
        }
    })
}

getGenre();