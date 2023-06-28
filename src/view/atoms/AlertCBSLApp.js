import * as React from "react";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
export default function AlertCBSLApp() {
  return (
    <Alert severity="info" sx={{ margin: 1 }}>
      <Box>
        This app was formerly{" "}
        <Link href="https://nuuuwan.github.io/cbsl_app">
          https://nuuuwan.github.io/cbsl_app
        </Link>
        , which now redirects to this app.
      </Box>
      <Box>
        This updated app contains from the Central Bank of Sri Lanka, as well as
        other Public Data sources related to Sri Lanka.
      </Box>
    </Alert>
  );
}
