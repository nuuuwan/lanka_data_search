import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Box from "@mui/material/Box";
import DataSourceLink from "../atoms/DataSourceLink";
export default function DatasetDetailsView({ dataset }) {
  return (
    <Paper
      elevation={0}
      sx={{
        margin: 1,
        padding: 1,
        background: "#fcfcfc",
        borderRadius: 3,
        width: 300,
      }}
    >
      <DataSourceLink dataSource={dataset.source} />
      <Typography variant="subtitle1">{dataset.subCategory}</Typography>

      <Typography variant="body2" color="secondary">
        n={dataset.n} ({dataset.minTFormatted} to {dataset.maxTFormatted})
      </Typography>

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

      <Box>
        <Link href={dataset.dataURL} sx={{ fontSize: 8 }} target="_blank">
          <CloudDownloadIcon />
        </Link>
      </Box>
    </Paper>
  );
}
