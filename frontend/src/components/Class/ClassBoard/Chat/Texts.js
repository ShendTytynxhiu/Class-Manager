import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Grid from "@mui/material/Box";
import Box from "@mui/material/Box";
import Container from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "@mui/material/Avatar";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import {
  red,
  pink,
  purple,
  deepOrange,
  deepPurple,
  indigo,
} from "@mui/material/colors";

import "./texts.css";

function Texts(props) {
  const scrollBottomRef = useRef(null);

  const colors = [
    red["A400"],
    pink["400"],
    purple["400"],
    deepPurple["A400"],
    indigo["600"],
    deepOrange["600"],
  ];

  const avatars = [...new Set(props.messages.map((item) => item.user))];
  const shuffled_colors = colors.sort(() => 0.5 - Math.random());
  const selected_colors = shuffled_colors.slice(0, avatars.length);

  const avatar_colors = {};
  avatars.forEach((key, i) => (avatar_colors[key] = selected_colors[i]));

  const listChatMessages = props.messages.map((message, index) => (
    <ListItem key={index}>
      <ListItemIcon>
        <Avatar sx={{ bgcolor: avatar_colors[message.user] }}>
          {message.user.charAt(0).toUpperCase()}
        </Avatar>
      </ListItemIcon>
      <ListItemText primary={`${message.user}: ${message.content}`} />
    </ListItem>
  ));

  return (
    <Fragment>
      <Container>
        <Box p={1}>
          <Typography variant="h4" gutterBottom>
            {props.title}
          </Typography>
          <Divider />
          <Grid container spacing={4} alignItems="center">
            <Grid id="chat-window" xs={12} item>
              <List id="chat-window-messages">
                {listChatMessages}
                <ListItem ref={scrollBottomRef}></ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        {/* </Paper> */}
      </Container>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    user_id: state.auth.id,
  };
};

export default connect(mapStateToProps)(Texts);
