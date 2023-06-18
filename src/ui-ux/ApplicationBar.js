export default class ApplicationBar {
    #activeIndex
    #callbackFn
    #sectionElements
    #hiddenElements
    #buttons
    #watchingButton
    #favoriteButton

    constructor(parentId, sections, callbackFn, hiddenElements) {
        this.#callbackFn = callbackFn;
        this.#hiddenElements = hiddenElements;
        this.#fillButtons(parentId, sections.map(s => s.title));
        this.#setSectionElements(sections.map(s => s.id));
        this.#addListeners();
    }

    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
        this.#buttons = parentElement.childNodes;
        // this.#watchingButton = document.getElementById('watch-list');
        // this.#favoriteButton = document.getElementById('fav-list');
        // this.#watchingButton.hidden = true;
        // this.#favoriteButton.hidden = true;
    }

    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }

    #addListeners() {
        this.#buttons.forEach((btn, index) => {
            btn.addEventListener('click', this.#handler.bind(this, index))
        });
    }

    async #handler(index) {
        if (this.#activeIndex != undefined) {
            this.#buttons[this.#activeIndex].classList.remove('active');
            this.#sectionElements[this.#activeIndex].style.display = 'none';
        }
        this.#hiddenElements.forEach(elem => document.getElementById(elem).style.display = 'none');
        this.#buttons[index].classList.add('active');
        await this.#callbackFn(index);
        this.#sectionElements[index].style.display = 'flex';
        this.#activeIndex = index;
    }

    login() {
        this.#watchingButton.hidden = false;
        this.#favoriteButton.hidden = false;
    }

    logout() {
        this.#watchingButton.hidden = true;
        this.#favoriteButton.hidden = true;
    }
}
