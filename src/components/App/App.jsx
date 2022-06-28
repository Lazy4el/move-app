import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import MoveList from "../MoveList/MoveList";
import MoveHeader from "../MoveHeader/MoveHeader";
import MovieServis from "../MovieServis/MovieServis";
import Cookies from "js-cookie";

export default class App extends React.Component {
  movieServis = new MovieServis();

  state = {
    searchValue: "return",
    menuKeyBar: "1",
    movies: [],
    genres: null,
    loading: true,
    error: false,
    totalPages: 1,
    page: 1,
  };

  componentDidMount() {
    this.setCookie().then(() => {
      this.getMovies(this.state.searchValue, this.state.page);
    });
  }

  // Записывем в куки
  setCookie = async () => {
    if (!Cookies.get("guest_session_id")) {
      const sessionId = await this.movieServis.getSession();
      Cookies.set("guest_session_id", sessionId);
    }
  };

  // По клику переключаем вкладки
  setMenuKey = async (menuKeyBar) => {
    this.setState({ loading: true });
    if (menuKeyBar === "2") {
      const { markFilms, totalPages } = await this.movieServis.getMarkFilms();
      this.setState(() => {
        return { movies: [...markFilms], totalPages };
      });
    } else {
      this.getMovies("return", 1);
    }

    this.setState({ page: 1, loading: false, menuKeyBar });
  };

  // Поиск
  searchMove = (value) => {
    this.setState({ searchValue: value, page: 1 });
    this.getMovies(value, 1);
  };

  getMovies = async (
    value = this.state.searchValue,
    page = this.state.page
  ) => {
    this.setState({ loading: true });
    const { movies, error, totalPages } = await this.movieServis.getListFilms(
      value,
      page
    );

    const markFilms = await this._getAllMarkFilms();
    const newMoves = movies.map((movie) => {
      const fidnMark = markFilms.find((markFilm) => {
        if (markFilm.id === movie.id) {
          return markFilm;
        }
      });

      return fidnMark ? fidnMark : movie;
    });
    const genres = await this.movieServis.getGenre();
    this.setState({
      movies: newMoves,
      genres,
      totalPages,
      error,
      loading: false,
    });
  };

  // Пагинация
  getPage = async (page) => {
    this.setState({ loading: true });

    if (this.state.menuKeyBar === "1") {
      await this.getMovies(this.state.searchValue, page);
    }
    if (this.state.menuKeyBar === "2") {
      const { markFilms, totalPages } = await this.movieServis.getMarkFilms(
        page
      );

      this.setState({ movies: markFilms, totalPages });
    }

    this.setState({ loading: false, page });
    return page;
  };

  _getAllMarkFilms = async () => {
    const { markFilms, totalPages } = await this.movieServis.getMarkFilms(1);
    const results = [...markFilms];
    for (let i = 2; i === totalPages; i++) {
      const { markFilms } = await this.movieServis.getMarkFilms(i);
      results.push(...markFilms);
    }
    return results;
  };

  // ошибка
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  render() {
    return (
      <Layout className="container">
        <MoveHeader
          searchMove={this.searchMove}
          menuKeyBar={this.state.menuKeyBar}
          setMenuKey={this.setMenuKey}
        ></MoveHeader>
        <MoveList
          paramFilms={this.state}
          getMovies={this.getMovies}
          getPage={this.getPage}
        ></MoveList>
      </Layout>
    );
  }
}
