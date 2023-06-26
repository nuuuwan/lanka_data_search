import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import CONFIG_LIST from "../../nonview/core/CONFIG_LIST.js";

export default function ConfigSelector({ selectedConfigList, onChangeConfigList}) {
    const onChange = function(_,configList) {
        onChangeConfigList(configList);
    }

    return (
    <Box sx={{margin: 1, padding: 1}}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={CONFIG_LIST}
        defaultValue={selectedConfigList}
        getOptionLabel={(option) => option.subCategory}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder="Datasets" />
        )}
        onChange={onChange}
      />
    </Box>
  );
}
