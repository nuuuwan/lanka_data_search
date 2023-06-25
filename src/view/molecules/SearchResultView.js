import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import ConfigRemoteDataView from "../organisms/ConfigRemoteDataView";
export default function SearchResultView({ config }) {
  return (
    <Paper
      elevation={0}
      sx={{
        margin: 1,
        padding: 1,
        background: "linear-gradient(45deg, #fefefe 30%, #fff 90%)",
      }}
    >
      <Typography variant="caption">{config.category}</Typography>
      <Typography variant="subtitle1">{config.subCategory}</Typography>
      <Typography variant="body2" color="secondary">
        {config.n} data points
      </Typography>
      <Typography variant="body1">
        {config.minT} to {config.maxT}
      </Typography>

      <Typography variant="body2">
        <AlarmOnIcon sx={{ fontSize: 10 }} /> {config.latestValueFormatted} (
        {config.maxT})
      </Typography>

      <ConfigRemoteDataView config={config} />
      <Link href={config.dataURL} sx={{ fontSize: 8 }} target="_blank">
        <CloudDownloadIcon />
      </Link>
    </Paper>
  );
}
