import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { userSignIn } from "../../../redux/Auth/auth.actions";

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

function SignIn(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("username", email);
    data.append("password", password);

    axios
      .post("http://127.0.0.1:8000/sign-in/", data)
      .then((res) =>
        props.userSignIn(
          res.data.user_username,
          res.data.user_email,
          res.data.user_id,
          res.data.token,
          res.data.is_teacher
        )
      )
      .then((val) => setIs_logged(true));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [is_logged, setIs_logged] = useState(props.auth_token != "");

  if (is_logged) {
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
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up/" variant="body2">
                    {"Don't have an account? Sign Up"}
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
    userSignIn: (username, email, id, auth_token, is_teacher) =>
      dispatch(userSignIn(username, email, id, auth_token, is_teacher)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
