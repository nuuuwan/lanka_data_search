import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataSourceAvatar from "../atoms/DataSourceAvatar";
export default function DatasetDetailsView({ dataset }) {
  return (
    <Box>
      <DataSourceAvatar dataSource={dataset.source} />
      <Typography variant="caption">{dataset.subCategory}</Typography>
    </Box>
  );
}
