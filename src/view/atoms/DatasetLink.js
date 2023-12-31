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
      window.open(dataset.dataURL);
    } else {
      onChangeDatasetList([dataset]);
    }
  };

  return (
    <ListItemButton onClick={onClick}>
      {showDataSource ? (
        <ListItemAvatar>
          <DataSourceAvatar dataSource={dataset.source} />
        </ListItemAvatar>
      ) : null}
      <ListItemText
        primary={dataset.detailedLabelWithEmojis}
        secondary={"Updated " + dataset.lastUpdateTimeFormatted}
      />
    </ListItemButton>
  );
}
