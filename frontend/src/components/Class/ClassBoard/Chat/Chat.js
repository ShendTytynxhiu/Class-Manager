import React, { useEffect, useState } from "react";
import { client, w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import TextField from "@mui/material/TextField";

import Texts from "./Texts";

function Chat(props) {
  const [prev_messages, setPrev_Messages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(props.id);

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  client = new W3CWebSocket(
    "ws://127.0.0.1:8000/ws/chat/" + room.toString() + "/"
  );

  useEffect(() => {
    client.onopen = () => {
      console.log("Connected");
      client.send(
        JSON.stringify({
          type: "fetch_messages",
          room: room,
        })
      );
    };
  }, []);

  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    if (dataFromServer) {
      if (dataFromServer.command == "messages") {
        setPrev_Messages((prev_messages) => [
          ...prev_messages,
          ...dataFromServer.messages,
        ]);
      } else {
        setMessages((messages) => [
          ...messages,
          {
            id: dataFromServer.message.message.id,
            user: dataFromServer.message.message.user,
            content: dataFromServer.message.message.content,
            timestamp: dataFromServer.message.message.timestamp,
          },
        ]);
        window.location.reload();
      }
    }
  };

  const handleSubmit = (e) => {
    client.send(
      JSON.stringify({
        type: "new_message",
        message: message,
        room: room,
        user: props.user_id,
      })
    );
    e.preventDefault();
  };

  return (
    <Paper elevation={5}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
        p={3}
      >
        <Texts messages={prev_messages} title={props.subject} />

        <TextField
          label="Type Your Message Here..."
          onChange={handleMessageChange}
          value={message}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    user_id: state.auth.id,
  };
};

export default connect(mapStateToProps)(Chat);
