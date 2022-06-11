//GLOBAL CONSTANTS
const API_KEY="eda1226082108bddb6261ec8484c60b0";

//QUERY SELECTOR ELEMENTS
let formArea = document.querySelector("form");
let gridArea = document.getElementById("movies-grid");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");
let showMoreButton = document.getElementById("load-more-movies-btn");
let closeButton = document.getElementById("close-search-btn");
let popupArea = document.querySelector("#mypopup-area");
let closePopup = document.getElementById("close-popup");

//VARIABLES
let pageNum = 1;
let movieName;
let searchType = "movie/now_playing";

//EVENT LISTENERS
formArea.addEventListener("submit", searchSubmit);
searchButton.addEventListener("click", searchSubmit);

closeButton.addEventListener("click", () => {
    gridArea.innerHTML = ``;
    movieName = "";
    searchInput.value = "";
    pageNum = 1;
    searchType = "movie/now_playing";
    getResults();
});

showMoreButton.addEventListener("click", () => {
    pageNum++;
    getResults();
});




//FUNCTIONS FOR MOVIE API DOCUMENTATION
//Function to change url when user searches value
function searchSubmit(evt)
{
    console.log("woop")
    evt.preventDefault();

    movieName = searchInput.value;
    console.log(movieName);
    searchType = "search/movie";

    gridArea.innerHTML = ``;
    getResults();
}

//Function to display movie API results
async function getResults()
{
    //let apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key="+ API_KEY +"&language=en-US&page=" + pageNum;
    let apiUrl = `https://api.themoviedb.org/3/${searchType}?api_key=${API_KEY}&language=en-US&page=${pageNum}&query=${movieName}`;
    console.log(apiUrl);
    let response = await fetch(apiUrl);
    let responseData = await response.json();
    displayResults(responseData);
}

//Function to Display Movies
function displayResults(movieData)
{
    console.log(movieData)
    for(let i = 0; i < movieData.results.length; i++)
    {
        let posterPath = movieData.results[i].poster_path;
        let movieId = movieData.results[i].id;
        gridArea.innerHTML +=
        `
            <div class="movie-card" onclick="requestMoreMovieInfo(${movieId})">
                <img src="https://image.tmdb.org/t/p/w200/${posterPath}" class="movie-poster" alt="${movieData.results[i].title} poster" onerror="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1c2YfTsdjglP00n5iGlsq8ChEOAiKV72SAg&usqp=CAU';" />
                <h4 class="movie-title">${movieData.results[i].title}</h4>
                <p class="movie-votes"> Rating: ${movieData.results[i].vote_average} / 10 </p>
            </div>
        `
    }
    showMoreButton.classList.remove("hidden");
}




//FUNCTIONS TO REQUEST MORE MOVIE INFO AND CONTROL POPUP
//Function to request more movie information and call popup display
async function requestMoreMovieInfo(movieId)
{
    let movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    
https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
    console.log(movieUrl);
    let movieResponse = await fetch(movieUrl);
    let movieResponseData = await movieResponse.json();
    console.log(movieResponseData);
    showMoreMovieInfo(movieResponseData);
}

//Function to display popup window with movie info
function showMoreMovieInfo(movieCardData)
{
    console.log("popup entered");
    let backDropPath = movieCardData.backdrop_path;
    popupArea.innerHTML = ``;
    popupArea.innerHTML +=
    `
        <button type="button" id="close-popup" onclick="clearPopup()"> X </button>
        <div id="extra-movie-info">
            <h1>${movieCardData.title}</h1>
            <img src="https://image.tmdb.org/t/p/w200/${backDropPath}" class="movie-backdrop" alt="${movieCardData.title} poster" onerror="this.onerror=null;this.src='imageNotAvailable.jpg';" />
            <div id="movie-runtime-release">
                <h4>Runtime: ${movieCardData.runtime} |</h4>
                <h4>Released: ${movieCardData.release_date} |</h4>
                <h4>Genre: ${movieCardData.genres[0].name}</h4>
            </div>
            <p>${movieCardData.overview}</p>
        </div>
    `
    popupArea.style.display = "block";
}

//function to clear the movie popup information
function clearPopup()
{   
    console.log("clear popup entered");
    popupArea.style.display = 'none';
    popupArea.innerHTML = ``;
}




//WINDOW SPECIFIC FUNCTIONS
window.onload
{
    console.log("page loaded");
    getResults();
}

window.onclick = function(evt)
{
    if(evt.target != popupArea)
    {
        popupArea.style.display = "none";
        popupArea.innerHTML = ``;
    }
}