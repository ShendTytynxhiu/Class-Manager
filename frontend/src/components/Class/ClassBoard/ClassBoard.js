import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Header from "./Header/Header";
import ClassBanner from "./ClassBanner";
import Chat from "./Chat/Chat";
import TestBoard from "./Test/TestBoard";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mdTheme = createTheme();

const images = [
  require("./Backgrounds/1.jpg"),
  require("./Backgrounds/2.jpg"),
  require("./Backgrounds/3.jpg"),
  require("./Backgrounds/4.jpg"),
  require("./Backgrounds/5.jpg"),
  require("./Backgrounds/6.jpg"),
  require("./Backgrounds/7.jpg"),
];

function ClassBoard(props) {
  const { id } = useParams();

  const [classDetail, setClassDetail] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let url = "http://127.0.0.1:8000/class-detail/" + id.toString() + "/";
    axios.get(url).then((res) => {
      setClassDetail(res.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  } else {
    const bannerDetails = {
      title: classDetail.subject.toString(),
      description:
        "Min Points: " +
        classDetail.min_points.toString() +
        "\n" +
        "Max Points: " +
        classDetail.max_points.toString(),
      image: images[Math.floor(Math.random() * images.length)],
      imageText: "main image description",
    };

    return (
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Header />

          <Container maxwidth="lg">
            <main>
              <ClassBanner banner={bannerDetails} />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TestBoard id={id} />
                </Grid>
                <Grid item xs={9}>
                  <Chat id={id} subject={classDetail.subject.toString()} />
                </Grid>
              </Grid>
            </main>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default ClassBoard;
