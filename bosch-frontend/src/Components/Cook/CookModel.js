import React, { Component } from "react";
import Swal from 'sweetalert2'
import 'react-popper-tooltip/dist/styles.css';
import "./CookModel.css"
import Reveal from "react-reveal/Reveal";
import Fade from "react-reveal/Fade";

class CookModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            epochs: 5,
            depth: 11,
            training_percent: 40,
            testing_percent: 40,
            pooltype: 'none',
            kernelsize: 1,
            padding: 1,
            strides: 1


        };
        this.setdepth = this.setdepth.bind(this);
        // this.setepoch = this.setepoch.bind(this);
        this.setpool = this.setpool.bind(this);
        // this.setstride = this.setstride.bind(this);
        this.setpaddding = this.setpaddding.bind(this);
        this.setkernel = this.setkernel.bind(this);
        this.starttrain = this.starttrain.bind(this);

    }
    setdepth = () => {
        Swal.fire({
            title: 'Set Depth',
            icon: 'question',
            input: 'select',
            inputOptions: {
                fifty: '50',
                oneoone: '101',
                onefivetwo: '152'
            },
            inputPlaceholder: 'Select one',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === 'fifty' || value === 'oneoone' || value === 'onefivetwo') {
                        resolve()
                    } else {
                        resolve('You need to select one!')
                    }
                })
            },
            preConfirm: (str) => {

                this.setState({ pooltype: str })


            }
        })
    }


    setpool = () => {
        Swal.fire({
            title: 'Set Pooling type',
            icon: 'question',
            input: 'select',
            inputOptions: {
                none: 'none',
                average: 'average',
                maximum: 'maximum'
            },
            inputPlaceholder: 'Select one',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === 'none' || value === 'average' || value === 'maximum') {
                        resolve()
                    } else {
                        resolve('You need to select one!')
                    }
                })
            },
            preConfirm: (str) => {

                this.setState({ pooltype: str })


            }
        })
    }

    setstride = () => {
        Swal.fire({
            title: 'Set stride',
            input: 'range',
            icon: 'question',
            inputLabel: 'Select a value between 1-3',
            inputAttributes: {
                min: 1,
                max: 3,
                step: 1
            },
            inputValue: 1,
            showCancelButton: true,
            preConfirm: (str) => {
                var n = Math.floor(Number(str));
                this.setState({ kernelsize: n })


            }
        })
    }
    setkernel = () => {
        Swal.fire({
            title: 'Set Kernel size',
            input: 'range',
            icon: 'question',
            inputLabel: 'Select a value between 1-7 (odd number)',
            inputAttributes: {
                min: 1,
                max: 7,
                step: 2
            },
            inputValue: 1,
            showCancelButton: true,
            preConfirm: (str) => {
                var n = Math.floor(Number(str));
                this.setState({ kernelsize: n })


            }
        })
    }

    setpaddding = () => {
        Swal.fire({
            title: 'Set padding',
            input: 'range',
            icon: 'question',
            inputLabel: 'Select a value between 1-3',
            inputAttributes: {
                min: 1,
                max: 3,
                step: 1
            },
            inputValue: 1,
            showCancelButton: true,
            preConfirm: (str) => {
                var n = Math.floor(Number(str));
                this.setState({ padding: n })


            }
        })
    }

    setepoch = () => {
        Swal.fire({
            title: 'Set epoch',
            input: 'range',
            icon: 'question',
            inputLabel: 'Select a value between 1-10',
            inputAttributes: {
                min: 1,
                max: 10,
                step: 1
            },
            inputValue: 5,
            showCancelButton: true,
            preConfirm: (str) => {
                var n = Math.floor(Number(str));
                this.setState({ epochs: n })


            }
        })
    }

    starttrain = () => {
        Swal.mixin({

            input: 'range',
            inputAttributes: {
                min: 0,
                max: 100,
                step: 0.1
            },
            inputValue: 30,
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Final steps',
                text: 'Choose percentage of images for training.'
            },
            {
                title: 'Final steps',
                text: 'Choose percentage of images for testing.'
            },
        ]).then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value)
                Swal.fire({
                    title: 'All done!',
                    html: `
                  Your answers:
                  <pre><code>${answers}</code></pre>
                `,
                    confirmButtonText: 'Lovely!'
                })
            }
        })
    }



    render() {


        return (
            <div>
                <div className="adm">
                    <div className="firstline">
                        <div className="cerq" onClick={this.setdepth}>
                            <div className="cerqtext">Set Depth</div>
                        </div>

                        <div className="cerq" onClick={this.setepoch}>
                            <div className="cerqtext">Set Epochs</div>
                        </div>
                    </div>
                    <div className="secondline">
                        <div className="cerq" onClick={this.setpool}>
                            <div className="cerqtext">Set pooling type</div>
                        </div>
                        <div className="cerqadm" onClick={this.starttrain} >
                            <div className="admtext">Train!</div>
                        </div>
                        <div className="cerq" onClick={this.setstride}>
                            <div className="cerqtext">Set stride</div>

                        </div>


                    </div>
                    <div className="thirdline">
                        <div className="cerq" onClick={this.setpaddding}>
                            <div className="cerqtext">Set padding</div>
                        </div>
                        <div className="cerq" onClick={this.setkernel}>
                            <div className="cerqtext">Set Kernel Size</div>
                        </div></div>
                </div >
                <div className="infcard">
                    <div className="infcardchild">
                        <Fade top><h2 style={{ textAlign: 'center' }}>Brief Info on Parameters</h2></Fade>
                        <ul>
                            <Fade left> <li><b>Padding</b>: Padding is a term relevant to convolutional neural networks as it refers to the number of pixels added to an image when it is being processed by the kernel of a CNN. For example, if the padding in a CNN is set to zero, then every pixel value that is added will be of value zero</li></Fade>
                            <Fade left>  <li><b>Kernel:</b> The kernel size here refers to the width x height of the filter mask. The max-pooling layer, for example, returns the pixel with maximum value from a set of pixels within a mask (kernel). That kernel is swept across the input, subsampling it.</li></Fade>
                            <Fade left>  <li><b>Stride:</b> Stride is a parameter of the neural network's filter that modifies the amount of movement over the image or video. For example, if a neural network's stride is set to 1, the filter will move one pixel, or unit, at a time.</li></Fade>
                            <Fade left> <li><b>Epoch:</b> An epoch is a term used in machine learning and indicates the number of passes of the entire training dataset the machine learning algorithm has completed. If the batch size is the whole training dataset then the number of epochs is the number of iterations.</li></Fade>
                            <Fade left><li><b>Depth:</b> In Deep Neural Networks the depth refers to how deep the network is but in this context, the depth is used for visual recognition, and it translates to the 3rd dimension of an image. The neural network should be able to learn based on these parameters as depth translates to the different channels of the training images.</li></Fade>
                            <Fade left><li><b>Pooling:</b> Pooling layers are used to reduce the dimensions of the feature maps. Thus, it reduces the number of parameters to learn and the amount of computation performed in the network. The pooling layer summarizes the features present in a region of the feature map generated by a convolution layer. It is another building block of a CNN. The pooling layer operates on each feature map independently. The most common approach used in pooling is max pooling. </li></Fade>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

export default CookModel;
