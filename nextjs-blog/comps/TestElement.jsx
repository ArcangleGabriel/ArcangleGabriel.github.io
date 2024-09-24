import React, { useState, useContext } from "react";

import {
  Button,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";

// axios
import { api } from "../helpers/api";
import axios from "axios";

// check and cross icons
import { Check, Close } from "@mui/icons-material";

// Question Mark icon
import HelpIcon from "@mui/icons-material/Help";

import { run_test } from "@/hooks/DroneHooks";
import { DroneContext } from "@/contexts/DroneContext";

export default function TestElement(props) {
  // default props for name, description, and image
  const [status, setStatus] = useState("unknown"); // ["unknown", "success", "failure", "running"]
  const [reason, setReason] = useState(""); // for error messages
  const { title = "Unknown", description = "----", index = 0 } = props;
  const { droneName } = useContext(DroneContext);

  // run test (call the backend as a post request async

  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const runTest = async () => {
    // set status to running
    setStatus("running");

    if (droneName == "") {
      setReason("No drone selected");
      setStatus("failure");
      return;
    }

    run_test(title, droneName);
    await delay(500);

    // send post request to backend
    try {
      const res = await api.post("http://localhost:5000/api/v1/run_test", {
        index: index,
      });
      // set status to success or failure
      if (res.status == 200) {
        setStatus("success");
      } else {
        setStatus("failure");
      }
    } catch (err) {
      console.log(err);
      setStatus("failure");
      setReason("Request failed: " + err.message);
      return;
    }
    setReason("No failure detected");
  };

  return (
    <Box
      sx={{ width: "100%", padding: "10px", mb: "8px" }}
      border={1}
      borderColor="primary.main"
      borderRadius={{ borderRadius: 3 }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Button onClick={runTest}>Run Test</Button>
        </Box>

        <Box>
          {status == "running" && (
            <Tooltip
              title="Running"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CircularProgress></CircularProgress>
            </Tooltip>
          )}
          {status == "success" && (
            <Tooltip title={"All checks out!"}>
              <Check color="success"></Check>
            </Tooltip>
          )}
          {status == "failure" && (
            <Tooltip title={reason}>
              <Close color="error"></Close>
            </Tooltip>
          )}
          {status == "unknown" && (
            <Tooltip title={"Results unknown"}>
              <HelpIcon></HelpIcon>
            </Tooltip>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
