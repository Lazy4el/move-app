import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import MoveList from "../MoveList/MoveList";
import MoveHeader from "../MoveHeader/MoveHeader";

export default class App extends React.Component {
  render() {
    return (
      <Layout className="container">
        <MoveHeader></MoveHeader>
        <MoveList></MoveList>
      </Layout>
    );
  }
}
