import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Toolbars from "./Toolbars";
import "./Data.css";
import Predictcard from "./Predictcard";
import dat from "./modeldata";
import Swal from 'sweetalert2'
import './stylecss.scss'

class Predict extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            isFetching: true,
            users: []
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.predictImg = this.predictImg.bind(this);
        this.cardClick = this.cardClick.bind(this);
        this.faclose = this.faclose.bind(this);
    }
    faclose = () => {
        var cardset = document.querySelectorAll(".card");
        cardset.forEach((value) => {
            value.classList.remove("is-inactive");
            value.classList.remove("is-expanded");
            value.classList.add("is-collapsed")
        })
    }
    cardClick = (event) => {
        event.preventDefault();
        var cardset = document.querySelectorAll(".card");
        let id = event.currentTarget.id;
        var clickedcard = document.getElementById("gg" + id);

        if (clickedcard.classList.contains("is-expanded")) {
            clickedcard.classList.remove("is-expanded");
            clickedcard.classList.add("is-collapsed");
            cardset.forEach((value) => {
                value.classList.remove("is-inactive");
            })
        }
        else {
            cardset.forEach((value) => {
                value.classList.add("is-inactive");
                console.log(value.classList);
            })
            clickedcard.classList.remove("is-inactive");
            clickedcard.classList.remove("is-collapsed");

            clickedcard.classList.add("is-expanded");

        }



    }

    updateSearch = (event) => {
        this.setState({ searchString: event.target.value });
    }
    predictImg = (model_id) => {
        Swal.fire({
            title: 'Upload an image to predict',
            html:
                'Class Image: <input id="swal-input2" type="file" accept="image/*" class="swal2-file" style="display: flex;" placeholder="">',
            focusConfirm: false,
            preConfirm: () => {
                var requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pred_img: document.getElementById('swal-input2').value
                        , model_id: model_id
                    })
                };
                return fetch(
                    "http://localhost:8000/getPrediction", requestOptions
                )
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.Status) {
                    Swal.fire({
                        title: `<strong>Prediction:</strong>`,
                        icon: 'success',
                        html:
                            `<div style=text-align:start>` +
                            `The image belongs to class ${result.value.classname} <br/>` +
                            '</div>' +
                            `<img src=${result.value.classSrc}></img>`,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Great!',
                    })

                }
                else {
                    Swal.fire({
                        title: `<strong>Error</strong>`,
                        icon: 'error',
                        html:
                            `<div style=text-align:start>` +
                            `Something went wrong, try again` +
                            '</div>'
                    })
                }
            }
        })
    }
    componentDidMount() {
        fetch("http://localhost:8000/getModels")
            .then(response => response.json())
            .then(result => {
                this.setState({ users: result, isFetching: false })
            })
            .catch(e => {
                console.log(e);
                this.setState({ ...this.state, isFetching: false });
            });
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
        if (!(this.state.isFetching)) {
            const searchSign = this.state.users.filter(robot => {
                return String(robot.modelid).toLowerCase().includes(this.state.searchString.toLowerCase());
            })
            return (
                <div className="root">
                    <Container maxWidth={false}>
                        <Toolbars updateSearch={this.updateSearch} />
                        <div className="cards">
                            {
                                searchSign.map((gg, i) => (
                                    <Predictcard
                                        className="productCard"
                                        product={gg}
                                        key={i}
                                        idval={"cardid" + i}
                                        cardClick={this.cardClick}
                                        faclose={this.faclose}
                                        predictImg={this.predictImg}
                                    />
                                ))}
                        </div>
                    </Container>
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }
}

export default Predict;
