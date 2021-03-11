import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Toolbars from "./Toolbars";
import "./Data.css";
import ProductCard from "./ProductCard";
import dat from "./dat";
import Addclass from "./Addclass";
import Swal from 'sweetalert2'

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.addClasson = this.addClasson.bind(this);

  }

  updateSearch = (event) => {
    this.setState({ searchString: event.target.value });
  }
  addClasson = () => {
    Swal.fire({
      title: 'Enter parameters to add a class',
      html:
        'Class name: <input id="swal-input1" class="swal2-input">' +
        'Class Image: <input id="swal-input2" type="file" accept="image/*" class="swal2-file" style="display: flex;" placeholder="">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
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
          <Toolbars updateSearch={this.updateSearch} />
          <div className="cardcont">
            <Addclass addClasson={this.addClasson} />
            {
              searchSign.map((gg, i) => (
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
