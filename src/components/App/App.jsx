import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import MoveList from "../MoveList/MoveList";
import MoveHeader from "../MoveHeader/MoveHeader";
import MovieServis from "../MovieServis/MovieServis";

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
    this.getMovies(this.state.searchValue, this.state.page);
  }

  // По клику переключаем вкладки
  setMenuKey = (menuKeyBar) => {
    if (menuKeyBar === "2") {
      this.setState({ movies: [] });
    } else {
      this.getMovies("return", 1);
      this.setState({ page: 1 });
    }
    this.setState(() => {
      return { menuKeyBar };
    });
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

    const genres = await this.movieServis.getGenre();
    this.setState({ movies, genres, totalPages, error, loading: false });
  };

  getPage = async (page) => {
    this.getMovies(this.state.searchValue, page);
    this.setState({ page: page });
    return page;
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
