import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { withStyles } from "@mui/styles";
import red from "@mui/material/colors/red";
import pink from "@mui/material/colors/pink";
import blue from "@mui/material/colors/blue";

var fileDownload = require("js-file-download");

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white",
  },
  input: {
    display: "none",
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center",
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  secondaryButton: {
    color: "gray",
    margin: 10,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "default",
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

function Test(props) {
  const downloadGuideLines = (url) => {
    axios
      .get("http://127.0.0.1:8000" + url, {
        responseType: "blob",
      })
      .then((res) => {
        let config_url = res.config.url.toString();
        fileDownload(res.data, config_url.substring(39, config_url.length));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadClick = (e) => {
    let data = new FormData();

    data.append("file", e.target.files[0]);
    data.append("test", props.id);
    data.append("student", props.user_id);

    axios.post("http://127.0.0.1:8000/worksheet/", data).then((res) => {
      return <Alert severity="success">Good Job!</Alert>;
    });

    e.preventDefault();
  };

  const { classes, theme } = props;

  return (
    <Paper elevation={5}>
      <Box sx={{ mt: 1 }} p={4}>
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <div>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Download Guide Lines Here:</Typography>
              <IconButton onClick={() => downloadGuideLines(props.guide_lines)}>
                <Fab component="span" className={classes.button}>
                  <FileDownloadIcon />
                </Fab>
              </IconButton>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <input
                accept=".doc, .docx, .pptx, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                  text/plain, application/pdf"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              <label htmlFor="contained-button-file">
                Upload Your .docx File Here( When Finished):
                <Fab component="span" className={classes.button}>
                  <AttachFileIcon />
                </Fab>
              </label>
            </Grid>
          </div>
        </Grid>
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.id,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(Test);
