import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

function renderDataset(dataset) {
  return dataset.detailedLabelWithEmojis;
}

export default function DatasetSelector({
  allDatasetList,
  selectedDatasetList,
  onChangeDatasetList,
}) {
  const onChange = function (_, datasetList) {
    onChangeDatasetList(datasetList);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Autocomplete
        multiple
        options={allDatasetList}
        value={selectedDatasetList}
        getOptionLabel={(dataset) => renderDataset(dataset)}
        sx={{ minWidth: 320 }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search Datasets" />
        )}
        onChange={onChange}
      />
    </Box>
  );
}
