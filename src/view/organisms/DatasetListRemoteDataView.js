import { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MultiLineChart from "../molecules/MultiLineChart.js";
import Box from "@mui/material/Box";
import DatasetDetailsListView from "../molecules/DatasetDetailsListView.js";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import DataResult from "../../nonview/core/DataResult.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
export default class DatasetListRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResultList: null,
      options: {
        sameYAxisScale: false,
        commonDataOnly: false,
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
    const { options } = this.state;

    const renderedInner = Object.entries(options).map(
      function ([optionName, optionValue]) {
        const onChange = function (event) {
          const newOptions = {};
          newOptions[optionName] = event.target.checked;
          this.handleChangeOptions(newOptions);
        }.bind(this);
        return (
          <FormControlLabel
            control={<Checkbox checked={optionValue} />}
            label={optionName}
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
    const { datasetList } = this.props;
    const { dataResultList, options } = this.state;
    if (!dataResultList) {
      return <CircularProgress />;
    }

    if (dataResultList.length === 0) {
      return (
        <Alert severity="warning" sx={{ margin: 1 }}>
          Select at least one dataset!
        </Alert>
      );
    }

    return (
      <Box>
        <MultiLineChart
          datasetList={datasetList}
          dataResultList={dataResultList}
          options={options}
        />

        {this.renderOptions()}
      </Box>
    );
  }

  renderStatistics() {
    const { dataResultList } = this.state;
    if (!dataResultList) {
      return null;
    }

    if (dataResultList.length === 2) {
      const correlation = DataResult.getCorrelation(
        dataResultList[0],
        dataResultList[1]
      );
      if (!(correlation && correlation <= 1 && correlation >= -1)) {
        return null;
      }
      const isPositive = correlation > 0;
      const isStrong = Math.abs(correlation) > 0.9;
      const isMild = Math.abs(correlation) > 0.7;
      let color = "black";
      let opacity = 0.25;
      let correlationText = "";
      if (isStrong) {
        correlationText = "strong";
        opacity = 1;
      } else if (isMild) {
        correlationText = "mild";
        opacity = 0.5;
      }

      if (correlationText !== "") {
        if (isPositive) {
          correlationText += " positive";
          color = "green";
        } else {
          correlationText += " negative";
          color = "red";
        }
        correlationText += " correlation";
      }
      return (
        <Box sx={{ margin: 1, padding: 1 }}>
          <Typography variant="h5">Statistics</Typography>

          <Paper
            elevation={0}
            sx={{
              color,
              opacity,
              margin: 1,
              padding: 1,
              background: "#fcfcfc",
              borderRadius: 3,
              width: 300,
            }}
          >
            <Typography variant="caption">
              {"correlation = " + correlation.toLocaleString()}
            </Typography>
            <Typography variant="body1">{correlationText}</Typography>
          </Paper>
        </Box>
      );
    }
    return null;
  }

  renderDatasetDetails() {
    const { datasetList } = this.props;
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
        {this.renderStatistics()}
        {this.renderDatasetDetails()}
      </Box>
    );
  }
}
