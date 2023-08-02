import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DatasetUtils from "../../nonview/core/DatasetUtils";

export default function CustomAppBar({ allDatasetIdx }) {
  let renderedStats = null;
  if (allDatasetIdx) {
    const nData = DatasetUtils.getDatasetListLength(allDatasetIdx);
    renderedStats = (
      <span>
        ({nData.toLocaleString()} <span className="subscript">Datasets</span>)
      </span>
    );
  }

  const onClick = function () {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={onClick}
        >
          Lanka Data Search {renderedStats}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
