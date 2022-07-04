import MoveItem from "../MoveItem/MoveItem";
import React from "react";
import { Row, Pagination } from "antd";
import "./MoveView.css";

class MoveView extends React.Component {
  state = {
    page: 1,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.state.page) {
      this.props.getPage(this.state.page);
    }
  }

  hundlePage = (e) => {
    this.setState(() => {
      return { page: e };
    });
  };

  render() {
    const { movies, page, totalPages } = this.props;
    return (
      <React.Fragment>
        <Row gutter={[36, 36]}>
          {movies.map((element) => {
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
                genre={element.genre_ids}
              ></MoveItem>
            );
          })}
        </Row>
        <Pagination
          showSizeChanger={false}
          className="mainPagination"
          total={totalPages}
          defaultPageSize={1}
          defaultCurrent={page}
          onChange={this.hundlePage}
        />
      </React.Fragment>
    );
  }
}

export default MoveView;
