import DatasetUtils from "../../nonview/core/DatasetUtils";
import { Box, Typography } from "@mui/material";
import DatasetLink from "../atoms/DatasetLink";
import List from "@mui/material/List";
const MAX_DISPLAY_DATASETS = 100;

export default function DatasetListView({
  allDatasetIdx,
  onChangeDatasetList,
}) {
  const allDatasetList = DatasetUtils.getUniqueDatasetList(allDatasetIdx).sort(
    DatasetUtils.compareByLastUpdateTime
  );
  const displayDatasetList = allDatasetList.slice(0, MAX_DISPLAY_DATASETS);

  const inner = displayDatasetList.map(function (dataset) {
    const key = "dataset-list-view-" + dataset.id;
    return (
      <DatasetLink
        key={key}
        dataset={dataset}
        onChangeDatasetList={onChangeDatasetList}
        showDataSource={true}
      />
    );
  });

  return (
    <Box sx={{ margin: 1, padding: 1 }}>
      <Typography variant="h6">Latest Datasets</Typography>
      <List>{inner}</List>
    </Box>
  );
}
