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
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const Toolbar = ({ updateSearch }) => {
  return (
    <div >
      <Box mt={3}>
        <Card>
          <CardContent >
            <Box >
              <TextField
                style={{ width: '50%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search product"
                variant="outlined"
                onChange={updateSearch}
              />
              <Button color="primary" variant="contained" className="toolBar-Btn" >
                Add Class
              </Button>
            </Box>

          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
