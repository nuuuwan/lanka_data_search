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
import Link from "@mui/material/Link";
import { Helmet } from "react-helmet";

const N_DISPLAY_START = 1;
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

  get title() {
    const { datasetList } = this.state;
    return datasetList.map((x) => x.subCategory).join(" ");
  }

  handleOnChangeDatasetList(datasetList) {
    const datasetKeyList = datasetList.map((x) => x.key);
    URLContext.setContext({ datasetKeyList });
    this.setState({ datasetList });
  }

  renderDevAlert() {
    return (
      <>
        <Alert severity="warning" sx={{ margin: 1 }}>
          This tool is still in development.{" "}
          <strong>{DATASET_LIST.length.toLocaleString()}</strong> datasets are
          currently available. More datasets will be availble in the future.
        </Alert>
        <Alert severity="info" sx={{ margin: 1 }}>
          This app was formerly{" "}
          <Link href="https://nuuuwan.github.io/cbsl_app">
            https://nuuuwan.github.io/cbsl_app
          </Link>
          .
        </Alert>
      </>
    );
  }

  renderMenu() {
    const onClickRandom = function () {
      URLContext.setContext({ datasetKeyList: undefined });
      window.location.reload();
    };

    const onClickTweet = function () {
      const { datasetList } = this.state;
      const dataSetText = datasetList.map((x) => x.tweetText).join("\n");
      const tweetText = [
        dataSetText,
        "",
        "#LankaDataSearch by @nuuuwan",
        window.location.href,
      ].join("\n");
      const tweetURL =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(tweetText);
      window.open(tweetURL, "_blank");
    }.bind(this);

    return (
      <>
        <Tooltip title="Open random datasets">
          <IconButton onClick={onClickRandom}>
            <CasinoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tweet this chart">
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

  renderMetaTags() {
    return (
      <Helmet>
        <title>{this.title}</title>
        <meta name="description" content={this.title} />
        <meta name="twitter:description" content={this.title} />
      </Helmet>
    );
  }

  render() {
    const { datasetList } = this.state;
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    return (
      <Box sx={{ margin: 1, padding: 0 }}>
        {this.renderMetaTags()}
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
