import { Component } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import Typography from "@mui/material/Typography";
import DATASET_LIST, { DATASET_IDX } from "../../nonview/core/DATASET_LIST";
import { DATA_SOURCE_LIST } from "../../nonview/core/DATA_SOURCE_IDX";
import DatasetSelector from "../molecules/DatasetSelector";
import Stack from "@mui/material/Stack";
import RandomX from "../../nonview/utils/RandomX";
import URLContext from "../../nonview/utils/URLContext";
import AlertDatasets from "../atoms/AlertDatasets";
import AlertCBSLApp from "../atoms/AlertCBSLApp";
import TopMenu from "../molecules/TopMenu";
import DataSourceMenuButton from "../atoms/DataSourceMenuButton";
import SocialMediaMetaTags from "../molecules/SocialMediaMetaTags";

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

  get imageURL() {
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
      return (
        <DataSourceMenuButton
          key={"data-source-menu-item-" + dataSource.id}
          dataSource={dataSource}
        />
      );
    });
  }

  render() {
    const { datasetList } = this.state;
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    const { title, description, imageURL } = this;
    return (
      <Box sx={{ margin: 1, padding: 0 }}>
        <SocialMediaMetaTags
          title={title}
          description={description}
          imageURL={imageURL}
        />
        <Stack direction="row">
          {this.renderSources()}
          <TopMenu />
        </Stack>
        <Typography variant="h4">Lanka Data Search</Typography>

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
