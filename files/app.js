const KEY = "63ef9c1da41cd3c843dcec9ed2264b73";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =`https://api.themoviedb.org/3/search/movie?&api_key=${KEY}&query=`;
const mainEl = document.querySelector("#main")
const searcher =  document.querySelector("#search");
const form = document.querySelector("#form")
GetMovie(API_URL)
async function GetMovie(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results)
}

function showMovies(movies) {
    mainEl.innerHTML = "";
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview} = movie;
        const movies = document.createElement("div");
         movies.innerHTML = `
       <div class="movie-container">
       <div class="movie">
           <img src="${IMG_PATH + poster_path}" alt="">
           <div class="movie-info">
           <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview"><h3>Overview :</h3>
            ${overview}
            </div>
         </div>
         </div>    `;
            mainEl.appendChild(movies);
    })
};
function getClassByRate(vote) {
    if(vote >= 8) {
        return "green";
    } else if (vote >= 5){
        return "orange";
    } else {
        return "red";
    }
}
getClassByRate()
form.addEventListener("submit",(e) => {
    e.preventDefault();
    const Search = searcher.value;
    if(Search) {
        GetMovie(SEARCH_API + Search)
        Search.value = "";
    }
})