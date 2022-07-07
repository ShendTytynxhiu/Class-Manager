import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Header from "./Header";

import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";

const theme = createTheme();

function Dashboard(props) {
  useEffect(() => {
    if (!props.is_teacher) {
      axios
        .get(
          "http://127.0.0.1:8000/classes-filter?students=" + props.id.toString()
        )
        .then((res) => setClasses(res.data));
    } else {
      axios
        .get(
          "http://127.0.0.1:8000/classes-teacher-filter?teacher=" +
            props.id.toString()
        )
        .then((res) => setClasses(res.data));
    }
  }, []);

  const [classes, setClasses] = useState([]);

  const sections = [
    { title: "Technology", url: "#" },
    { title: "Design", url: "#" },
    { title: "Culture", url: "#" },
    { title: "Business", url: "#" },
    { title: "Politics", url: "#" },
    { title: "Opinion", url: "#" },
    { title: "Science", url: "#" },
    { title: "Health", url: "#" },
    { title: "Style", url: "#" },
    { title: "Travel", url: "#" },
  ];

  const images = [
    require("./Backgrounds/1.jpg"),
    require("./Backgrounds/2.jpg"),
    require("./Backgrounds/3.jpg"),
    require("./Backgrounds/4.jpg"),
    require("./Backgrounds/5.jpg"),
    require("./Backgrounds/6.jpg"),
    require("./Backgrounds/7.jpg"),
  ];

  const mainFeaturedPost = {
    title: props.username,
    description: props.email,
    image: images[Math.floor(Math.random() * images.length)],
    imageText: "main image description",
    linkText: "",
  };

  if (props.auth_token == "") {
    return <Navigate to="/sign-up/" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxwidth="lg">
        {/* Navbar */}
        <Header title="Classes" sections={sections} />
        <main>
          {/* Class Banners */}
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {classes.map((post) => (
              <FeaturedPost
                id={post.id}
                key={post.subject}
                post={post}
                image={images[Math.floor(Math.random() * images.length)]}
              />
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    auth_token: state.auth.auth_token,
    email: state.auth.email,
    username: state.auth.username,
    is_teacher: state.auth.is_teacher,
  };
};

export default connect(mapStateToProps)(Dashboard);
