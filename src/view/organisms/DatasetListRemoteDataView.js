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

export default class DatasetListRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResultList: null,
      options: {
        sameYAxisScale: false,
        commonDataOnly: false,
        proportionalAxes: false,
      },
    };
  }

  handleChangeOptions(newOptions) {
    let options = this.state.options;
    options = { ...options, ...newOptions };
    this.setState({ options });
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
    if (!dataResultList || dataResultList.length < 2) {
      return null;
    }
    const { options } = this.state;

    const renderedInner = Object.entries(options).map(
      function ([optionName, optionValue]) {
        const onChange = function (event) {
          const newOptions = {};
          newOptions[optionName] = event.target.checked;
          this.handleChangeOptions(newOptions);
        }.bind(this);
        const label = StringX.camelToNormal(optionName);
        return (
          <FormControlLabel
            key={"option-" + optionName}
            control={<Checkbox checked={optionValue} />}
            label={label}
            onChange={onChange}
          />
        );
      }.bind(this)
    );
    return (
      <Stack direction="row" spacing={1}>
        {renderedInner}
      </Stack>
    );
  }

  renderMultiLineChart() {
    const { datasetList, refChart } = this.props;
    const { dataResultList, options } = this.state;
    if (!dataResultList) {
      return <CircularProgress />;
    }

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
      </Box>
    );
  }

  renderStatistics() {
    const { dataResultList } = this.state;
    if (!dataResultList || dataResultList.length !== 2) {
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
    if (!datasetList || datasetList.length === 0) {
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
    return (
      <Box>
        {this.renderMultiLineChart()}
        {this.renderDatasetDetails()}
        {this.renderStatistics()}
      </Box>
    );
  }
}
