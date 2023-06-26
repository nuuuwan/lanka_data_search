import React from "react";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import DataSourceAvatar from "./DataSourceAvatar";
import Box from "@mui/material/Box";
export default function DataSourceLink({ dataSource }) {
  return (
    <Stack direction="row" spacing={1}>
      <DataSourceAvatar dataSource={dataSource} />
      <Box>
        {" "}
        {dataSource.name + "'s "}
        <Link href={dataSource.url} target="_blank">
          {dataSource.subSource}
        </Link>
      </Box>
    </Stack>
  );
}
