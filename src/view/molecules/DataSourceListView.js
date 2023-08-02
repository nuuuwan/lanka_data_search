import { Box, Typography } from "@mui/material";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceLink from "../atoms/DataSourceLink";

export default function DataSourceListView() {
  const inner = DATA_SOURCE_LIST.map(function (dataSource) {
    const key = "data-source-list-view-" + dataSource.id;
    return <DataSourceLink key={key} dataSource={dataSource} />;
  });

  return (
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h6">Our Data Sources</Typography>
      {inner}
    </Box>
  );
}
