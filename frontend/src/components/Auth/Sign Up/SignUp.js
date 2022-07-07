import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { userSignUp } from "../../../redux/Auth/auth.actions";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Class Manager | CN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function SignUp(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("username", userName);
    data.append("email", email);
    data.append("password", password);
    data.append("first_name", firstName);
    data.append("last_name", lastName);

    axios
      .post("http://127.0.0.1:8000/sign-up/", data)
      .then((res) =>
        props.userSignUp(
          res.data.username,
          res.data.email,
          res.data.id,
          res.data.Token,
          res.data.is_teacher
        )
      );
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_logged, setIs_logged] = useState(props.auth_token != "");

  if (is_logged || props.auth_token != "") {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(" + require("./Backgrounds/1.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  margin="normal"
                  name="firstName"
                  required
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                <TextField
                  margin="normal"
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={userName}
                onChange={handleUserNameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/sign-in/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
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

const mapDispatchToProps = (dispatch) => {
  return {
    userSignUp: (username, email, id, auth_token, is_teacher) =>
      dispatch(userSignUp(username, email, id, auth_token, is_teacher)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
