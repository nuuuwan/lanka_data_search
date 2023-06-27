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

      <Typography variant="body1" color="secondary">
        {dataset.latestValueFormatted}
        <span className="superscript">{dataset.maxT} (Latest)</span>
      </Typography>

      <Typography variant="body2">
        n={dataset.n} ({dataset.minT} to {dataset.maxT})
      </Typography>

      <Box>
        <Link href={dataset.dataURL} sx={{ fontSize: 8 }} target="_blank">
          <CloudDownloadIcon />
        </Link>
      </Box>
    </Paper>
  );
}
