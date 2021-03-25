import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "./progressbar";
import clsx from "clsx";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from '@reactchartjs/react-chart.js'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import "./Data.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: '270px',
    height: '290px',
    margin: 'auto'
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
    margin: 'auto'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    color: "#ea6a67"
  },
}));

const Predictcard = ({ className, product, idval, cardClick, faclose, ...rest }) => {
  const classes = useStyles();
  const data = {
    labels: ['1', '2', '3', '4'],
    datasets: [
      {
        label: '% Accuracy',
        data: product.epoch_accuracy,
        fill: false,
        backgroundColor: 'rgb(0, 0, 204)',
        borderColor: 'rgba(51, 153, 255, 0.6)',

      },
    ],
  }
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <div className="card is-collapsed" id={"gg" + idval} >
      <Card className="card__inner js-expander" {...rest} onClick={cardClick} id={idval}>
        <CardContent style={{ paddingBottom: '16px' }}>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
            style={{ paddingTop: "10px", color: "#1c4e80" }}
          >
            Model id: {product.modelid}
          </Typography>
        </CardContent>

        <Grid className={classes.statsItem} >
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h6"
            style={{ paddingTop: "3px", color: "#1c4e80" }}
          >
            Percentage of images used:
          </Typography>
        </Grid>
        <Grid className={classes.statsItem} >
          For training:  <br />
        </Grid>
        <Grid className={classes.statsItem} item style={{ width: '90%' }}>
          <ProgressBar key={12} bgcolor={'#ea6a47'} completed={product.training_percent} />

        </Grid>
        <Grid className={classes.statsItem} >
          For validation set: <br />
        </Grid>
        <Grid className={classes.statsItem} item style={{ width: '90%' }}>
          <ProgressBar key={12} bgcolor={'#ea6a47'} completed={product.validation_percent} />

        </Grid>
        <Grid className={classes.statsItem} item style={{ paddingTop: "15px" }}>
          <Typography
            color="textSecondary"
            display="inline"
            variant="body2"
            style={{ fontSize: "23px", color: "#1c4e80" }}
          >
            Check stats
          </Typography>
        </Grid>
        <i class="fa fa-folder-o" style={{ margin: 'auto', fontSize: '30px', marginBottom: '10px' }}></i>


      </Card>
      <div class="card__expanders">
        <i class="fa fa-close js-collapser" onClick={faclose}></i>
        <div className="innerexp">
          <div className="train_param">
            Parameters used for training:
            <div className="homeinfo">
              <div className="info">
                <div className="tallinfo">
                  Epochs:<br />
                  {product.epochs}
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  Strides:<br />
                  {product.stride}
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  Depth:<br />
                  {product.depth}
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  Kernel size:<br />
                  {product.kernel_size}
                </div>
                <br />
              </div>

              <div className="info">
                <div className="tallinfo">
                  Pooling type:<br />
                  {product.pooling_type}
                </div>
                <br />
              </div>
              <div className="info">
                <div className="tallinfo">
                  Padding:<br />
                  {product.padding}
                </div>
                <br />
              </div>
            </div>
          </div>
          <div className="train_metrics">
            Post training metrics:
            <div className="for-progress">
              <CircularProgressbar value={50} text={`${50}%`} className="progressbar1" />
              <CircularProgressbar value={60} text={`${60}%`} className="progressbar2" />
            </div>
            <div className="for-progress2">
              <div>Training accuracy</div>
              <div>Validation accuracy</div>
            </div>
            <div className="homeinfo" style={{ margin: 'auto', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '50' }}>
              <div className="info">
                <div className="tallinfo" style={{ fontSize: '1.3em' }}>
                  F1-score: {product.f1_score}
                </div>
                <br />
              </div>
              <div className="info">
                <div className="tallinfo" style={{ fontSize: '1.3em' }}>
                  Precision: {product.precision}
                </div>
                <br />
              </div>
              <div className="info">
                <div className="tallinfo" style={{ fontSize: '1.3em' }}>
                  Recall: {product.recall}
                </div>
                <br />
              </div>
            </div>
            <div style={{ padding: '10px', marginTop: '10px' }}> Epoch vs Accuracy plot:</div>
            <Line data={data} options={options} />
            <button className="btngg">Predict using this model</button>
          </div>
        </div>
      </div>
    </div >
  );
};

Predictcard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default Predictcard;
