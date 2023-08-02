import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { COLOR_PAPER } from "../STYLE.js";
import DatasetLink from "../atoms/DatasetLink";
import Grid from "@mui/material/Grid";
import DownloadDatasetButton from "../atoms/DownloadDatasetButton";
import { getColor } from "../molecules/MultiLineChart.js";
export default function DatasetDetailsView({ dataset, i, n, showCustomColor }) {
  return (
    <Paper
      elevation={0}
      sx={{
        margin: 1,
        padding: 0,
        background: COLOR_PAPER,
        borderBottom: 1,
        borderWidth: 3,
        borderRadius: 3,
        borderColor: showCustomColor ? dataset.color : getColor(i, n),
        width: 300,
      }}
    >
      <DatasetLink dataset={dataset} showDataSource={true} />

      <Box sx={{ paddingLeft: 2 }}>
        {Object.entries(dataset.footnotes).map(function (entry) {
          let [k, v] = entry;
          if (!v) {
            return null;
          }
          if (k === "source_file") {
            k = "Source File";
          }
          return (
            <Box key={"footnote-" + k}>
              <Typography
                variant="caption"
                sx={{ color: "#ccc", fontSize: "60%" }}
              >
                {k}
              </Typography>
              <Typography variant="body2">{v}</Typography>
            </Box>
          );
        })}
      </Box>

      <Grid container justifyContent="flex-end">
        <DownloadDatasetButton dataset={dataset} />
      </Grid>
    </Paper>
  );
}
