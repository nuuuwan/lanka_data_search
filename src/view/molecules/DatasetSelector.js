import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
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
    <Stack
      sx={{ margin: 2, minWidth: 800 }}
      direction="row"
      alignItems="center"
    >
      <Autocomplete
        multiple
        filterOptions={filterOptions}
        options={allDatasetList}
        value={selectedDatasetList}
        getOptionLabel={(dataset) => renderDataset(dataset)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search Datasets" />
        )}
        sx={{ minWidth: 800 }}
        onChange={onChange}
      />
      <IconButton onClick={onClickRandom} sx={{ height: 32, width: 32 }}>
        <PlaylistAddIcon />
      </IconButton>
    </Stack>
  );
}
