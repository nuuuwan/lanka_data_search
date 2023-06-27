import { Component } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import DATASET_LIST from "../../nonview/core/DATASET_LIST";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceAvatar from "../atoms/DataSourceAvatar";
import DatasetSelector from "../molecules/DatasetSelector";
import Stack from "@mui/material/Stack";
import RandomX from "../../nonview/utils/RandomX";

const N_DISPLAY_START = 2;
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const datasetListAll = RandomX.shuffle(DATASET_LIST);

    const datasetList = datasetListAll.slice(0, N_DISPLAY_START);
    this.state = {
      datasetList,
    };
  }

  handleOnChangeDatasetList(datasetList) {
    this.setState({ datasetList });
  }

  renderDevAlert() {
    return (
      <Alert severity="info" sx={{ margin: 1 }}>
        This tool is still in development.{" "}
        <strong>{DATASET_LIST.length.toLocaleString()}</strong> datasets are
        currently available. More datasets will be availble in the future.
      </Alert>
    );
  }
  renderSources() {
    return (
      <Stack direction="row">
        {DATA_SOURCE_LIST.map((dataSource) => (
          <DataSourceAvatar
            key={"source-link" + dataSource.id}
            dataSource={dataSource}
          />
        ))}
      </Stack>
    );
  }

  renderTitle() {
    return (
      <Box>
        {this.renderSources()}
        <Typography variant="h4">Lanka Data Search</Typography>
      </Box>
    );
  }

  render() {
    const { datasetList } = this.state;
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    return (
      <Box sx={{ margin: 2, padding: 1 }}>
        {this.renderTitle()}

        <DatasetSelector
          selectedDatasetList={datasetList}
          onChangeDatasetList={this.handleOnChangeDatasetList.bind(this)}
        />

        <DatasetListRemoteDataView key={key} datasetList={datasetList} />
        {this.renderDevAlert()}
      </Box>
    );
  }
}
