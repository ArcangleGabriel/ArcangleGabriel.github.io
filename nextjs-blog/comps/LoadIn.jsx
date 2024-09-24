import React from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";

import {
  Backdrop,
  Typography,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";

export default function LoadScreen(props) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={props.loading}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "50%" }}
      >
        {/* <Image
          src="/anduril_logo.svg"
          alt="Anduril Logo"
          width={200}
          height={100}
          sx={{ fill: "white" }}
          priority
        /> */}
        <Typography
          variant="h2"
          sx={{ fontFamily: "Courier New" }}
          padding="5px"
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .changeDelay(50)
                .pauseFor(500)
                .typeString("Room-To-Text: SP24-16")
                .pauseFor(1200)
                .start();
            }}
          />
        </Typography>
      </Stack>
    </Backdrop>
  );
}
