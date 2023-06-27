import { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MultiLineChart from "../molecules/MultiLineChart.js";
import Box from "@mui/material/Box";
import DatasetDetailsListView from "../molecules/DatasetDetailsListView.js";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
export default class DatasetListRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResultList: null,
      sameYAxisScale: false,
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

  renderMultiLineChart() {
    const { datasetList } = this.props;
    const { dataResultList, sameYAxisScale } = this.state;
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

    const onChangeSameYAxisScale = function (event) {
      this.setState({ sameYAxisScale: event.target.checked });
    }.bind(this);

    return (
      <Box>
        <MultiLineChart
          datasetList={datasetList}
          dataResultList={dataResultList}
          sameYAxisScale={sameYAxisScale}
        />

        <FormControlLabel
          control={<Checkbox checked={sameYAxisScale} />}
          label="Same Y-Axis Scale"
          onChange={onChangeSameYAxisScale}
        />
      </Box>
    );
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
        {this.renderDatasetDetails()}
      </Box>
    );
  }
}
