import * as React from "react";
import Alert from "@mui/material/Alert";

export default function AlertDatasets() {
  return (
    <Alert severity="warning" sx={{ margin: 1 }}>
      This tool is still under development. 2,000+ datasets are currently
      available. More datasets will be availble in the future.
    </Alert>
  );
}
