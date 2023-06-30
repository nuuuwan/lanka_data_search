import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dataset from "../../nonview/core/Dataset";

export default function CustomAppBar({ allDatasetIdx }) {
  let renderedStats = null;
  if (allDatasetIdx) {
    const nData = Dataset.getDatasetListLength(allDatasetIdx);
    renderedStats = (
      <span>
        ({nData.toLocaleString()} <span className="subscript">Datasets</span>)
      </span>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lanka Data Search {renderedStats}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
