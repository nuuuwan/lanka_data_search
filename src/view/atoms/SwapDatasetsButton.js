import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

export default function SwapDatasetsButton({ handleSwapDatasets }) {
  return (
    <Tooltip title="Swap Datasets">
      <IconButton onClick={handleSwapDatasets} color="primary">
        <SwapHorizIcon />
      </IconButton>
    </Tooltip>
  );
}
