import { Component } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LineChart from "../molecules/LineChart.js";
export default class ConfigRemoteDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResult: null,
    };
  }

  async componentDidMount() {
    const { config } = this.props;
    const dataResult = await config.getRemoteDataResult();
    this.setState({ dataResult });
  }

  renderDataResult() {
    const { dataResult } = this.state;
    if (!dataResult) {
      return <CircularProgress />;
    }
    return <LineChart dataResult={dataResult} />;
  }

  render() {
    return <Box>{this.renderDataResult()}</Box>;
  }
}
