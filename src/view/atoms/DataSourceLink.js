import React from "react";
import DataSourceAvatar from "./DataSourceAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function DataSourceLink({ dataSource }) {
  const onClick = function () {
    window.open(dataSource.url, "_blank");
  };
  return (
    <ListItemButton onClick={onClick} sx={{ padding: 0, margin: 0 }}>
      <ListItemIcon>
        <DataSourceAvatar dataSource={dataSource} />
      </ListItemIcon>
      <ListItemText
        primary={dataSource.name}
        secondary={dataSource.subSource}
      />
    </ListItemButton>
  );
}
