import Grid from "@mui/material/Grid";
import DatasetDetailsView from "./DatasetDetailsView";

export default function DatasetDetailsListView({ configList }) {
  return (
    <Grid container>
      {configList.map((config, i) => (
        <Grid item key={"search-result-" + config.key}>
          <DatasetDetailsView config={config} />
        </Grid>
      ))}
    </Grid>
  );
}
