import { Box, Typography } from "@mui/material";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceLink from "../atoms/DataSourceLink";
import List from "@mui/material/List";
import DatasetUtils from "../../nonview/core/DatasetUtils";

export default function DataSourceListView({ allDatasetIdx }) {
  const dataSourceToDatasetList =
    DatasetUtils.getDataSourceToDatasetList(allDatasetIdx);

  const inner = DATA_SOURCE_LIST.map(function (dataSource) {
    const key = "data-source-list-view-" + dataSource.id;
    const datasetListForSource = dataSourceToDatasetList[dataSource.id];
    const nDatasets = datasetListForSource ? datasetListForSource.length : 0;
    return (
      <DataSourceLink key={key} dataSource={dataSource} nDatasets={nDatasets} />
    );
  });

  return (
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h6">Our Data Sources</Typography>
      <List>{inner}</List>
    </Box>
  );
}
