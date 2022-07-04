import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import MoveList from "../MoveList/MoveList";
import MoveHeader from "../MoveHeader/MoveHeader";
import Service from "../../service/Service";
import Cookies from "js-cookie";
import { ServiceProvider } from "../../service/ServicsProvider";

export default class App extends React.Component {
  service = new Service();

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
    const loaded = this.service
      .getSession()
      .then((sessionId) => {
        this.setCookie(sessionId);
      })
      .then(() => {
        this.getMovies().then((movies) => {
          this.getGenres().then(({ genres, errorGenre }) => {
            const { totalPages, errorMovie } = movies;
            this.setState({
              totalPages,
              loading: false,
              genres,
              error: !!errorMovie || !!errorGenre,
            });
          });
        });
      });
  }

  // Записывем в куки
  setCookie = (sessionId) => {
    if (!Cookies.get("guest_session_id")) {
      Cookies.set("guest_session_id", sessionId);
    }
  };

  // По клику переключаем вкладки
  setMenuKey = async (menuKeyBar) => {
    this.setState({ loading: true, menuKeyBar: menuKeyBar });
    if (menuKeyBar === "2") {
      const { markFilms, totalPages } = await this.service.getMarkFilms();
      this.setState(() => {
        return { movies: [...markFilms], totalPages };
      });
    } else {
      this.getMovies(this.state.searchValue, 1);
    }
    this.setState({ page: 1, loading: false, menuKeyBar });
  };

  // Поиск
  searchMove = async (value = this.state.searchValue) => {
    this.setState(() => {
      return { searchValue: value, page: 1 };
    });
    await this.getMovies(value, 1).then(() => {
      this.setState(() => {
        return { loading: false };
      });
    });
  };

  // Фильмы
  getMovies = async (
    value = this.state.searchValue,
    page = this.state.page
  ) => {
    this.setState({ loading: true });
    const { movies, errorMovie, totalPages } = await this.service.getListFilms(
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

    this.setState({
      movies: newMoves,
      totalPages,
      error: errorMovie,
    });
    return { errorMovie, totalPages };
  };

  // Жанры
  getGenres = async () => {
    const { genres, errorGenre } = await this.service.getGenre();
    return { genres, errorGenre };
  };

  // Пагинация
  getPage = async (page) => {
    this.setState(() => {
      return { loading: true, page: page };
    });

    if (this.state.menuKeyBar === "1") {
      await this.getMovies(this.state.searchValue, page);
    }
    if (this.state.menuKeyBar === "2") {
      const { markFilms, totalPages } = await this.service.getMarkFilms(page);

      this.setState({ movies: markFilms, totalPages });
    }

    this.setState({ loading: false });
    return page;
  };

  _getAllMarkFilms = async () => {
    const { markFilms, totalPages } = await this.service.getMarkFilms(1);
    if (!markFilms) {
      return [];
    }
    const results = [...markFilms];
    for (let i = 2; i === totalPages; i++) {
      const { markFilms } = await this.service.getMarkFilms(i);
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
          searchValue={this.state.searchValue}
          searchMove={this.searchMove}
          menuKeyBar={this.state.menuKeyBar}
          setMenuKey={this.setMenuKey}
        ></MoveHeader>
        <ServiceProvider value={this.state.genres}>
          <MoveList
            paramFilms={this.state}
            getMovies={this.getMovies}
            getPage={this.getPage}
          ></MoveList>
        </ServiceProvider>
      </Layout>
    );
  }
}
