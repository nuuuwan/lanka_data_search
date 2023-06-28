import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TopMenu from "../molecules/TopMenu";

export default function CustomAppBar({ datasetList, refChart }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lanka Data Search
        </Typography>

        <TopMenu datasetList={datasetList} refChart={refChart} />
      </Toolbar>
    </AppBar>
  );
}
