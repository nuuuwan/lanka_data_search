import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

export default function AddRandomDatasetButton({ onClickRandom }) {
  return (
    <IconButton onClick={onClickRandom} color="primary">
      <PlaylistAddIcon />
    </IconButton>
  );
}
