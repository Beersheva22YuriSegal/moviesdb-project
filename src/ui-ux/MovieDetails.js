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
        <img src="${this.#imageUrl + movie.poster_path}" class="details-image">
        <span class="details-title">${movie.overview}</span>
        <button class="hide-button">X</button>`;
        this.#parentElement.innerHTML = detail;
        document.querySelector(".hide-button").addEventListener('click', this.#callbackFn)
    }  
}
