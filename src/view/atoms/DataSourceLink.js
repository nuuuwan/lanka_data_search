import React from "react";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import DataSourceAvatar from "./DataSourceAvatar";
import { Typography } from "@mui/material";
export default function DataSourceLink({ dataSource }) {
  return (
    <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
      <DataSourceAvatar dataSource={dataSource} />
      <Typography variant="caption">
        {" "}
        {dataSource.name + "'s "}
        <Link href={dataSource.url} target="_blank">
          {dataSource.subSource}
        </Link>
      </Typography>
    </Stack>
  );
}
