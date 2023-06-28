import { Component } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import DATASET_LIST, { DATASET_IDX } from "../../nonview/core/DATASET_LIST";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceAvatar from "../atoms/DataSourceAvatar";
import DatasetSelector from "../molecules/DatasetSelector";
import Stack from "@mui/material/Stack";
import RandomX from "../../nonview/utils/RandomX";
import URLContext from "../../nonview/utils/URLContext";
import IconButton from "@mui/material/IconButton";
import CasinoIcon from "@mui/icons-material/Casino";
import Tooltip from "@mui/material/Tooltip";
import TwitterIcon from "@mui/icons-material/Twitter";
const N_DISPLAY_START = 2;
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const datasetKeyList = URLContext.getContext().datasetKeyList;

    let datasetList;
    if (datasetKeyList !== undefined) {
      datasetList = datasetKeyList.map((key) => DATASET_IDX[key]);
    } else {
      const datasetListAll = RandomX.shuffle(DATASET_LIST);
      datasetList = datasetListAll.slice(0, N_DISPLAY_START);
      const datasetKeyList = datasetList.map((x) => x.key);
      URLContext.setContext({ datasetKeyList });
    }
    this.state = {
      datasetList,
    };
  }

  handleOnChangeDatasetList(datasetList) {
    const datasetKeyList = datasetList.map((x) => x.key);
    URLContext.setContext({ datasetKeyList });
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

  renderMenu() {
    const onClickRandom = function () {
      URLContext.setContext({ datasetKeyList: undefined });
      window.location.reload();
    };

    const onClickTweet = function () {
      const tweetURL =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent("#LankaDataSearch by @nuuuwan\n\n") +
        encodeURIComponent(window.location.href);
      window.open(tweetURL, "_blank");
    };

    return (
      <>
        <Tooltip title="Open random datasets">
          <IconButton onClick={onClickRandom}>
            <CasinoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tweet">
          <IconButton onClick={onClickTweet}>
            <TwitterIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  }

  renderSources() {
    return DATA_SOURCE_LIST.map(function (dataSource) {
      const onClick = function () {
        window.open(dataSource.url, "_blank");
      };
      return (
        <Tooltip key={"source-link" + dataSource.id} title={dataSource.url}>
          <IconButton onClick={onClick}>
            <DataSourceAvatar dataSource={dataSource} />
          </IconButton>
        </Tooltip>
      );
    });
  }

  renderSourcesAndMenu() {
    return (
      <Stack direction="row">
        {this.renderSources()}
        {this.renderMenu()}
      </Stack>
    );
  }

  renderTitle() {
    return (
      <Box sx={{ margin: 1, padding: 0 }}>
        <Typography variant="h4">Lanka Data Search</Typography>
      </Box>
    );
  }

  render() {
    const { datasetList } = this.state;
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    return (
      <Box sx={{ margin: 1, padding: 0 }}>
        {this.renderSourcesAndMenu()}
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
