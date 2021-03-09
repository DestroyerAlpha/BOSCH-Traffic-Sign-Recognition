import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Toolbar from "./Toolbar";
import "./Data.css";
import ProductCard from "./ProductCard";
import dat from "./dat";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch = (event) => {
    this.setState({ searchString: event.target.value });
  }
  /*
    componentDidMount() {
      var r = new WebSocket("ws://websocket.example.com");
      r.onopen = function (event) {
        r.send("Some message"); // Sends data to server.
      };
      r.onmessage = function (event) {
        var message = event.data;
        console.log(message);
      };
    }*/
  render() {

    const searchSign = dat.filter(robot => {
      return robot.title.toLowerCase().includes(this.state.searchString.toLowerCase());
    })
    return (
      <div className="root">
        <Container maxWidth={false}>
          <Toolbar updateSearch={this.updateSearch} />
          <div className="cardcont">
            {
              searchSign.map((gg,i) => (
                <ProductCard
                  className="productCard"
                  product={gg}
                  key={i}
                />
              ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Data;
