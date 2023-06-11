export default class MoviesService {
  #baseUrl;
  #apiKey;
  #imageUrl;

  constructor(baseUrl, apiKey, imageUrl) {
    this.#baseUrl = baseUrl;
    this.#apiKey = apiKey;
    this.#imageUrl = imageUrl;
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
        "vote_average": movie.vote_average,
        "genre_ids": movie.genre_ids,
        "backdrop_path": this.#imageUrl + movie.backdrop_path,
      };
    });
  }

  async getMovie(id) {
    const response = await fetch(`${this.#baseUrl}${id}?language=en-US&api_key=${this.#apiKey}`)
    return await response.json();
  }

  async getGenres() {
    const response = await fetch(`${this.#baseUrl}genre/movie/list?language=en&api_key=${this.#apiKey}`);
    return await response.json();
  }

  getImagePath() {
    return this.#imageUrl;
  }
}
