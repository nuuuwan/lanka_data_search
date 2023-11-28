import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

import "./App.css";

import { defaults } from "chart.js";
const FONT_FAMILY = "Akshar";
const THEME = createTheme({
  palette: {
    primary: {
      main: "#800",
    },
    secondary: {
      main: "#f80",
    },
    info: {
      main: "#084",
    },
    warning: {
      main: "#f80",
    },
    error: {
      main: "#800",
    },
  },
  typography: {
    fontFamily: [FONT_FAMILY, "sans-serif"].join(","),
    fontSize: 14,
  },
});

defaults.font.family = FONT_FAMILY;

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
