import React from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
export default function DownloadDatasetButton({ dataset }) {
  const onClick = function () {
    window.open(dataset.dataURL);
  };

  return (
    <Tooltip title="Download Dataset">
      <IconButton onClick={onClick} color="primary">
        <CloudDownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
