import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TopMenu from "../molecules/TopMenu";
import DataSourceMenuButton from "../atoms/DataSourceMenuButton";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";

export default function CustomAppBar({ datasetList, refChart }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lanka Data Search
        </Typography>

        {DATA_SOURCE_LIST.map(function (dataSource) {
          return (
            <DataSourceMenuButton
              key={"data-source-menu-item-" + dataSource.id}
              dataSource={dataSource}
            />
          );
        })}
        <TopMenu datasetList={datasetList} refChart={refChart} />
      </Toolbar>
    </AppBar>
  );
}
