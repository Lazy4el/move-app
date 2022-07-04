import React from "react";
import { Tag } from "antd";
import "./MoveGenres.css";
import { ServiceConsumer } from "../../service/ServicsProvider";

export default class MoveGenres extends React.Component {
  render() {
    const { genreArr } = this.props;
    return (
      <ServiceConsumer>
        {(genre) => {
          return (
            <div className="moveTags">
              {genreArr.map((genreFilm) => {
                const genteTag = genre.find((genreAllFilms) => {
                  return genreFilm === genreAllFilms.id;
                });
                return (
                  <Tag
                    className="moveTagItem"
                    key={genteTag.id}
                    color="default"
                  >
                    {genteTag.name}
                  </Tag>
                );
              })}
            </div>
          );
        }}
      </ServiceConsumer>
    );
  }
}
