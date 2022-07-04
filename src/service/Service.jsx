import Cookies from "js-cookie";

export default class Service {
  _keyAPI = `1600e251544c3774f2b2cb7b8f3a251a`;
  _baseUrlAPI = `https://api.themoviedb.org/3/`;

  _getResponse = async (url, option = {}) => {
    return await fetch(this._baseUrlAPI + url, option);
  };

  // Гостевая сессия
  getSession = async () => {
    const url = `authentication/guest_session/new?api_key=${this._keyAPI}`;
    const response = await this._getResponse(url);
    if (!response.ok) throw new Error("Authorization failed");
    const session = await response.json();
    return session.guest_session_id;
  };

  // Оцененные фильмы
  getMarkFilms = async (page = 1) => {
    const cookies = Cookies.get("guest_session_id");
    const response = await this._getResponse(
      `guest_session/${cookies}/rated/movies?api_key=${this._keyAPI}&language=en-US&sort_by=created_at.asc&page=${page}`
    );

    const markFilmsList = await response.json();

    let markFilms = markFilmsList.results;
    let totalPages = markFilmsList.total_pages;
    if (!response.ok) {
      markFilms = [];
      totalPages = page;
    }
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
    await this._getResponse(
      `movie/${filmId}/rating?api_key=${this._keyAPI}&guest_session_id=${cookies}`,
      body
    );
  };

  // Жанры
  getGenre = async () => {
    const url = `genre/movie/list?api_key=${this._keyAPI}&language=en-US`;
    let errorGenre = false;
    const response = await this._getResponse(url);

    if (!response.ok) {
      errorGenre = true;
    }
    const genre = await response.json();
    const genres = genre.genres;
    return { genres, errorGenre };
  };

  // Cписок фильмов
  getListFilms = async (query = "return", page = 1) => {
    const url = `search/movie?api_key=${this._keyAPI}&query=${query}&page=${page}`;
    let errorMovie = false;
    const response = await this._getResponse(url);
    if (!response.ok) {
      errorMovie = true;
    }
    const films = await response.json();

    const movies = films.results;
    const totalPages = films.total_pages;
    return { movies, totalPages, errorMovie };
  };
}
