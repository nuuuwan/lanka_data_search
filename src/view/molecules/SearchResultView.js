import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

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
      <Typography variant="subtitle1" color="primary">
        {config.subCategory}
      </Typography>
      <Typography variant="body1">
        {config.minT} to {config.maxT}
      </Typography>
      <Typography variant="body2" color="secondary">
        {config.n} data points
      </Typography>
      <Link href={config.dataURL} sx={{ fontSize: 8 }}>
        Raw Data
      </Link>
    </Paper>
  );
}
