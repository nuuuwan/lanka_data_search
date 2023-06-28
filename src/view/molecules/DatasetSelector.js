import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DATASET_LIST from "../../nonview/core/DATASET_LIST.js";
function renderDataset(dataset) {
  return dataset.detailedLabel;
}

export default function DatasetSelector({
  selectedDatasetList,
  onChangeDatasetList,
}) {
  const onChange = function (_, datasetList) {
    onChangeDatasetList(datasetList);
  };

  return (
    <Autocomplete
      multiple
      options={DATASET_LIST}
      value={selectedDatasetList}
      getOptionLabel={(dataset) => renderDataset(dataset)}
      sx={{ minWidth: 320 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search Datasets" />
      )}
      onChange={onChange}
    />
  );
}
