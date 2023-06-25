import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

import "./App.css";

import { defaults } from "chart.js";

const FONT_FAMILY = "Encode Sans";
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
