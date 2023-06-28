import { Component, createRef } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import DATASET_LIST, { DATASET_IDX } from "../../nonview/core/DATASET_LIST";
import DatasetSelector from "../molecules/DatasetSelector";
import RandomX from "../../nonview/utils/RandomX";
import URLContext from "../../nonview/utils/URLContext";
import AlertDatasets from "../atoms/AlertDatasets";
import AlertCBSLApp from "../atoms/AlertCBSLApp";
import SocialMediaMetaTags from "../molecules/SocialMediaMetaTags";
import CustomAppBar from "../molecules/CustomAppBar";
import VersionView from "../atoms/VersionView";

function getDatasetList() {
  const N_DISPLAY_START = 1;
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
  return datasetList;
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetList: getDatasetList(),
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

  renderHeader() {
    const { datasetList } = this.state;
    const refChart = createRef(null);
    return <CustomAppBar datasetList={datasetList} refChart={refChart} />;
  }

  renderBody() {
    const { datasetList } = this.state;
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    const { title, description, imageURL } = this;
    const refChart = createRef(null);
    return (
      <Box>
        <SocialMediaMetaTags
          title={title}
          description={description}
          imageURL={imageURL}
        />

        <DatasetSelector
          selectedDatasetList={datasetList}
          onChangeDatasetList={this.handleOnChangeDatasetList.bind(this)}
        />

        <DatasetListRemoteDataView
          key={key}
          datasetList={datasetList}
          refChart={refChart}
        />
        <AlertDatasets />
        <AlertCBSLApp />
        <VersionView />
      </Box>
    );
  }

  render() {
    return (
      <Box sx={{ margin: 0, padding: 0 }}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {this.renderHeader()}
        </Box>
        <Box
          sx={{
            position: "fixed",
            top: 60,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "scroll",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          {this.renderBody()}
        </Box>
      </Box>
    );
  }
}
