/* eslint-disable no-undef */
import React from "react";
import { Layout, Row, Pagination, Spin, Alert } from "antd";

import MoveItem from "../MoveItem/MoveItem";
import MovieServis from "../MovieServis/MovieServis";
import "./MoveList.css";

const { Content } = Layout;

export default class MoveList extends React.Component {
  movieServis = new MovieServis();
  state = {
    movies: null,
    genres: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.getMovies();
  }

  async getMovies(page = 1) {
    this.setState({ loading: true });
    const { movies, error } = await this.movieServis.getListFilms(page);
    const genres = await this.movieServis.getGenre();
    this.setState({ movies, genres, error, loading: false });
  }

  getPage = async (e) => {
    this.getMovies(e);
  };

  render() {
    const loadSpin = this.state.loading ? (
      <Spin className="loadSpiner" tip="Loading..."></Spin>
    ) : null;

    const content =
      !this.state.loading && this.state.error ? (
        <MoveView state={this.state} getPage={this.getPage}></MoveView>
      ) : null;

    const loadError =
      !this.state.loading && !this.state.error ? (
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
      ) : null;
    return (
      <Content className="mainContent">
        {loadSpin}
        {loadError}
        {content}
        <Pagination
          className="mainPagination"
          size="small"
          total={10000}
          pageSize={20}
          onChange={this.getPage}
        />
      </Content>
    );
  }
}

const MoveView = ({ state }) => {
  return (
    <React.Fragment>
      <Row gutter={[36, 36]}>
        {state.movies.map((element) => {
          const genre = element.genre_ids.map((genreId) => {
            return state.genres.find((el) => {
              return el.id === genreId;
            });
          });
          return (
            <MoveItem
              key={element.id}
              title={element.original_title}
              releaseDate={element.release_date}
              posterPath={element.poster_path}
              overview={element.overview}
              raiting={element.vote_average}
              genre={genre}
            ></MoveItem>
          );
        })}
      </Row>
    </React.Fragment>
  );
};
