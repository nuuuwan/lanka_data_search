import DatasetUtils from "../../nonview/core/DatasetUtils";
import { Box, Typography } from "@mui/material";
import DatasetLink from "../atoms/DatasetLink";
import List from "@mui/material/List";
import DatasetHistory from "../../nonview/core/DatasetHistory";
const MAX_DISPLAY_DATASETS = 30;

export default function DatasetListView({
  allDatasetIdx,
  onChangeDatasetList,
}) {
  const allDatasetList = DatasetUtils.getUniqueDatasetList(allDatasetIdx).sort(
    DatasetUtils.compareByLastUpdateTime
  );
  const displayDatasetList = allDatasetList.slice(0, MAX_DISPLAY_DATASETS);

  const datasetIDListFromHistory = DatasetHistory.getHistory();
  const historyDatasetList = datasetIDListFromHistory
    .map((datasetID) => allDatasetIdx[datasetID])
    .reverse();

  const innerHistory = historyDatasetList.map(function (dataset) {
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

  const innerLatest = displayDatasetList.map(function (dataset) {
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
      {historyDatasetList.length > 0 ? (
        <>
          {" "}
          <Typography variant="h6">Recently Accessed Datasets</Typography>
          <List>{innerHistory}</List>
        </>
      ) : null}
      <Typography variant="h6">Recently Updated Datasets</Typography>
      <List>{innerLatest}</List>
    </Box>
  );
}
