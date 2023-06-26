import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function DataSourceLink({ dataSource }) {
  return (
    <Box>
      {dataSource.name + "'s "}
      <Link href={dataSource.url} target="_blank">
        {dataSource.subSource}
      </Link>
    </Box>
  );
}
