import React, { Component } from "react";
import { FilePlus, Upload } from "react-feather";
import { FileDrop } from "react-file-drop";
import "./Drag.css";
import Button from "react-bootstrap/Button";
import AddAugs from "./AddAugs";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileNames: [],
      renderNo: 0,
    };
    this.fileInput = null;
  }
  onTargetClick = () => {
    this.fileInput.click();
  };

  onFileInputChange_Drag = (event) => {
    console.log(event);
    var arr = this.state.files;
    var arrNames = this.state.fileNames;
    var i = 0;
    for (i = 0; i < event.length; i++) {
      arr.push(event[i]);
      arrNames.push(event[i].name);
      console.log(event[i]);
    }

    this.setState({ files: arr, fileNames: arrNames });

    // do something with your files...
  };
  onFileInputChange_Select = (event) => {
    console.log("hiiiii in click");
    console.log(this.fileInput.files);
    var arr = this.state.files;
    var arrNames = this.state.fileNames;
    var i = 0;
    for (i = 0; i < this.fileInput.files.length; i++) {
      arr.push(this.fileInput.files[i]);
      arrNames.push(this.fileInput.files[i].name);
      console.log(this.fileInput.files[i]);
    }

    this.setState({ files: arr, fileNames: arrNames });

    // do something with your files...
  };
  setTextInputRef = (element) => {
    this.fileInput = element;
  };
  showFileNames = (item, key) => {
    return <li key={key}> {item}</li>;
  };

  uploadImages = () => {
    this.setState({ renderNo: 1 });
  };

  render() {
    if (this.state.renderNo === 0)
      return (
        <div style={{ width: "90%" }}>
          <div className="DragDrop-parent">
            <div style={{ borderStyle: "dashed", margin: "5px" }}>
              <input
                onChange={this.onFileInputChange_Select}
                ref={this.setTextInputRef}
                type="file"
                hidden
                multiple
                accept=".png, .jpg, .jpeg, .zip"
              />
              <FileDrop
                onTargetClick={this.onTargetClick}
                onDrop={this.onFileInputChange_Drag}
                className="DragDrop "
              >
                <div
                  className={
                    this.state.fileNames.length ? "DragDrop-Files" : ""
                  }
                >
                  <Upload className="DragDrop-UploadIcon" />
                  <div className="DragDrop-inside">
                    <Button className="DragBtnFiles">
                      <h5>
                        {" "}
                        <FilePlus /> Choose Files
                      </h5>
                    </Button>
                    <br />
                    or Drop Files Here
                    <h6 style={{ margin: "5px" }}>
                      {" "}
                      (Allowed Formats .zip .png .jpeg)
                    </h6>
                  </div>
                </div>

                <div
                  style={{
                    width: "20%",
                    display: this.state.fileNames.length
                      ? "inline-block"
                      : "none",
                  }}
                >
                  <ol>{this.state.fileNames.map(this.showFileNames)}</ol>
                </div>
              </FileDrop>
              <Button className="DragUploadBtn" onClick={this.uploadImages}>
                Upload
              </Button>
            </div>
          </div>
        </div>
      );
    else {
      return <AddAugs />;
    }
  }
}

export default index;
