const ACTIVE = 'active';
export default class MoviesGrid {
    // #parentId
    #thumbnails
    #callbackFn
    #activeIndex
    #sectionElement
    #parentElement

    constructor(parentId, callbackFn) {
        // this.#parentId = parentId;
        // this.#fillList(parentId);
        this.#callbackFn = callbackFn;
        this.#sectionElement = document.getElementById("details-movie-section");
    }

    fillList(parentId, thumbData) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = thumbData.map(t =>
            `<li class="thumbnails-item" id="${t.id}">
                <a href='#' class="thumbnails-anchor">
                <img src="${t.backdrop_path}" class="thumbnails-image">
                <div class="thumbnails-title">${t.original_title}</div></a></li>`).join('');
                this.#thumbnails = parentElement.childNodes;
                this.#addListeners();
    }
    #addListeners() {
        this.#thumbnails.forEach((b, index) => 
        b.addEventListener('click', this.#handler.bind(this, b.id)))
    }

    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            if (this.#activeIndex != undefined) {
                this.#thumbnails[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElement.hidden = true;
            }
            await this.#callbackFn(index);
            this.#sectionElement.style.display = 'flex';
            document.getElementById("movies-container-place").style.display = 'none';
            this.#thumbnails[index].classList.add(ACTIVE);
            this.#activeIndex = index;
        }
    }

    getActiveIndex() {
        return this.#activeIndex;
    }
}