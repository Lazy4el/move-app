import React from "react";
import { Input, Layout, Menu } from "antd";

import "./MoveHeader.css";
import _ from "lodash";

const { Header } = Layout;

export default class MoveHeader extends React.Component {
  hundleOnSearch = _.debounce((e) => {
    const value = e.target.value;
    if (value.trim().length) {
      console.log(e.target.value);
    }
  }, 300);

  render() {
    return (
      <Header className="header">
        <Menu
          className="headerMenu"
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={["Search", "Rated"].map((element, idx) => {
            const key = idx + 1;
            return {
              key,
              label: element,
            };
          })}
        ></Menu>
        <Input
          onChange={this.hundleOnSearch}
          placeholder="Type to search..."
        ></Input>
      </Header>
    );
  }
}
