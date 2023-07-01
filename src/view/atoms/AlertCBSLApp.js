import * as React from "react";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import DataSourceLink from "./DataSourceLink";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";

export default function AlertCBSLApp() {
  const renderedSources = DATA_SOURCE_LIST.map(function (dataSource) {
    return (
      <Box key={"data-source-" + dataSource.id} sx={{ paddingTop: 1 }}>
        <DataSourceLink dataSource={dataSource} />
      </Box>
    );
  });

  return (
    <Alert severity="info" sx={{ margin: 1 }}>
      <Box>
        This updated app contains data from the following sources:
        {renderedSources}
      </Box>

      <Box sx={{ marginTop: 1 }}>
        This app was formerly{" "}
        <Link href="https://nuuuwan.github.io/cbsl_app">
          https://nuuuwan.github.io/cbsl_app
        </Link>
      </Box>
    </Alert>
  );
}
