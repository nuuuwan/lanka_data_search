import { Component } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import Typography from "@mui/material/Typography";
import DATASET_LIST, { DATASET_IDX } from "../../nonview/core/DATASET_LIST";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DataSourceAvatar from "../atoms/DataSourceAvatar";
import DatasetSelector from "../molecules/DatasetSelector";
import Stack from "@mui/material/Stack";
import RandomX from "../../nonview/utils/RandomX";
import URLContext from "../../nonview/utils/URLContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Helmet } from "react-helmet";
import AlertDatasets from "../atoms/AlertDatasets";
import AlertCBSLApp from "../atoms/AlertCBSLApp";
import TopMenu from "../molecules/TopMenu";

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
    const n = datasetList.length;
    return `#LankaDataSearch (${n})`;
  }

  get image_url() {
    return "https://raw.githubusercontent.com/nuuuwan/lanka_data_search/master/public/sri_lanka.png";
  }

  get description() {
    const { datasetList } = this.state;
    const datasetListStr = datasetList.map((x) => x.subCategory).join(" ");
    return `${datasetListStr}`;
  }

  handleOnChangeDatasetList(datasetList) {
    const datasetKeyList = datasetList.map((x) => x.key);
    URLContext.setContext({ datasetKeyList });
    this.setState({ datasetList });
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
        <TopMenu />
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
    const { title, description, image_url } = this;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lanka_data" />
        <meta name="twitter:creator" content="@nuuuwan" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image_url} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image_url} />
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
        <AlertDatasets />
        <AlertCBSLApp />
      </Box>
    );
  }
}
