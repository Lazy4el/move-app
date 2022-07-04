import React from "react";
import { Layout, Spin, Alert, Result } from "antd";

import "./MoveList.css";
import MoveView from "../MoveView/MoveView";

const { Content } = Layout;

export default class MoveList extends React.Component {
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
      !loading && !error && movies.length ? (
        <MoveView
          movies={movies}
          genres={genres}
          page={page}
          totalPages={totalPages}
          getPage={this.props.getPage}
        ></MoveView>
      ) : null;

    const loadError =
      !loading && error ? (
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
