import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
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

const ProductCard = ({ className, product, idval, cardClick, faclose, ...rest }) => {
  const classes = useStyles();

  return (
    <div className="card is-collapsed" id={"gg" + idval} >
      <Card className="card__inner js-expander" {...rest} onClick={cardClick} id={idval}>
        <CardContent style={{ paddingBottom: '16px' }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={product.imageSrc}
              className="productCard-Image"
              alt="sampleImage"
            />
          </div>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
            style={{ paddingTop: "10px", color: "#1c4e80" }}
          >
            {product.title}
          </Typography>
        </CardContent>



        <Grid className={classes.statsItem} item>
          <ImageIcon className={classes.statsIcon} />
          <Typography
            color="textSecondary"
            display="inline"
            variant="body2"
            style={{ fontSize: "18px" }}
          >
            {product.totalImages} Images
            </Typography>
        </Grid>
        <Grid className={classes.statsItem} item style={{ paddingTop: "15px" }}>
          <Typography
            color="textSecondary"
            display="inline"
            variant="body2"
            style={{ fontSize: "23px", color: "#1c4e80" }}
          >
            Add Images
          </Typography>
        </Grid>
        <i class="fa fa-folder-o" style={{ margin: 'auto', fontSize: '30px', marginBottom: '10px' }}></i>


      </Card>
      <div class="card__expander">
        <i class="fa fa-close js-collapser" onClick={faclose}></i>
        Expander
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
