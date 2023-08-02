import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import AddRandomDatasetButton from "../atoms/AddRandomDatasetButton";
import Grid from "@mui/material/Grid";
function renderDataset(dataset) {
  return dataset.detailedLabelWithEmojis;
}

export default function DatasetSelector({
  allDatasetList,
  selectedDatasetList,
  onChangeDatasetList,
  onClickRandom,
}) {
  const onChange = function (_, datasetList) {
    onChangeDatasetList(datasetList);
  };

  const filterOptions = function (allDatasetList, state) {
    return allDatasetList.filter((dataset) => {
      return dataset.isMatch(state.inputValue);
    });
  };

  return (
    <Box>
      <Autocomplete
        multiple
        filterOptions={filterOptions}
        options={allDatasetList}
        value={selectedDatasetList}
        getOptionLabel={(dataset) => renderDataset(dataset)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search Datasets" />
        )}
        sx={{ minWidth: 320 }}
        onChange={onChange}
      />
      <Grid container justifyContent="flex-end">
        <AddRandomDatasetButton onClickRandom={onClickRandom} />
      </Grid>
    </Box>
  );
}
