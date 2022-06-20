import React from "react";
import { Typography, Col, Image, Tag, Rate } from "antd";
import "./MoveItem.css";

import { format } from "date-fns";

const { Title } = Typography;

export default class MoveItem extends React.Component {
  state = {
    title: null,
  };
  constructor(props) {
    super(props);
    this.setate = { title: null };
  }

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
      return text.split(" ").slice(0, 30).join(" ") + " ...";
    }
    return text;
  }

  render() {
    const { title, releaseDate, posterPath, overview, raiting, genre } =
      this.props;
    const posterImg = posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : "https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png";
    return (
      <Col className="gutter-row" span={12}>
        <div className="moveBox">
          <div className="moveImg">
            <Image width={180} height={280} src={posterImg} />
          </div>
          <div className="moveDescription">
            <div className="moveTitle">
              <Title level={5}>{title}</Title>
              <div className="moveRaiting">
                <span>{raiting}</span>
              </div>
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
              className="moveRate"
              count={10}
              allowHalf
              defaultValue={0}
            ></Rate>
          </div>
        </div>
      </Col>
    );
  }
}
