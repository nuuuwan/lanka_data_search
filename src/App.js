import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

const FONT_FAMILY = "Zen Kaku Gothic New";
const THEME = createTheme({
  palette: {
    primary: {
      main: "#844",
    },
    secondary: {
      main: "#f80",
    },
    info: {
      main: "#082",
    },
  },
  typography: {
    fontFamily: [FONT_FAMILY, "sans-serif"].join(","),
    fontSize: 14,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
