import { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MultiLineChart from "../molecules/MultiLineChart.js";
import Box from "@mui/material/Box";
import DatasetDetailsListView from "../molecules/DatasetDetailsListView.js";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import StringX from "../../nonview/utils/StringX.js";
import StatCorrelationView from "../molecules/StatCorrelationView.js";
import StatEquationView from "../molecules/StatEquationView.js";
import Grid from "@mui/material/Grid";
import TweetButton from "../atoms/TweetButton.js";
import DownloadChartImageButton from "../atoms/DownloadChartImageButton.js";
import CopyLinkButton from "../atoms/CopyLinkButton.js";

export default class DatasetListRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResultList: null,
    };
  }

  async componentDidMount() {
    const { datasetList } = this.props;
    const dataResultListUnfiltered = await Promise.all(
      datasetList.map((dataset) => dataset.getRemoteDataResult())
    );
    const dataResultList = dataResultListUnfiltered.filter((x) => x !== null);
    this.setState({ dataResultList });
  }

  renderOptions() {
    const { dataResultList } = this.state;
    if (dataResultList.length < 2) {
      return null;
    }
    const { options, handleChangeOptions } = this.props;

    const renderedInner = Object.entries(options).map(function ([
      optionName,
      optionValue,
    ]) {
      const onChange = function (event) {
        const newOptions = {};
        newOptions[optionName] = event.target.checked;
        handleChangeOptions(newOptions);
      };
      const label = StringX.camelToNormal(optionName);
      return (
        <FormControlLabel
          key={"option-" + optionName}
          control={<Checkbox checked={optionValue} />}
          label={label}
          onChange={onChange}
        />
      );
    });
    return (
      <Stack direction="row" spacing={1}>
        {renderedInner}
      </Stack>
    );
  }

  renderChartButtons() {
    const { datasetList, refChart, handleOnOpenSnackbar } = this.props;
    return (
      <Grid container justifyContent="flex-end">
        <TweetButton datasetList={datasetList} />
        <DownloadChartImageButton
          refChart={refChart}
          datasetList={datasetList}
          handleOnOpenSnackbar={handleOnOpenSnackbar}
        />
        <CopyLinkButton handleOnOpenSnackbar={handleOnOpenSnackbar} />
      </Grid>
    );
  }

  renderMultiLineChart() {
    const { datasetList, refChart, options } = this.props;
    const { dataResultList } = this.state;

    if (dataResultList.length === 0) {
      return (
        <Alert severity="error" sx={{ margin: 1 }}>
          You must select at least ONE dataset!
        </Alert>
      );
    }

    return (
      <Box>
        <MultiLineChart
          datasetList={datasetList}
          dataResultList={dataResultList}
          options={options}
          refChart={refChart}
        />

        {this.renderOptions()}
        {this.renderChartButtons()}
      </Box>
    );
  }

  renderStatistics() {
    const { dataResultList } = this.state;
    if (dataResultList.length !== 2) {
      return null;
    }

    const { datasetList } = this.props;

    return (
      <Box sx={{ margin: 1, padding: 1 }}>
        <Typography variant="h5">Statistics</Typography>
        <Grid container>
          <Grid item>
            <StatCorrelationView dataResultList={dataResultList} />
          </Grid>
          <Grid item>
            <StatEquationView
              dataResultList={dataResultList}
              datasetList={datasetList}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  renderDatasetDetails() {
    const { datasetList } = this.props;
    if (datasetList.length === 0) {
      return null;
    }

    return (
      <Box sx={{ margin: 1, padding: 1 }}>
        <Typography variant="h5">Dataset Details</Typography>
        <DatasetDetailsListView datasetList={datasetList} />
      </Box>
    );
  }
  render() {
    const { dataResultList } = this.state;
    if (!dataResultList) {
      return <CircularProgress />;
    }
    return (
      <Box>
        {this.renderMultiLineChart()}
        {this.renderDatasetDetails()}
        {this.renderStatistics()}
      </Box>
    );
  }
}
