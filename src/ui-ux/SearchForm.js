export default class SearchForm {
    #parentId;
    #selectElement;
    #obj;
    #search;
    #searchResult;

    constructor(parentId, search, searchResult) {
        this.#parentId = parentId;
        this.#obj = {};
        this.#search = search;
        this.#searchResult = searchResult;
    }

    fillData(genres) {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = 
            `<form class='${this.#parentId}-form-control' id='${this.#parentId}-form'>
                <label for ='${this.#parentId}-genres' class='input-label'>Genre: </label>
                <select id ='${this.#parentId}-genres' class='input-form' name='genre'></select>
                <label for ='year' class='input-label'>Year: </label>
                <input type ='number' class='input-form' id='year' placeholder='Year'>
                <button id = '${this.#parentId}-submit' type='submit' class='submit-btn'>Search</button></form>`;
        this.#selectElement = document.getElementById(`${this.#parentId}-genres`);
        this.#setOptions(genres);
        const formElement = document.getElementById(`${this.#parentId}-form`);
        formElement.onsubmit = async (event) => {
            event.preventDefault();
            this.#obj.genre = formElement.genre.value;
            this.#obj.year = formElement.year.value;
            document.getElementById(this.#parentId).style.display = 'none';
            document.getElementById(this.#searchResult).style.display = 'flex';
            this.#search();
        };
        }
    

    #setOptions(genres) {
        let gName = `<option value=''></option>`;
        gName += genres.map(g =>`<option value = '${g.id}'> ${g.name} </option> `).join('');
        this.#selectElement.innerHTML = gName;
    }

    getDataFromForm() {
        return this.#obj
    }
}