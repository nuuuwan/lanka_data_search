import * as React from "react";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

export default function AlertCBSLApp() {
  return (
    <Alert severity="info" sx={{ margin: 1 }}>
      This app was formerly{" "}
      <Link href="https://nuuuwan.github.io/cbsl_app">
        https://nuuuwan.github.io/cbsl_app
      </Link>
      .
    </Alert>
  );
}
