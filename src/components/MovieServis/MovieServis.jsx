import Cookies from "js-cookie";

export default class MovieServis {
  _keyAPI = `1600e251544c3774f2b2cb7b8f3a251a`;
  _autorizteAPI = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=`;
  _popularUrlAPI = `https://api.themoviedb.org/3/search/movie?api_key=${this._keyAPI}&language=en-US&include_adult=false`;
  _genreUrlAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._keyAPI}&language=en-US`;

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

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filmId}/rating?api_key=${this._keyAPI}&guest_session_id=${cookies}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );
    if (!response.ok) throw new Error("Mark failed");
  };

  // Жанры
  getGenre = async () => {
    const response = await fetch(this._genreUrlAPI);
    if (!response.ok) throw new Error("Genres failed");
    const genre = await response.json();
    return genre.genres;
  };

  // Cписок фильмов
  getListFilms = async (moveTitle = "return", page = 1) => {
    const response = await fetch(
      `${this._popularUrlAPI}&query=${moveTitle}&page=${page}`
    );
    if (!response.ok) throw new Error("Filsm failed");
    const films = await response.json();
    const error = films ? films : false;
    const movies = films.results;
    const totalPages = films.total_pages;
    return { movies, totalPages, error };
  };
}
