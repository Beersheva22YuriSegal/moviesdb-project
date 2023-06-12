import movieConfig from "./config/service-config.json" assert {type: 'json'};
import MoviesService from "./service/MoviesService.js";
import ApplicationBar from "./ui-ux/ApplicationBar.js";
import MoviesGrid from "./ui-ux/MoviesGrid.js";
import MovieDetails from "./ui-ux/MovieDetails.js";
// import SearchForm from "./ui-ux/SearchForm.js";
// import AuthorizationForm from "./ui-ux/AuthorizationForm.js";

//constants
const POP_SORT = 'popular'
const TOP_SORT = 'top_rated'
const UPCOMING_SORT = 'upcoming'
const NOW_SORT = 'now_playing'


const menuOptions = [
    { title: "Popular", id: "movies-container-place" },
    { title: "Top Rated", id: "movies-container-place" },
    { title: "Upcoming", id: "movies-container-place" },
    { title: "Now Playing", id: "movies-container-place" },
    { title: "Search Movie", id: "movies-search-place" }
    // { title: "Watching List", id: "movies-container-place" },
    // { title: "Favorite place", id: "movies-container-place" },
];


//objects
const menu = new ApplicationBar("main-menu-place", menuOptions, menuHandler);
const movieService = new MoviesService(movieConfig.baseUrl, movieConfig.apiKey, movieConfig.imageUrl, movieConfig.searchUrl, movieConfig.genresUrl);
const popularMovies = await movieService.getSortedMovies(POP_SORT);
const topMovies = await movieService.getSortedMovies(TOP_SORT);
const upcomingMovies = await movieService.getSortedMovies(UPCOMING_SORT);
const nowPlayingMovies = await movieService.getSortedMovies(NOW_SORT);
const moviesList = new MoviesGrid('movies-thumbnails-place', thumbnailHandler);
const detailSection = new MovieDetails("details-movie-container", movieConfig.imageUrl, hideDetails);
let obj;

//functions
async function menuHandler(index) {
    switch (index) {
        case 0: {
            moviesList.fillList('movies-thumbnails-place', popularMovies);
            break;
        }
        case 1: {
            moviesList.fillList('movies-thumbnails-place',topMovies);
            break;
        }
        case 2: {
            moviesList.fillList('movies-thumbnails-place', upcomingMovies);
            break;
        }
        case 3: {
            moviesList.fillList('movies-thumbnails-place', nowPlayingMovies);
            break;
        }
        case 4: {
            //TODO
        }
    }
}


async function thumbnailHandler(id){
    const detailsData = await movieService.getMovie(id);  
    detailSection.fillDetails(detailsData)    
}
function hideDetails() {   
    const detailSection = document.querySelector(".details-section");
    const movContainerSect = document.getElementById("movies-container-place");
    detailSection.style.display = 'none';
    movContainerSect.style.display = 'flex';    
}

// async function getGenres(){
//     const genres = await movieService.getGenres();
//     searchForm.fillData(genres.genres)
// }
