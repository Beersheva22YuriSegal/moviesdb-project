export default class AuthorizationForm {
    #type;
    #parentId;
    #callback
    #title

    constructor(parentId, type, callback, title) {
        this.#parentId = parentId;
        this.#type = type;
        this.#callback = callback;
        this.#title = title;

    }

    fillForm() {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML =
        `<form class='form-control' id ='${this.#parentId}-form'>
            <h3 class = 'page-title'>${this.#title}</h3>
            <input type = 'email' class = 'form-input' placeholder = 'Enter email' name = 'email' required>
            <input  type = 'password' class = 'form-input' placeholder = 'Enter password' name = 'password' required >
            <input  id = '${this.#parentId}-confirm' class = 'form-input' placeholder = 'Repeat password' 
                name ='confirm'   ${this.#type == 'register' ? 'required' : 'hidden'}>
            <div class= 'error-message' id='error-message' hidden>Confirm your password</div>
            <button id = '${this.#parentId}-submit' class = 'submit-button'> Submit</button>`

        const formElement = document.getElementById(`${this.#parentId}-form`);
        formElement.addEventListener('submit', b => {
            b.preventDefault();
            const formData = new FormData(formElement);
            if (document.getElementById(`${this.#parentId}-confirm`).hidden == false &&
                formData.get('confirm') != formData.get('password')) {
                document.getElementById('error-message').hidden = false;
                document.getElementById(`${this.#parentId}-confirm`).classList.add('error');

            } else {
                this.#callback(formData.get('email'), formData.get('password'));
                formElement.reset();
                document.getElementById('error-message').hidden = true;
                document.getElementById(`${this.#parentId}-confirm`).classList.remove('error');
            }
        })
    }
}