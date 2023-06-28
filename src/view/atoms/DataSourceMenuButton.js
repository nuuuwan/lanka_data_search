import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DataSourceAvatar from "./DataSourceAvatar";

export default function DataSourceMenuButton({ dataSource }) {
  const onClick = function () {
    window.open(dataSource.url, "_blank");
  };
  return (
    <Tooltip key={"source-link" + dataSource.id} title={dataSource.url}>
      <IconButton onClick={onClick}>
        <DataSourceAvatar dataSource={dataSource} />
      </IconButton>
    </Tooltip>
  );
}
