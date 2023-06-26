import React from "react";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
export default function DataSourceLink({ dataSource }) {
  return (
    <Stack direction="row" spacing={1}>
      <Avatar
        src={process.env.PUBLIC_URL + `/${dataSource.id}.png`}
        alt={dataSource.name}
        sx={{ width: 24, height: 24 }}
      />
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
