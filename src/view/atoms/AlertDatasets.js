import * as React from "react";
import Alert from "@mui/material/Alert";
import DATASET_LIST from "../../nonview/core/DATASET_LIST";

export default function AlertDatasets() {
  return (
    <Alert severity="warning" sx={{ margin: 1 }}>
      This tool is still in development.{" "}
      <strong>{DATASET_LIST.length.toLocaleString()}</strong> datasets are
      currently available. More datasets will be availble in the future.
    </Alert>
  );
}
