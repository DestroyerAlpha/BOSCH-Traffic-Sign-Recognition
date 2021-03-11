import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Toolbar
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const Toolbars = ({ updateSearch }) => {
  return (
    <div >

      <Card style={{
        width: '60%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        margin: 'auto',
        marginTop: '20px'
      }}>
        <CardContent >

          <TextField
            style={{ width: '100%', margin: 'auto' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder="Search class"
            variant="outlined"
            onChange={updateSearch}
          />


        </CardContent>
      </Card>

    </div>

  );
};

Toolbars.propTypes = {
  className: PropTypes.string,
};

export default Toolbars;
