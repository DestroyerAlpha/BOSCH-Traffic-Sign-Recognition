import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import "./Aug.css";
import { Trash2 } from "react-feather";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Checkbox from "@material-ui/core/Checkbox";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      augs: [],
      showInsert: false,
      currentAugVal: 0,
      augJson: [],
      var0: 0,
      error: "",
    };
  }
  deleteAug = (e) => {
    var key = e.key;
    console.log(key);
    var arr = this.state.augs;
    var arr = arr.slice(0, key).concat(arr.slice(key + 1));

    var arrJs = this.state.augJson;
    var arrJs = arrJs.slice(0, key).concat(arrJs.slice(key + 1));
    console.log(arrJs);
    this.setState({ augs: arr, augJson: arrJs });
  };
  listaugs = (item, key) => {
    return (
      <div className="augItem" key={key}>
        {item}
        <Button
          className="augItemDeleteBtn"
          onClick={() => {
            this.deleteAug({ key });
          }}
        >
          <Trash2 />
        </Button>
      </div>
    );
  };
  switchInsert = () => {
    this.setState({
      showInsert: !this.state.showInsert,
      currentAugVal: 0,
      var0: 0,
      var1: 0,
    });
  };
  augChange = (e) => {
    this.setState({ currentAugVal: e.target.value });
  };
  changeVar0 = (e) => {
    if (this.state.currentAugVal === 6) {
      if (e.target.checked) this.setState({ var0: 1 });
      else this.setState({ var0: 0 });
      return "1";
    }

    this.setState({ var0: e.target.textContent });
  };
  addAug = () => {
    var aug = {
      augmentationNumber: this.state.currentAugVal,
      var0: this.state.var0,
    };
    console.log(aug)
    var augs = this.state.augJson;
    var displayAugs = this.state.augs;

    switch (this.state.currentAugVal) {
      case 0:
        var display = "Max Crop Percentage ".concat(this.state.var0);
        break;
      case 1:
        var display = "Blur ".concat(this.state.var0);
        break;
      case 2:
        var display = "Scale ".concat(this.state.var0);
        break;
      case 3:
        var display = "Translate ".concat(this.state.var0);
        break;
      case 4:
        var display = "Shear ".concat(this.state.var0);
        break;
      case 5:
        var display = "Rotate ".concat(this.state.var0);
        break;
      case 6:
        var display = "Flip ".concat(this.state.var0);

        break;
      case 7:
        var display = "Linear Constrast ".concat(this.state.var0);
        break;
      default:
        var display = "";
        break;
    }
    displayAugs.push(display);
    //augs[this.state.currentAugVal] = aug;
    augs.push(aug);
    this.setState({ augJson: augs, augs: displayAugs });
    this.switchInsert();
  };
  showAugVars = () => {
    switch (this.state.currentAugVal) {
      case 0:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Max Crop Percentage</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={0.01}
                    marks
                    min={0}
                    max={0.2}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 1:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Blur</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={0.01}
                    marks
                    min={0}
                    max={0.5}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 2:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Scale</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={0.01}
                    marks
                    min={0}
                    max={0.2}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 3:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Translate</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={0.01}
                    marks
                    min={0}
                    max={0.2}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 4:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Shear</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={1}
                    marks
                    min={0}
                    max={20}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 5:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Rotate</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={1}
                    marks
                    min={0}
                    max={30}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 6:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle augSelectTitle_Check">
                    Flip
                  </div>
                </Col>
                <Col>
                  <Checkbox onChange={this.changeVar0} className="augCheck" />
                </Col>
              </Row>
            </Container>
          </div>
        );
      case 7:
        return (
          <div style={{ height: "200px" }}>
            <Container>
              <Row>
                <Col>
                  <div className="augSelectTitle">Linear Constrast</div>
                </Col>
                <Col>
                  <Slider
                    className="augSlider"
                    defaultValue={0}
                    valueLabelDisplay="auto"
                    onChange={this.changeVar0}
                    step={1}
                    marks
                    min={0}
                    max={20}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        );
      default:
        return <div>You are no one.</div>;
    }
  };
  clearError = () => {
    this.setState({ error: "" });
  };
  send = () => {
    let data = new FormData();

    console.log("lol1");
    for (let i = 0; i < this.props.images.length; i++) {
      console.log("this should work!");
      console.log(this.props.images[i].name);
      console.log( this.props.images[i]);
      data.append(this.props.images[i].name, this.props.images[i]);
    }
    data.append("augs", this.state.augJson);
    data.append("numImages", this.props.images.length);

    //this.props.close();
    // if (this.state.augJson.length !== 8) {
    //   this.setState({ error: "Insert All the Augementations" });
    //   setTimeout(this.clearError, 5000);
    //   return 0;
    // }
   
    fetch("http://127.0.0.1:8000/addImages/", {
      method: "POST",
      body: data,
    }).then((res) => {
      console.log(res);
      this.props.close();
      return 1;
    });
  };
  render() {
    if (!this.state.showInsert)
      return (
        <div style={{ width: "100%", height: "inherit" }}>
          <Container>
            <Row>
              <Col xs={9}>
                <div className="augList">
                  {this.state.augs.map(this.listaugs)}
                </div>
              </Col>
              <Col>
                <div className="AugBtns">
                  <Button className="AugBtn" onClick={this.switchInsert}>
                    INSERT
                  </Button>
                  <div className="error">{this.state.error}</div>

                  <div className="AugBtnNext-parent">
                    <Button className="AugBtn AugBtnNext" onClick={this.send}>
                      FINISH
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    else
      return (
        <div style={{ width: "100%", height: "inherit" }}>
          <Container>
            <Row>
              <Col xs={9}>
                <div className="AugSelect">
                  <Select
                    onChange={this.augChange}
                    className="selectMenu"
                    defaultValue={0}
                  >
                    <MenuItem value={0}>Max Crop Percentage</MenuItem>
                    <MenuItem value={1}>Blur</MenuItem>
                    <MenuItem value={2}>Scale</MenuItem>
                    <MenuItem value={3}>Translate</MenuItem>
                    <MenuItem value={4}>Shear</MenuItem>
                    <MenuItem value={5}>Rotate</MenuItem>
                    <MenuItem value={6}>Flip</MenuItem>
                    <MenuItem value={7}>Linear Constrast</MenuItem>
                  </Select>
                  <div>{this.showAugVars()}</div>
                </div>
              </Col>
              <Col>
                <div className="AugBtns">
                  <Button className="AugBtn" onClick={this.switchInsert}>
                    BACK
                  </Button>
                  <div className="AugBtnNext-parent-add">
                    <Button className="AugBtn AugBtnNext" onClick={this.addAug}>
                      ADD
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
}

export default index;
