import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
export default function AddRandomDatasetButton({ onClickRandom }) {
  return (
    <Tooltip title="Add Random Dataset">
      <IconButton onClick={onClickRandom} color="primary">
        <CasinoIcon />
      </IconButton>
    </Tooltip>
  );
}
