export default class AuthorizationBar{
    #parentId;
    #buttons
    #callback
    #hiddenElements;

    constructor(parentId, callback, hiddenElements){
        this.#parentId = parentId
        this.#hiddenElements = hiddenElements;
        this.#callback = callback;
        this.#fillData(parentId);
    }

    #fillData(parentId){
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = `
        <div id='${parentId}-text' class='auth-text' hidden></div> 
        <button class='auth-button'>Login</button>
        <button class='auth-button'>Register</button>
        <button class='auth-button' hidden>Logout</button>`
        this.#buttons = parentElement.getElementsByClassName('auth-button');
        this.#addListeners();
    }

    #addListeners(){
      this.#buttons = Array.from(this.#buttons);
      this.#buttons.forEach((element, index) => {
            element.addEventListener('click', this.#handler.bind(this, index))
        })
    }

    async #handler(index){
        document.getElementById("authorization-place").style.display = 'flex';
        Array.from(this.#hiddenElements).forEach(el => document.getElementById(el).style.display = 'none')
       await this.#callback(index)
    }

    login(email){
        const textElement = document.getElementById(`${this.#parentId}-text`);
        textElement.textContent = `Welcome ${email}!`
        textElement.hidden = false;
        this.#buttons.map(b => b.hidden?b.hidden=false: b.hidden = true);
        document.getElementById("authorization-place").style.display = 'none';
    }

    logout(){
        const textElement = document.getElementById(`${this.#parentId}-text`);
        textElement.hidden = true;
        this.#buttons.map(b => b.hidden?b.hidden=false: b.hidden = true);
    }
}