import React from "react";
import { Input, Layout, Menu } from "antd";

import "./MoveHeader.css";
import _ from "lodash";
const { Header } = Layout;

export default class MoveHeader extends React.Component {
  hundleOnSearch = _.debounce((e) => {
    const value = e.target.value;
    if (value.trim().length) {
      this.props.searchMove(value);
    }
  }, 300);

  hundleMenu = (e) => {
    this.props.setMenuKey(e.key);
  };
  render() {
    const searchBarVisible =
      this.props.menuKeyBar === "1" ? (
        <Input
          onChange={this.hundleOnSearch}
          placeholder="Type to search..."
        ></Input>
      ) : null;
    return (
      <Header className="header">
        <Menu
          className="headerMenu"
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[this.props.menuKeyBar]}
          items={["Search", "Rated"].map((element, idx) => {
            const key = idx + 1;
            return {
              key,
              label: element,
              onClick: this.hundleMenu,
            };
          })}
        ></Menu>
        {searchBarVisible}
      </Header>
    );
  }
}
