import { Component } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Search from "../../nonview/core/Search";
import SearchResultListView from "../molecules/SearchResultListView";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CONFIG_LIST from "../../nonview/core/CONFIG_LIST";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceLink from "../atoms/DataSourceLink";
import ConfigSelector from "../molecules/ConfigSelector";
import RandomX from "../../nonview/utils/RandomX";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const configListAll = RandomX.shuffle(CONFIG_LIST);

    const configList = [configListAll[0]];
    this.state = {
      configList,
    };
  }

  handleOnChangeConfigList(configList) {
    this.setState({ configList });
  }

  renderDevAlert() {
    return (
      <Alert severity="warning" sx={{ margin: 1 }}>
        This tool is still in development.{" "}
        <strong>{CONFIG_LIST.length.toLocaleString()}</strong> datasets are
        currently available. More datasets will be availble in the future.
      </Alert>
    );
  }

  renderSources() {
    return (
      <Box>
        {DATA_SOURCE_LIST.map((dataSource) => (
          <DataSourceLink
            key={"source-link" + dataSource.id}
            dataSource={dataSource}
          />
        ))}
      </Box>
    );
  }

  renderTitle() {
    return (
      <Box>
        <Typography variant="h5">Search Tool</Typography>
      </Box>
    );
  }

  render() {
    const { keywords, configList } = this.state;


    const nConfigList = configList.length;
    let message = nConfigList + " Random datasets.";
    if (keywords !== "") {
      message = nConfigList + ' datasets matching "' + keywords + '".';
    }

    return (
      <Box sx={{ margin: 2, padding: 1 }}>
        {this.renderDevAlert()}
        {this.renderSources()}
        {this.renderTitle()}

        <ConfigSelector  selectedConfigList={configList} onChangeConfigList={this.handleOnChangeConfigList.bind(this)}/>
        <Alert severity="info" sx={{ margin: 1 }}>
          {message}
        </Alert>

        <SearchResultListView configList={configList} />
        
      </Box>
    );
  }
}
