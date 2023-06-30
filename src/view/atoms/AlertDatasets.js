import * as React from "react";
import Alert from "@mui/material/Alert";

export default function AlertDatasets({nData}) {
  return (
    <Alert severity="warning" sx={{ margin: 1 }}>
      This tool is still under development. {nData.toLocaleString()} datasets are currently
      available. More datasets will be availble in the future.
    </Alert>
  );
}
