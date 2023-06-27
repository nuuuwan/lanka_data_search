import Grid from "@mui/material/Grid";
import DatasetDetailsView from "./DatasetDetailsView";

export default function DatasetDetailsListView({ datasetList }) {
  return (
    <Grid container>
      {datasetList.map((dataset, i) => (
        <Grid item key={"search-result-" + dataset.key}>
          <DatasetDetailsView dataset={dataset} />
        </Grid>
      ))}
    </Grid>
  );
}
