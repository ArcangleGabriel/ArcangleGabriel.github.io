"use client";

// write me a controller that uses MUI elemenets to show cardinal directions that I can click as buttons
// and a text field that I can type in to send a message to the server

import React, { useState, useContext } from "react";
import Typewriter from "typewriter-effect";

// import MUI elements
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Divider,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { api } from "../helpers/api";

import { ControllerContext } from "../contexts/ControllerContext";

export default function Controller() {
  const [messages, setMessages] = useState(["Welcome to... the HUNT!<br>- The Silly Bards"]);
  const [query, setQuery] = useState("");
  const { locked, setLocked } = useContext(ControllerContext);

  // append a message to the messages array
  const appendMessage = (message) => {
    setMessages([...messages, message]);
  };

  // handle the change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const barClicked = (event) => {
    setLocked(true);
  };

  // handle the submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // send the query to the server
    api
      .post("/ai/ask", { query: query })
      .then((response) => {
        console.log(response.data);
        appendMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
        appendMessage(
          "There was an issue communicating with the server! Please try again later",
        );
      });

    // clear the query
    setQuery("");
  };

  return (
    <Stack
      sx={{
        flexBasis: "50%",
        marginTop: "10px",
        border: "1px solid gray",
        borderRadius: "5px",
        height: "70vh",
      }}
      direction="column"
      justifyContent={"space-between"}
      p={2}
    >
      {/* Write out all the messages using the typewritter */}
      <Box sx={{ overflowY: "scroll", display: "flex", flexDirection: "column-reverse"}}>
        {messages.map((single_message, index) => {
          return (
            <Stack
              key={index}
              sx={{ fontFamily: "Courier New" }}
              direction="column"
            >
              <Typewriter
                style={{
                  paddingRight: "10px",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(16)
                    .typeString(single_message)
                    .start()
                    .callFunction(() => {
                      console.log("String typed out!");
                    });
                }}
              />
              <Divider variant="middle" />
            </Stack>
          );
        }).reverse()}
      </Box>

      {/* Write out the text field and send button */}
      <Stack direction="row">
        <TextField
          sx={{ width: "100%" }}
          variant="filled"
          placeholder="Enter Answer"
          value={query}
          onChange={handleChange}
          onClick={barClicked}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
        ><SendIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
