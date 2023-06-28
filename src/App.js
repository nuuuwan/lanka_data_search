import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

import "./App.css";

import { defaults } from "chart.js";
import VersionView from "./view/atoms/VersionView.js";

const FONT_FAMILY = "Livvic";
const THEME = createTheme({
  palette: {
    primary: {
      main: "#ccc",
    },
    secondary: {
      main: "#888",
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
    console.log(window.location);
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
        <VersionView />
      </ThemeProvider>
    );
  }
}
