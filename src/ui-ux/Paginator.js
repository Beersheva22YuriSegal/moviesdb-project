export default class Paginator {
    #parentId;
    #activePage;
    #callbackFn;
    #buttons

    constructor(parentId) {
        this.#parentId = parentId;
    }

    fillData(page, totalPages, callbackFn) {
        this.#callbackFn = callbackFn;
        const parentElement = document.getElementById(this.#parentId);
        let i;
        if (page <= 5) {
            i = 1;
        } else if (page + 4 >= totalPages) {
            i = totalPages - 8;
        } else {
            i = page - 4;
        }
        let pageButtons = `<button class ='page-button' ${page == 1 ? 'disabled' : ''} value=${page - 1}>prev</button>`;
        pageButtons += `<button class='page-button' ${page == 1 ? 'disabled' : ''} value=1>On First</button>`;
        for (i; i <= totalPages && i <= page + 4; i++) {
            pageButtons += `<button class ='page-button' value='${i}' id='page-${i}'>${i == page ? `<b>${i}</b>` : i}</button>`;
        }
        pageButtons += `<button class ='page-button' ${page == totalPages ? 'disabled' : ''} value=${page + 1}>next</button>`;
        pageButtons += `<button class ='page-button' value=${totalPages}><b>Total pages: ${totalPages}</b></button>`;
        parentElement.innerHTML = pageButtons;
        this.#buttons = parentElement.childNodes;
        this.#activePage = document.getElementById(`page-${page}`);
        this.#activePage.classList.add('page-active');
        this.#addListeners();
    }
    #addListeners() {
        this.#buttons.forEach((btn) => {
            btn.addEventListener('click', this.#handler.bind(this, btn.value));
        });
    }
    async #handler(value) {
        this.#activePage.classList.remove('page-active');
        await this.#callbackFn(value);
    }
}