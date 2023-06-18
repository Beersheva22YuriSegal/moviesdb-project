export default class MovieDetails {
    #parentId;
    #buttons;
    #prevPage;
    #userId;
    #addMovie;
    #movieId;
    #login
   
    constructor(parentId, prevPage, addMovie) {
        this.#parentId = parentId;
        this.#prevPage = prevPage;
        this.#addMovie = addMovie;
        this.#buttons = [];
        this.#login = false;
    }

    fillData(movie, isInWatching, isInFavorite){
        this.#movieId = movie.id;
        document.getElementById('movie-details-place').style.display = 'flex';
        const genres = movie.genres.map(g => g.name);
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `<div class='${this.#parentId}-image'>
            <img src='${movie.poster_path == null ? './src/images/imageNA.png' : 'https://image.tmdb.org/t/p/w500' + movie.poster_path}'>
        </div>
        <div class='${this.#parentId}-container'>
            <h1 class='${this.#parentId}-title'>${movie.title}</h1>
            <div class='${this.#parentId}-genres'>${genres}</div>
            <div class='${this.#parentId}-release'>Release date: ${movie.release_date}</div>
            <div class='${this.#parentId}-rate-avg'>Average rating: ${movie.vote_average}</div>
            <div class='${this.#parentId}-overview'>Overview: ${movie.overview}</div>
        <div id='${this.#parentId}-btns'>
            <button class='${this.#parentId}-btn' id='${this.#parentId}-watchList-add' value ='watchList' ${this.#login ? '' : 'disabled'} ${isInWatching ? 'hidden' : ''}>Add to watching list</button>
            <button class='${this.#parentId}-btn' id='${this.#parentId}-watchList-remove' value ='watchList' ${isInWatching ? '' : 'hidden'}>Remove from watching list</button>
            <button class='${this.#parentId}-btn' id='${this.#parentId}-favList-add' value ='favList' ${this.#login ? '' : 'disabled'} ${isInFavorite ? 'hidden' : ''}>Add to favorites</button>
            <button class='${this.#parentId}-btn' id='${this.#parentId}-favList-remove' value ='favList' ${isInFavorite ? '' : 'hidden'}>Remove from favorites</button>
            <button class='${this.#parentId}-btn' value ='return'>Return to movies list</button>
        </div>
        </div>`;
        this.#buttons = document.getElementById(`${this.#parentId}-btns`).childNodes;
        this.#addListeners();
    }

    #addListeners() {
        this.#buttons.forEach((b) => b.addEventListener('click', this.#handler.bind(this, (b.value))));
    }

    #handler(value) {
        if (value == 'return') {
            document.getElementById(this.#parentId).style.display = 'none';
            document.getElementById(this.#prevPage).style.display = 'flex';
        } else {
            const addBtn = document.getElementById(`${this.#parentId}-${value}-add`);
            const removeBtn = document.getElementById(`${this.#parentId}-${value}-remove`);
            this.#addMovie(this.#userId, this.#movieId, value);
            addBtn.hidden ? addBtn.hidden = false : addBtn.hidden = true;
            removeBtn.hidden ? removeBtn.hidden = false : removeBtn.hidden = true;
        }
    }

    login(state, userId) {
        this.#login = state;
        this.#userId = userId;
    }

    logout(state) {
        this.#login = state;
    }
}
