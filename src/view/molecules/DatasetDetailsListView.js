import Grid from "@mui/material/Grid";
import DatasetDetailsView from "./DatasetDetailsView";

export default function DatasetDetailsListView({ datasetList }) {
  const colorSet = new Set(
    datasetList
      .map((dataset) => dataset.color)
      .filter((color) => color !== null)
  );
  const showCustomColor = colorSet.size === datasetList.length;

  return (
    <Grid container>
      {datasetList.map((dataset, i) => (
        <Grid item key={"search-result-" + dataset.id}>
          <DatasetDetailsView
            dataset={dataset}
            i={i}
            n={datasetList.length}
            showCustomColor={showCustomColor}
          />
        </Grid>
      ))}
    </Grid>
  );
}
