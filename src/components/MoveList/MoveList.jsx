/* eslint-disable no-undef */
import React from "react";
import { Layout, Row, Pagination, Spin, Alert, Result } from "antd";

import "./MoveList.css";
import MoveItem from "../MoveItem/MoveItem";

const { Content } = Layout;

export default class MoveList extends React.Component {
  getPage = this.props.getPage;
  render() {
    const { genres, error, loading, movies, page, totalPages } =
      this.props.paramFilms;

    const loadSpin = loading ? (
      <Spin className="loadSpiner" tip="Loading..."></Spin>
    ) : null;

    const emptyMovies =
      !movies.length && !loading ? (
        <Result status="warning" title="Nothing found."></Result>
      ) : null;
    const content =
      !loading && error && movies.length ? (
        <MoveView
          movies={movies}
          genres={genres}
          page={page}
          totalPages={totalPages}
          getPage={this.getPage}
        ></MoveView>
      ) : null;

    const loadError =
      !loading && !error ? (
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
        />
      ) : null;
    return (
      <Content className="mainContent">
        {emptyMovies}
        {loadSpin}
        {loadError}
        {content}
      </Content>
    );
  }
}

const MoveView = ({ movies, genres, totalPages, page, getPage }) => {
  return (
    <React.Fragment>
      <Row gutter={[36, 36]}>
        {movies.map((element) => {
          const genre = element.genre_ids.map((genreId) => {
            return genres.find((el) => {
              return el.id === genreId;
            });
          });
          return (
            <MoveItem
              key={element.id}
              id={element.id}
              title={element.original_title}
              releaseDate={element.release_date}
              posterPath={element.poster_path}
              overview={element.overview}
              voteAverage={element.vote_average}
              rating={element.rating}
              genre={genre}
            ></MoveItem>
          );
        })}
      </Row>
      <Pagination
        showSizeChanger={false}
        className="mainPagination"
        total={totalPages}
        defaultCurrent={page}
        onChange={getPage}
      />
    </React.Fragment>
  );
};
