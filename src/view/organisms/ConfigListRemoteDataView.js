import { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MultiLineChart from "../molecules/MultiLineChart.js";
import Box from "@mui/material/Box";
import SearchResultListView from "../molecules/SearchResultListView.js";
import { Typography } from "@mui/material";

export default class ConfigListRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResultList: null,
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
      <Box sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h5">Dataset Details</Typography>
        <SearchResultListView configList={configList} />
      </Box>
    );
  }

  renderMultiLineChart() {
    const { configList } = this.props;
    const { dataResultList } = this.state;
    if (!dataResultList) {
      return <CircularProgress />;
    }

    const title = configList.map((config) => config.subCategory).join("✖️");

    return (
      <Box sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <MultiLineChart
          configList={configList}
          dataResultList={dataResultList}
          isZ={false}
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
