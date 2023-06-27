import { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MultiLineChart from "../molecules/MultiLineChart.js";
import Box from "@mui/material/Box";
import DatasetDetailsListView from "../molecules/DatasetDetailsListView.js";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class ConfigListRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResultList: null,
      useSameYAxis: false,
    };
  }

  async componentDidMount() {
    const { configList } = this.props;
    const dataResultListUnfiltered = await Promise.all(
      configList.map((config) => config.getRemoteDataResult())
    );
    const dataResultList = dataResultListUnfiltered.filter((x) => x !== null);
    this.setState({ dataResultList });
  }

  renderDatasetDetails() {
    const { configList } = this.props;
    return (
      <Box sx={{ margin: 1, padding: 1 }}>
        <Typography variant="h5">Dataset Details</Typography>
        <DatasetDetailsListView configList={configList} />
      </Box>
    );
  }

  renderMultiLineChart() {
    const { configList } = this.props;
    const { dataResultList, useSameYAxis } = this.state;
    if (!dataResultList) {
      return <CircularProgress />;
    }

    const onChangeSameYAxisScale = function (event) {
      this.setState({ useSameYAxis: event.target.checked });
    }.bind(this);

    return (
      <Box>
        <MultiLineChart
          configList={configList}
          dataResultList={dataResultList}
          useSameYAxis={useSameYAxis}
        />

        <FormControlLabel
          control={<Checkbox checked={useSameYAxis} />}
          label="Same Y-Axis Scale"
          onChange={onChangeSameYAxisScale}
        />
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
