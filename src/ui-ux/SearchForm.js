export default class SearchForm {
    #parentId;
    #selectElement;
    #obj;
    #search;
    #searchingResults;

    constructor(parentId, search, searchingResults) {
        this.#parentId = parentId;
        this.#obj = {};
        this.#search = search;
        this.#searchingResults = searchingResults;
    }

    fillData(genres) {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = 
        `<div class = '${this.#parentId}-title'></div> 
            <form class='${this.#parentId}-form-control' id='${this.#parentId}-form'>
                <label for ='genre' class='input-label'>Genre: </label>
                <select id ='${this.#parentId}-genres' class='input-form' name='genre'></select>
                <label for ='year' class='input-label'>Year: </label>
                <input type ='number' class='input-form' name='year' placeholder='Year'>
                <button id = '${this.#parentId}-submit' type='submit' class='submit-btn'>Search</button>`;
        //TODO
        }
    

    #setOptions(genres) {
        let gName = `<option value=''></option>`;
        gName += genres.map(g =>
            `<option value = '${g.id}'> ${g.name} </option> `).join('');
        this.#selectElement.innerHTML = gName;
    }

    getDataFromForm() {
        return this.#obj
    }
}