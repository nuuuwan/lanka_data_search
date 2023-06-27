import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Box from "@mui/material/Box";
import DataSourceLink from "../atoms/DataSourceLink";
export default function SearchResultView({ config }) {
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
      <DataSourceLink dataSource={config.source} />
      <Typography variant="subtitle1">{config.subCategory}</Typography>
      
      <Typography variant="body1" color="secondary">
        {config.latestValueFormatted}
        <span className="superscript">{config.maxT} (Latest)</span>
      </Typography>

      <Typography variant="body2">{config.scaleAndUnitFormatted}</Typography>

      <Typography variant="body2" color="secondary">
        n={config.n} ({config.minT} to {config.maxT})
      </Typography>

      <Box>
        <Link href={config.dataURL} sx={{ fontSize: 8 }} target="_blank">
          <CloudDownloadIcon />
        </Link>
      </Box>
    </Paper>
  );
}
