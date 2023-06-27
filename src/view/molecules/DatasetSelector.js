import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DATASET_LIST from "../../nonview/core/DATASET_LIST.js";
import CasinoIcon from "@mui/icons-material/Casino";
import IconButton from "@mui/material/IconButton";
import URLContext from "../../nonview/utils/URLContext.js";
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
      defaultValue={selectedDatasetList}
      getOptionLabel={(dataset) => renderDataset(dataset)}
      sx={{ minWidth: 320 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Add Datasets" />
      )}
      onChange={onChange}
    />
  );
}
