import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ConfigRemoteDataView from "../organisms/ConfigRemoteDataView";
import Box from "@mui/material/Box";
export default function SearchResultView({ config }) {
  return (
    <Paper
      elevation={0}
      sx={{
        margin: 1,
        padding: 1,
        background: "#fcfcfc",
        borderRadius: 3,
        width: 400,
      }}
    >
      <Typography variant="h6">{config.subCategory}</Typography>
      <Typography variant="caption">{config.category}</Typography>

      <Typography variant="body1" color="secondary">
        {config.latestValueFormatted}
        <span class="superscript">{config.maxT} (Latest)</span>
      </Typography>

      <Typography variant="body2">{config.scaleAndUnitFormatted}</Typography>

      <ConfigRemoteDataView config={config} />

      <Typography variant="body2" color="secondary">
        n={config.n} ({config.minT} to {config.maxT})
      </Typography>
      <Typography variant="caption">Source: {config.source}</Typography>
      <Box>
        <Link href={config.dataURL} sx={{ fontSize: 8 }} target="_blank">
          <CloudDownloadIcon />
        </Link>
      </Box>
    </Paper>
  );
}
