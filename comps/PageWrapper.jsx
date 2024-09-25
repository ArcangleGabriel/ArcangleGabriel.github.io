// create a page wrapper that shows the nav bar and the page content
// it should also provide a theme provider for light and dark mode

import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, pink } from "@mui/material/colors";

import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

export default function PageWrapper(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ marginTop: "30px" }}>{props.children}</Box>
    </ThemeProvider>
  );
}
