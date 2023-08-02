import React from "react";
import DataSourceAvatar from "./DataSourceAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

export default function DatasetLink({ dataset, onChangeDatasetList }) {
  const dataSource = dataset.source;

  const onClick = function () {
    onChangeDatasetList([dataset]);
  };

  return (
    <ListItemButton onClick={onClick}>
      <ListItemAvatar>
        <DataSourceAvatar dataSource={dataSource} />
      </ListItemAvatar>
      <ListItemText
        primary={dataset.subCategory}
        secondary={dataset.lastUpdateTimeFormatted}
      />
    </ListItemButton>
  );
}
