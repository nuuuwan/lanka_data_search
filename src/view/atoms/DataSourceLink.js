import React from "react";
import DataSourceAvatar from "./DataSourceAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

export default function DataSourceLink({ dataSource }) {
  const onClick = function () {
    window.open(dataSource.url, "_blank");
  };
  return (
    <ListItemButton onClick={onClick}>
      <ListItemAvatar>
        <DataSourceAvatar dataSource={dataSource} />
      </ListItemAvatar>
      <ListItemText
        primary={dataSource.name}
        secondary={dataSource.subSource}
      />
    </ListItemButton>
  );
}
