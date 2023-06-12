export default class MovieDetails {
    #parentElement
    #callbackFn
    #imageUrl
   
    constructor(parentId, imageUrl, callbackFn) {       
        this.#parentElement = document.getElementById(parentId);  
        this.#callbackFn = callbackFn;     
        this.#imageUrl = imageUrl;
    }

    fillDetails(movie){
        const detail = `
        <div class="details-image">
            <img src="${this.#imageUrl + movie.poster_path}">
        </div>
        <div class="details-container">
            <h1 class="details-title">${movie.title}</h1>
            <div class="details-release">Release date: ${movie.release_date}</div>
            <div class="details-rate-avg">Average rating: ${movie.vote_average}</div>
            <div class="details-overview">Overview: ${movie.overview}</div>
            <button class="hide-button">Close detailed information</button>
        </div>`;
        this.#parentElement.innerHTML = detail;
        document.querySelector(".hide-button").addEventListener('click', this.#callbackFn)
    }  
}
