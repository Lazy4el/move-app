import React from "react";
import { Typography, Col, Image, Tag, Rate, Progress } from "antd";
import "./MoveItem.css";
import MovieServis from "../MovieServis/MovieServis";

import { format } from "date-fns";

const { Title } = Typography;

export default class MoveItem extends React.Component {
  movieServis = new MovieServis();

  /* Format date */
  dateFormat(date) {
    try {
      const result = new Date(date);
      return format(result, "MMMM dd, yyyy");
    } catch {
      return date;
    }
  }

  /* Format Text - Overview */
  overviewFormat(text) {
    if (text.length >= 180) {
      return text.split(" ").slice(0, 20).join(" ") + " ...";
    }
    return text;
  }

  hundleMark = async (mark) => {
    await this.movieServis.setMarkFilm(this.props.id, mark);
    return mark;
  };

  colorVoteAverage(average) {
    const red = "#e90000";
    const darkOrange = "#e97e00";
    const yellow = "#e9d100";
    const lime = "#66e900";
    return average > 7
      ? lime
      : average > 5
      ? yellow
      : average > 3
      ? darkOrange
      : red;
  }

  render() {
    const {
      title,
      releaseDate,
      posterPath,
      overview,
      rating,
      genre,
      voteAverage,
    } = this.props;

    const posterImg = posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png";
    return (
      <Col className="gutter-row" lg={12} md={24}>
        <div className="moveBox">
          <div className="moveImg-box">
            <Image className="moveImg" src={posterImg} />
          </div>

          <div className="moveTitle">
            <Title level={5}>{title}</Title>
            <Progress
              format={() => `${voteAverage}`}
              width={30}
              strokeColor={this.colorVoteAverage(voteAverage)}
              className={`voteAverage `}
              percent={100}
              type="circle"
            ></Progress>
          </div>
          <div className="moveDate">{this.dateFormat(releaseDate)}</div>
          <div className="moveTags">
            {genre.map((el) => {
              return (
                <Tag className="moveTagItem" key={el.id} color="default">
                  {el.name}
                </Tag>
              );
            })}
          </div>
          <div className="moveOverview">{this.overviewFormat(overview)}</div>
          <Rate
            key={rating}
            onChange={this.hundleMark}
            className="moveRate"
            count={10}
            allowHalf
            defaultValue={+rating}
          ></Rate>
        </div>
      </Col>
    );
  }
}
