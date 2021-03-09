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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width:'270px',
    margin:'auto'
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent stylr={{ paddingBottom: '16px' }}>
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
        >
          {product.title}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <ImageIcon className={classes.statsIcon} color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
              style={{ fontSize: "12px" }}
            >
              {product.totalImages} Images
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button
              color="primary"
              variant="contained"
              className="productCard-Btn"
            >
              {" "}
              Add Images
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
