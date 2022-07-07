import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";

import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import Test from "./Test";

function TestBoard(props) {
  const [tests, setTests] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (props.is_teacher) {
      axios
        .get("http://127.0.0.1:8000/teacher-test-filter?_class=" + props.id)
        .then((res) => setTests(res.data));
    } else {
      axios
        .get("http://127.0.0.1:8000/student-test-filter?_class=" + props.id)
        .then((res) => setTests(res.data));
    }
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper elevation={5}>
      <Box sx={{ mt: 1 }} p={3}>
        <Box p={1}>
          <Typography variant="h4" gutterBottom>
            Tests!
          </Typography>
          <Divider />
          <Grid>
            {props.is_teacher ? (
              <Grid container alignItems="center">
                {tests.map((value, index) => (
                  <Grid key={index} xs={12} item container alignItems="center">
                    <Box sx={{ mt: 1 }}>
                      <Button
                        component={Link}
                        to={"/test-review/" + value.id}
                        aria-describedby={id}
                        variant="contained"
                      >
                        {value.title} Review
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container alignItems="center">
                {tests.map((value, index) => (
                  <Grid key={index} xs={12} item container alignItems="center">
                    <Box sx={{ mt: 1 }}>
                      <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                      >
                        {value.title}
                      </Button>
                    </Box>
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
                      <Test id={value.id} guide_lines={value.guide_lines} />
                    </Popover>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    is_teacher: state.auth.is_teacher,
    user_id: state.auth.id,
  };
};

export default connect(mapStateToProps)(TestBoard);
