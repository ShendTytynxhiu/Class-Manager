import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ClassBanner(props) {
  const { banner } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${banner.image})`,
        marginTop: "6rem",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />

      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            {props.is_teacher ? (
              <Grid>
                <Button
                  variant="contained"
                  style={{ position: "absolute", bottom: "10%", right: "-90%" }}
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  Create Test
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ mt: 1 }} p={6}>
                    <TextField
                      value={title}
                      onChange={(newValue) => {
                        setTitle(newValue);
                      }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Basic example"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Popover>
              </Grid>
            ) : null}

            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {banner.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {banner.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

ClassBanner.propTypes = {
  banner: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    is_teacher: state.auth.is_teacher,
  };
};

export default connect(mapStateToProps)(ClassBanner);
