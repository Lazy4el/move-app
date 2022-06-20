export default class MovieServis {
  _keyAPI = `1600e251544c3774f2b2cb7b8f3a251a`;
  _popularUrlAPI = `https://api.themoviedb.org/3/search/movie?api_key=${this._keyAPI}&language=en-US&include_adult=false`;
  t1_popularUrlAPI = `https://api.themoviedb.org/3/search/movie?api_key=${this._keyAPI}&language=en-US&page=1&include_adult=false`;
  test = `https://api.themoviedb.org/3/movie/popular?api_key=${this._keyAPI}&language=en-US&page=`;
  _genreUrlAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._keyAPI}&language=en-US`;

  // жанры
  getGenre = async () => {
    const res = await fetch(this._genreUrlAPI);
    const body = await res.json();
    return body.genres;
  };

  // список фильмов
  getListFilms = async (moveTitle = "return", page = 1) => {
    const movieList = await fetch(
      `${this._popularUrlAPI}&query=${moveTitle}&page=${page}`
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return result;
      })
      .catch(() => true);

    const error = movieList ? movieList : false;
    const movies = movieList.results;
    return { movies, error };
  };
}
