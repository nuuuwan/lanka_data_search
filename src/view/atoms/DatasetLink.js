import React from "react";
import DataSourceAvatar from "./DataSourceAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

export default function DatasetLink({
  dataset,
  onChangeDatasetList,
  showDataSource,
}) {
  const onClick = function () {
    if (onChangeDatasetList === undefined) {
      return;
    }
    onChangeDatasetList([dataset]);
  };

  return (
    <ListItemButton onClick={onClick}>
      {showDataSource ? (
        <ListItemAvatar>
          <DataSourceAvatar dataSource={dataset.source} />
        </ListItemAvatar>
      ) : null}
      <ListItemText
        primary={dataset.subCategory}
        secondary={dataset.emojis}
      />
    </ListItemButton>
  );
}
