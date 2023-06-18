export default class MoviesService {
  #baseUrl;
  #genresUrl;
  #searchUrl;
  #jsonUrl;
  #apiKey;

  constructor(baseUrl, genresUrl, searchUrl, jsonUrl, apiKey) {
    this.#baseUrl = baseUrl;
    this.#genresUrl = genresUrl;
    this.#searchUrl = searchUrl;
    this.#jsonUrl = jsonUrl;
    this.#apiKey = apiKey;
  }

  async getMovies(sortType, page) {
    const response = await fetch(this.#baseUrl + sortType + page + this.#apiKey);
    return response.json();
  }

  async getMovie(id) {
    const response = await fetch(this.#baseUrl + id + "?language=en-US" + this.#apiKey);
    return response.json()
  }

  async getGenres() {
    const response = await fetch(`${this.#genresUrl}${this.#apiKey}`)
    return response.json();
  }

  async searchMovies(obj, page) {
    const fields = `page=${page}${obj.year != '' ? `&primary_release_year=${obj.year}` : ''}${obj.genre != '' ? `&with_genres=${obj.genre}` : ''}&sort_by=popularity.desc${this.#apiKey}`;
    const response = await fetch(`${this.#searchUrl}${fields}`);
    return response.json();
  }

  async createUser(mail, pass) {
    const user = { mail, pass, 'watchList': [], 'favList': [] };
    const response = await fetch(this.#jsonUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return await response.json();
  }

  async getMoviesFromUserList(listName, id) {
    const user = await this.getUserById(id);
    return user[listName]
  }

  async getUser(email, password) {
    const response = await fetch(`${this.#jsonUrl}?email=${email}&password=${password}`)
    return response.json()
  }

  async getUserById(id) {
    const response = await fetch(`${this.#jsonUrl}/${id}`)
    return response.json()
  }

  async updateUserMovies(id, movieId, listName) {
    const user = await this.getUserById(id);
    let moviesList = user[listName];
    moviesList.includes(movieId) ? moviesList.splice(moviesList.indexOf(movieId), 1) : moviesList.push(movieId);
    const response = await fetch(`${this.#jsonUrl}/${user.id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    return await response.json();
  }

}
