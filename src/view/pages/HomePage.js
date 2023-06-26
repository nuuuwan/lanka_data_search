import { Component } from "react";
import Box from "@mui/material/Box";
import ConfigListRemoteDataView from "../organisms/ConfigListRemoteDataView";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CONFIG_LIST from "../../nonview/core/CONFIG_LIST";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceAvatar from "../atoms/DataSourceAvatar";
import ConfigSelector from "../molecules/ConfigSelector";
import Stack from "@mui/material/Stack";
import RandomX from "../../nonview/utils/RandomX";

const N_DISPLAY_START = 2;
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const configListAll = RandomX.shuffle(CONFIG_LIST);

    const configList = configListAll.slice(0, N_DISPLAY_START);
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

  renderInnerWidthAlert() {
    const MIN_WIDTH = 640;
    if (window.innerWidth < MIN_WIDTH) {
      return (
        <Alert severity="error">
          This tool is best viewed on a desktop browser, or a screen with a
          width of at least {MIN_WIDTH}px.
        </Alert>
      );
    }
    return null;
  }

  render() {
    const { configList } = this.state;
    const key = JSON.stringify(configList.map((x) => x.subCategory));
    return (
      <Box sx={{ margin: 2, padding: 1 }}>
        {this.renderTitle()}
        {this.renderInnerWidthAlert()}

        <ConfigSelector
          selectedConfigList={configList}
          onChangeConfigList={this.handleOnChangeConfigList.bind(this)}
        />

        <ConfigListRemoteDataView key={key} configList={configList} />
        {this.renderDevAlert()}
      </Box>
    );
  }
}
