import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { N_DATASET_LIST } from "../../nonview/core/DATASET_LIST";

export default function CustomAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lanka Data Search ({N_DATASET_LIST.toLocaleString()}{" "}
          <span style={{ fontSize: "75%" }}>Datasets</span>)
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
