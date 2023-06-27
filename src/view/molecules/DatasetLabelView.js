import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataSourceAvatar from "../atoms/DataSourceAvatar";
export default function DatasetDetailsView({ config }) {
  return (
    <Box>
      <DataSourceAvatar dataSource={config.source} />
      <Typography variant="caption">{config.subCategory}</Typography>
    </Box>
  );
}
