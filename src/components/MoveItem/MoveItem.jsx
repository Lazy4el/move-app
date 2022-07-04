import React from "react";
import { Typography, Col, Image, Rate, Progress } from "antd";
import "./MoveItem.css";
import Service from "../../service/Service";
import MoveGenres from "../MoveGenres/MoveGenres";
import { badUrlImage } from "../constants/constants";
import {
  dateFormat,
  overviewFormat,
  colorVoteAverage,
} from "../helpers/helpers";

const { Title } = Typography;

export default class MoveItem extends React.Component {
  service = new Service();

  hundleMark = async (mark) => {
    await this.service.setMarkFilm(this.props.id, mark);
    return mark;
  };

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
      : badUrlImage;
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
              strokeColor={colorVoteAverage(voteAverage)}
              className={`voteAverage `}
              percent={100}
              type="circle"
            ></Progress>
          </div>
          <div className="moveDate">{dateFormat(releaseDate)}</div>
          <div className="moveTags">
            <MoveGenres genreArr={genre}></MoveGenres>
          </div>
          <div className="moveOverview">{overviewFormat(overview)}</div>
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
