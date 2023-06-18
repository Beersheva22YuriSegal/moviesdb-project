import movieConfig from "./config/service-config.json" assert {type: 'json'};
import ApplicationBar from "./ui-ux/ApplicationBar.js";
import MoviesService from "./service/MoviesService.js";
import MoviesGrid from "./ui-ux/MoviesGrid.js";
import MovieDetails from "./ui-ux/MovieDetails.js";
import SearchForm from "./ui-ux/SearchForm.js";
import Paginator from "./ui-ux/Paginator.js";
import AuthorizationBar from "./ui-ux/AuthorizationBar.js";
import AuthorizationForm from "./ui-ux/AuthorizationForm.js";

//constants
const menuOptions = [
    { title: "Popular", id: 'movies-container-place' },
    { title: "Top Rated", id: 'movies-container-place' },
    { title: "Upcoming", id: 'movies-container-place' },
    { title: "Now Playing", id: 'movies-container-place' },
    { title: "Watching List", id: 'movies-container-place' },
    { title: "Favorites", id: 'movies-container-place' },
    { title: "Search Movie", id: 'movies-search-place' }
];

//objects
let userId;
let obj;
const menu = new ApplicationBar('main-menu-place', menuOptions, menuHandler, ['movie-details-place', 'authorization-place', 'movies-search-place']);
const authorizationMenu = new AuthorizationBar('authorization-menu-place', authorizationHandler, ['movies-container-place', 'movie-details-place', 'movies-search-place']);
const authorizationForm = new AuthorizationForm('authorization-place', 'login', login, 'Please login');
const registrationForm = new AuthorizationForm('authorization-place', 'register', createUser, 'Registration form');
const movieService = new MoviesService(movieConfig.baseUrl, movieConfig.genresUrl, movieConfig.searchUrl, movieConfig.jsonUrl, movieConfig.apiKey);
const moviesGrid = new MoviesGrid('movies-container-place', 'movies-grid-place', getMovieDetails);
const movieDetails = new MovieDetails('movie-details-place', 'movies-container-place', moviesDetailsHandler);
const paginator = new Paginator('pages-place');
const searchForm = new SearchForm('movies-search-place', searchMovies, 'movies-container-place');

//functions
async function menuHandler(index) {
    const actions = {
        0: () => getPopularMovies(1),
        1: () => getTopMovies(1),
        2: () => getUpcomingMovies(1),
        3: () => getNowPlayingMovies(1),
        4: () => getMoviesFromUserList('watchList'),
        5: () => getMoviesFromUserList('favList'),
        6: () => getGenres()
    }
    actions[+index]();
}

async function authorizationHandler(index) {
    const actions = {
        0: () => authorizationForm.fillForm(),
        1: () => registrationForm.fillForm(),
        2: () => logOut()
    }
    actions[+index]();
}

async function getMovies(sortType, page) {
    const movies = await action(movieService.getMovies.bind(movieService, sortType, page));
    return movies;
}

async function getPopularMovies(page) {
    const movies = await getMovies(movieConfig.popularMovies, page);
    paginator.fillData(movies.page, movies.total_pages, getPopularMovies);
    moviesGrid.fillData(movies.results);
}

async function getTopMovies(page) {
    const movies = await getMovies(movieConfig.topRatedMovies, page);
    paginator.fillData(movies.page, movies.total_pages, getTopMovies);
    moviesGrid.fillData(movies.results);
}

async function getUpcomingMovies(page) {
    const movies = await getMovies(movieConfig.upcomingMovies, page);
    paginator.fillData(movies.page, movies.total_pages, getUpcomingMovies);
    moviesGrid.fillData(movies.results);
}

async function getNowPlayingMovies(page) {
    const movies = await getMovies(movieConfig.nowPlayingMovies, page);
    paginator.fillData(movies.page, movies.total_pages, getNowPlayingMovies);
    moviesGrid.fillData(movies.results);
}

async function moviesDetailsHandler(id, movieId, name) {
    const response = await action(movieService.updateUserMovies.bind(movieService, id, movieId, name))
}

async function getMovieDetails(id) {
    let isInWatching = false;
    let isInFavorite = false;
    const movie = await movieService.getMovie(id);
    if (userId != undefined) {
        isInWatching = await checkMovie(id, 'watchList');
        isInFavorite = await checkMovie(id, 'favList');
    }
    movieDetails.fillData(movie, isInWatching, isInFavorite);
}

async function getGenres() {
    obj = undefined;
    const genres = await movieService.getGenres();
    searchForm.fillData(genres.genres)
}

async function searchMovies(page) {
    if (!obj) {
        obj = searchForm.getDataFromForm();
    }
    const movies = await action(movieService.searchMovies.bind(movieService, obj, page));
    paginator.fillData(movies.page, movies.total_pages, searchMovies);
    moviesGrid.fillData(movies.results);
}

// user actions

async function createUser(email, password) {
    const isCreated = await action(movieService.getUser.bind(movieService, email));
    if (Object.keys(isCreated).length != 0) {
        errorMessage('There is a user with such email')
    } else {
        const user = await action(movieService.createUser.bind(movieService, email, password));
        if (user != undefined) {
            login(user.email, user.password);
        }
    }
}

function logOut() {
    userId = undefined;
    movieDetails.logout()
    authorizationMenu.logOut()
    menu.logout()
}

async function login(email, password) {
    const user = await action(movieService.getUser.bind(movieService, email, password));
        movieDetails.login(true, user[0].id);
        authorizationMenu.login(user[0].email);
        menu.login()
        userId = user[0].id;
}

async function checkMovie(id, listName) {
    const movies = await getMoviesFromUser(listName);
    return movies.includes(+id);
}

async function getMoviesFromUser(listName) {
    const moviesId = await movieService.getMoviesFromUserList(listName, userId);
    return moviesId;
}

async function getMoviesFromUserList(listName) {
    const movieId = await getMoviesFromUser(listName);
    let movies = [];
    movies = await Promise.all(movieId.map(el => action(movieService.getMovie.bind(movieService, el))));
    paginator.filldata()
    moviesGrid.fillData(movies, listName == 'watchList' ? 'Watching list' : 'Favorite')
}

//action

async function action(serviceFn) {
    return await serviceFn();
  }