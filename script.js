//GLOBAL CONSTANTS
const API_KEY="eda1226082108bddb6261ec8484c60b0";

//QUERY SELECTOR ELEMENTS
let formArea = document.querySelector("form");
let gridArea = document.getElementById("movies-grid");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");
let showMoreButton = document.getElementById("load-more-movies-btn");

//VARIABLES
let pageNum = 1;
let movieName;
let searchType = "movie/now_playing";

//EVENT LISTENERS
formArea.addEventListener("submit", searchSubmit);

searchButton.addEventListener("click", searchSubmit);

showMoreButton.addEventListener("click", () => {
    pageNum++;
    getResults();
});

//FUNCTIONS
//Function to get movie API results
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
        gridArea.innerHTML +=
        `
            <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w200/${posterPath}" class="movie-poster" alt="${movieData.results[i].title} poster" onerror="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1c2YfTsdjglP00n5iGlsq8ChEOAiKV72SAg&usqp=CAU';" />
                <div id="info-section">
                    <h4 class="movie-title">${movieData.results[i].title}</h4>
                    <p>Rating: ${movieData.results[i].vote_average} / 10 </p>
                </div>
            </div>
        `
    }
    showMoreButton.classList.remove("hidden");
}

//Function to load movie posters immediately upon load
window.onload
{
    console.log("page loaded");
    getResults();
}
