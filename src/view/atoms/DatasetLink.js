import React from "react";
import DataSourceAvatar from "./DataSourceAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function DatasetLink({ dataset, onChangeDatasetList }) {
  const dataSource = dataset.source;

  const onClick = function () {
    onChangeDatasetList([dataset]);
  };

  return (
    <ListItemButton onClick={onClick} sx={{ margin: 0, padding: 0 }}>
      <ListItemIcon>
        <DataSourceAvatar dataSource={dataSource} />
      </ListItemIcon>
      <ListItemText
        primary={dataset.subCategory}
        secondary={dataset.lastUpdateTimeFormatted}
      />
    </ListItemButton>
  );
}
