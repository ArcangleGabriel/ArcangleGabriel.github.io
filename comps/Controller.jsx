"use client";

// write me a controller that uses MUI elemenets to show cardinal directions that I can click as buttons
// and a text field that I can type in to send a message to the server

import React, { useState, useEffect, useContext } from "react";

import { ControllerContext } from "../contexts/ControllerContext";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

// import MUI elements
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Tooltip,
  ButtonGroup,
  LinearProgress,
  Alert,
  Divider,
} from "@mui/material";

import { DroneCommand } from "../helpers/DroneCommand";

// import MUI icons
import {
  ArrowUpward,
  ArrowDownward,
  ArrowLeft,
  ArrowRight,
  Home,
  CameraAltOutlined,
} from "@mui/icons-material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { api } from "../helpers/api";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";

import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { DroneContext } from "../contexts/DroneContext";

// The arrow keys should look like this:
//          ^
//        < 0 >
//          v
// They all need to be buttons


export default function Controller() {
  // state

  const [upIsActive, setUpIsActive] = useState(false);
  const [downIsActive, setDownIsActive] = useState(false);
  const [leftIsActive, setLeftIsActive] = useState(false);
  const [rightIsActive, setRightIsActive] = useState(false);
  const [wActive, setWActive] = useState(false);
  const [sActive, setSActive] = useState(false);
  const [aActive, setAActive] = useState(false);
  const [dActive, setDActive] = useState(false);
  const [xActive, setXActive] = useState(false);
  const [knobVal, setKnobVal2] = useState(0);

  const [speed, setSpeed] = useState("");
  const [degrees, setDegrees] = useState("");

  // get the context
  const { locked, setLocked } = useContext(ControllerContext);

  function setKnobVal(val) {
    setKnobVal2(val);
    DroneCommand(
      {
        command: "camera",
        speed: 10,
        degrees: val,
      },
      droneName,
    );
  }

  const allowedKeys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "w",
    "s",
    "a",
    "d",
    "x",
    "TakePhoto",
  ];

  const command_map = {
    ArrowUp: "forward",
    ArrowDown: "backward",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    s: "down",
    a: "rotate_left",
    d: "rotate_right",
    x: "stop",
    TakePhoto: "take_photo",
  };

  const on_key_down = {
    ArrowUp: () => setUpIsActive(true),
    ArrowDown: () => setDownIsActive(true),
    ArrowLeft: () => setLeftIsActive(true),
    ArrowRight: () => setRightIsActive(true),
    w: () => setWActive(true),
    s: () => setSActive(true),
    a: () => setAActive(true),
    d: () => setDActive(true),
    x: () => setXActive(true),
  };

  const on_key_up = {
    ArrowUp: () => setUpIsActive(false),
    ArrowDown: () => setDownIsActive(false),
    ArrowLeft: () => setLeftIsActive(false),
    ArrowRight: () => setRightIsActive(false),
    w: () => setWActive(false),
    s: () => setSActive(false),
    a: () => setAActive(false),
    d: () => setDActive(false),
    x: () => setXActive(false),
  };

  const handleClick = (event) => {
    if (!locked) {
      const command = command_map[event.currentTarget.id];
      DroneCommand(
        {
          command: command,
          speed: speed == "" ? 0 : speed,
          degrees: degrees == "" ? 0 : degrees,
        },
        droneName,
      );
    }
  };

  const handleKeyDown = (event) => {
    if (!locked) {
      if (on_key_down[event.key]) {
        on_key_down[event.key]();

        if (allowedKeys.includes(event.key)) {
          event.preventDefault();
        }

        const command = command_map[event.key];

        DroneCommand(
          {
            command: command,
            speed: speed == "" ? 0 : speed,
            degrees: degrees == "" ? 0 : degrees,
          },
          droneName,
        );
      }
    }
  };

  const handleKeyUp = (event) => {
    if (!locked) {
      if (on_key_up[event.key]) {
        on_key_up[event.key]();
      }
    }
  };

  const handleDegreesChange = (event) => {
    let val = parseInt(event.target.value);
    if (val == null || isNaN(val)) {
      val = 0;
    }
    setDegrees(val);
  };

  function handleSpeedChange(event) {
    let val = parseInt(event.target.value);
    if (val == null || isNaN(val)) {
      val = 0;
    }
    setSpeed(val);
  }

  // Attach the event listener when the component mounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [speed, degrees, locked]);

  // Attach the event listener when the component mounts
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [speed, degrees, locked]);

  function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  return (
    // Make the controller, with everything being a button
    <Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction="row">
          <Stack direction={"column"} flex={true} alignItems={"center"}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<RotateLeftIcon />}
                color={aActive ? "error" : "primary"}
                disabled={locked}
                onClick={handleClick}
                id="a"
              ></Button>
              <Button
                variant="outlined"
                startIcon={<ArrowUpward />}
                color={upIsActive ? "error" : "primary"}
                disabled={locked}
                onClick={handleClick}
                id="ArrowUp"
              ></Button>
              <Button
                variant="outlined"
                startIcon={<RotateRightIcon />}
                color={dActive ? "error" : "primary"}
                disabled={locked}
                onClick={handleClick}
                id="d"
              ></Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowLeft />}
                color={leftIsActive ? "error" : "primary"}
                disabled={locked}
                onClick={handleClick}
                id="ArrowLeft"
              ></Button>
              {!locked && (
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  disabled={locked}
                  onClick={() => {
                    DroneCommand(
                      { command: "home", speed: 0, degrees: 0 },
                      droneName,
                    );
                  }}
                ></Button>
              )}
              {locked && (
                <Tooltip title="The controller was locked. Click here to unlock">
                  <Button
                    variant="outlined"
                    startIcon={<LockIcon />}
                    onClick={() => setLocked(false)}
                  ></Button>
                </Tooltip>
              )}
              <Button
                variant="outlined"
                startIcon={<ArrowRight />}
                color={rightIsActive ? "error" : "primary"}
                disabled={locked}
                onClick={handleClick}
                id="ArrowRight"
              ></Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
              <Button
                variant="outlined"
                color={downIsActive ? "error" : "primary"}
                disabled={true}
              ></Button>
              <Button
                variant="outlined"
                startIcon={<ArrowDownward />}
                color={downIsActive ? "error" : "primary"}
                disabled={locked}
                onClick={handleClick}
                id="ArrowDown"
              ></Button>
              <Button
                variant="outlined"
                startIcon={<PhotoCameraIcon />}
                disabled={locked}
                onClick={handleClick}
                id="TakePhoto"
              ></Button>
            </Stack>
            <Stack direction="row" spacing={2}></Stack>
          </Stack>
          <Stack direction={"column"} alignItems={"center"} sx={{ ml: "20px" }}>
            <Typography variant="caption">Camera Orientation</Typography>
            <Stack direction="row">
              <Button
                startIcon={<AddIcon />}
                onClick={() => setKnobVal(clamp(knobVal + 10, 0, 100))}
              ></Button>
              <Button
                startIcon={<RemoveIcon />}
                onClick={() => setKnobVal(clamp(knobVal - 10, 0, 100))}
              ></Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"column"} justifyContent={"space-between"}>
          <Button
            startIcon={<ArrowUpward />}
            color={wActive ? "error" : "primary"}
            disabled={locked}
            onClick={handleClick}
            id="w"
          ></Button>
          <Button
            startIcon={<ArrowDownward />}
            color={sActive ? "error" : "primary"}
            disabled={locked}
            onClick={handleClick}
            id="s"
          ></Button>
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <ButtonGroup sx={{ mt: "8px" }}>
          <Button
            variant={"contained"}
            disabled={locked}
            onClick={() => {
              DroneCommand(
                { command: "teleop", speed: 0, degrees: 0 },
                droneName,
              );
            }}
          >
            Teleop
          </Button>
          <Button
            variant={"contained"}
            disabled={locked}
            onClick={() => {
              DroneCommand(
                { command: "auto", speed: 0, degrees: 0 },
                droneName,
              );
            }}
          >
            Auto
          </Button>
        </ButtonGroup>
        <Box>
          <TextField
            sx={{ width: "100px", margin: "5px" }}
            label="Degrees"
            value={degrees}
            onChange={handleDegreesChange}
            variant="filled"
            disabled={locked}
          ></TextField>
          <TextField
            sx={{ width: "80px", margin: "5px" }}
            label="Speed"
            value={speed}
            onChange={handleSpeedChange}
            variant="filled"
            disabled={locked}
          ></TextField>
        </Box>
      </Stack>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: "10px" }}
        onClick={() => {
          DroneCommand({ command: "stop", speed: 0, degrees: 0 }, droneName);
        }}
      >
        Emergency Stop
      </Button>
      <Button
        variant="contained"
        color="warning"
        sx={{ mt: "10px" }}
        onClick={() => {
          DroneCommand({ command: "reboot", speed: 0, degrees: 0 }, droneName);
        }}
      >
        Reboot
      </Button>
    </Stack>
  );
}
