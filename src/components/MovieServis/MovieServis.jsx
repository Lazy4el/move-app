import Cookies from "js-cookie";

export default class MovieServis {
  _keyAPI = `1600e251544c3774f2b2cb7b8f3a251a`;
  _baseUrlAPI = `https://api.themoviedb.org/3/`;
  _autorizteAPI = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=`;
  _genreUrlAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._keyAPI}&language=en-US`;

  _getResponse = async (url, option = {}) => {
    return await fetch(this._baseUrlAPI + url, option);
  };

  // Гостевая сессия
  getSession = async () => {
    const response = await fetch(this._autorizteAPI + this._keyAPI);
    if (!response.ok) throw new Error("Authorization failed");
    const session = await response.json();
    return session.guest_session_id;
  };

  // Оцененные фильмы
  getMarkFilms = async (page = 1) => {
    const cookies = Cookies.get("guest_session_id");
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${cookies}/rated/movies?api_key=${this._keyAPI}&language=en-US&sort_by=created_at.asc&page=${page}`
    );
    if (!response.ok) throw new Error("Mark failed");
    const markFilmsList = await response.json();
    const markFilms = markFilmsList.results;
    const totalPages = markFilmsList.total_pages;
    return { markFilms, totalPages };
  };

  // Оценка фильма
  setMarkFilm = async (filmId, mark) => {
    const cookies = Cookies.get("guest_session_id");
    const requestBody = JSON.stringify({ value: mark });
    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    };
    this._getResponse(
      `movie/${filmId}/rating?api_key=${this._keyAPI}&guest_session_id=${cookies}`,
      body
    );
  };

  // Жанры
  getGenre = async () => {
    const response = await fetch(this._genreUrlAPI);
    const genre = await response.json();
    return genre.genres;
  };

  // Cписок фильмов
  getListFilms = async (query = "return", page = 1) => {
    const url = `search/movie?api_key=${this._keyAPI}&query=${query}&page=${page}`;
    let error = false;
    const response = await this._getResponse(url);
    if (!response.ok) {
      error = true;
    }
    const films = await response.json();

    const movies = films.results;
    const totalPages = films.total_pages;
    return { movies, totalPages, error };
  };
}
