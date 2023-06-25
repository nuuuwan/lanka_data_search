import Grid from "@mui/material/Grid";
import SearchResultView from "../molecules/SearchResultView";

export default function SearchResultListView({ configList }) {
  return (
    <Grid container>
      {configList.map((config, i) => (
        <Grid item key={"search-result-" + config.key}>
          <SearchResultView config={config} />
        </Grid>
      ))}
    </Grid>
  );
}
