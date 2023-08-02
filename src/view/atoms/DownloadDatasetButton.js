import React from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";

export default function DownloadDatasetButton({ dataset }) {
  const onClick = function() {
    window.open(dataset.dataURL);
  }

  return (
    <IconButton onClick={onClick} color="primary">
      <CloudDownloadIcon />
    </IconButton>
  );
}
