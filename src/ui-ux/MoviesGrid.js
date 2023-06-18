export default class MoviesGrid {
    #moviesContainer;
    #callbackFn;
    #movieElements;
    #parentId;
    #movieElementId;

    constructor(parentId, movieElementId, callbackFn) {
        this.#movieElementId = movieElementId;
        this.#parentId = parentId;
        this.#buildMoviePlace(movieElementId);
        this.#movieElements = [];
        this.#callbackFn = callbackFn;
    }

    #buildMoviePlace(parentId) {
        this.#moviesContainer = document.getElementById(parentId);
    }

    fillData(movies) {
        this.#moviesContainer.innerHTML = movies.map((m) => this.#addMovie(m)).join('');
        const parentElement = document.getElementById(this.#movieElementId)
        this.#movieElements = parentElement.childNodes;
        this.#addListener();
    }


    #addListener() {
        this.#movieElements.forEach((element) => {
            element.addEventListener('click', this.#handler.bind(this, element.id))
        });
    }

    async #handler(index) {
        document.getElementById(this.#parentId).style.display = 'none';
        this.#callbackFn(index);
    }

    #addMovie(movie) {
        return `<div id='${movie.id}' class='movie-element'>
                    <img src = ${movie.poster_path == null ? './src/images/imageNA.png': 'https://image.tmdb.org/t/p/w500' + movie.poster_path} class = 'movie-element-img'>
                    <div class ='movie-element-title'>${movie.title}</div>
                </div>`
    }
}
