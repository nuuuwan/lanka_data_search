import React from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const URL_ISSUES = "https://github.com/nuuuwan/lanka_data_search/issues/new";

export default function ButtonReportBug() {
  const onClick = function () {
    window.open(URL_ISSUES, "_blank");
  };
  return (
    <Tooltip title="Report Bug">
      <IconButton onClick={onClick} color="primary">
        <BugReportIcon />
      </IconButton>
    </Tooltip>
  );
}
