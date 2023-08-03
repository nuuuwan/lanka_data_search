import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
export default function AddRandomDatasetButton({ onClickRandom }) {
  return (
    <Tooltip title="Add Random Dataset">
      <IconButton onClick={onClickRandom} color="primary">
        <PlaylistAddIcon />
      </IconButton>
    </Tooltip>
  );
}
