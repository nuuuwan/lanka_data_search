import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DATASET_LIST from "../../nonview/core/DATASET_LIST.js";
import CasinoIcon from "@mui/icons-material/Casino";
import IconButton from "@mui/material/IconButton";
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

  const onClickRandom = function () {
    window.location.reload();
  };

  return (
    <Stack direction="row" sx={{ margin: 1, padding: 0, width: "80%" }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={DATASET_LIST}
        defaultValue={selectedDatasetList}
        getOptionLabel={(dataset) => renderDataset(dataset)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Add Datasets"
            sx={{ minWidth: 200 }}
          />
        )}
        onChange={onChange}
      />
      <IconButton onClick={onClickRandom}>
        <CasinoIcon />
      </IconButton>
    </Stack>
  );
}
