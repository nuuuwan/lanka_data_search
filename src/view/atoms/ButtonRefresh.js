import React from "react";
import UpdateIcon from "@mui/icons-material/Update";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
export default function ButtonRefresh() {
  const onClick = function () {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <Tooltip title="Updated to Latest App Version">
      <IconButton onClick={onClick} color="primary">
        <UpdateIcon />
      </IconButton>
    </Tooltip>
  );
}
