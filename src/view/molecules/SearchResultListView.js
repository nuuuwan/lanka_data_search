import Box from "@mui/material/Box";
import SearchResultView from "../molecules/SearchResultView";

export default function SearchResultListView({ configList }) {
  return (
    <Box>
      {configList.map((config, i) => (
        <SearchResultView key={"search-resu;t-" + config.key} config={config} />
      ))}
    </Box>
  );
}
