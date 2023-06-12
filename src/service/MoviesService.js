export default class MoviesService {
  #baseUrl;
  #imageUrl;
  #genresUrl;
  #searchUrl;
  #apiKey;

  constructor(baseUrl, apiKey, imageUrl, searchUrl, genresUrl) {
    this.#baseUrl = baseUrl;
    this.#imageUrl = imageUrl;
    this.#genresUrl = genresUrl
    this.#searchUrl = searchUrl;
    this.#apiKey = apiKey;
  }

  #getUrl(sortType) {
    return `${this.#baseUrl}${sortType}?language=en-US&page=1&api_key=${this.#apiKey}`
  }

  async getSortedMovies(sortType) {
    const response = await fetch(this.#getUrl(sortType));
    const data = await response.json();
    return data.results.map(movie => {
      return {
        "id": movie.id,
        "original_title": movie.original_title,
        "backdrop_path": this.#imageUrl + movie.backdrop_path,
        "genre_ids": movie.genre_ids,
      };
    });
  }

  async getMovie(id) {
    const response = await fetch(`${this.#baseUrl}${id}?language=en-US&api_key=${this.#apiKey}`)
    return response.json();
  }

  // https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=2c46288716a18fb7aadcc2a801f3fc6b
  async getGenres() {
    const response = await fetch(`${this.#genresUrl}&api_key=${this.#apiKey}`)
    const res = await response.json();
    console.log(res);
    return res;
  }

  async searchMovies(){
    //TODO
}

  getImagePath() {
    return this.#imageUrl;
  }
}
