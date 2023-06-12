export default class MoviesGrid {
    #thumbnails
    #callbackFn
    #activeIndex
    #sectionElement

    constructor(parentId, callbackFn) {
        this.#callbackFn = callbackFn;
        this.#sectionElement = document.getElementById("details-movie-section");
    }

    fillList(parentId, thumbData) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = thumbData.map(t =>
            `<li class="thumbnails-item" id="${t.id}">
                <div class="thumbnails-anchor">
                <img src="${t.backdrop_path}" class="thumbnails-image">
                <div class="thumbnails-title">${t.original_title}</div></div></li>`).join('');
                this.#thumbnails = parentElement.childNodes;
                this.#addListeners();
    }
    #addListeners() {
        this.#thumbnails.forEach((b) => 
        b.addEventListener('click', this.#handler.bind(this, b.id)))
    }

    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            if (this.#activeIndex != undefined) {
                this.#sectionElement.style.display = 'none';
            }
            await this.#callbackFn(index);
            this.#sectionElement.style.display = 'flex';
            document.getElementById("movies-container-place").style.display = 'none';
            this.#activeIndex = index;
        }
    }

    getActiveIndex() {
        return this.#activeIndex;
    }
}
