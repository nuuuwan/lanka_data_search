import * as React from "react";
import Paper from "@mui/material/Paper";

export default function CustomBottomNavigator({ datasetList, refChart }) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    ></Paper>
  );
}
