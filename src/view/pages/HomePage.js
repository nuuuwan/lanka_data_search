import { Component, createRef } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import DatasetSelector from "../molecules/DatasetSelector";
import URLContext from "../../nonview/utils/URLContext";
import AlertDatasets from "../atoms/AlertDatasets";
import AlertCBSLApp from "../atoms/AlertCBSLApp";
import SocialMediaMetaTags from "../molecules/SocialMediaMetaTags";
import CustomAppBar from "../molecules/CustomAppBar";
import VersionView from "../atoms/VersionView";
import CustomBottomNavigator from "../molecules/CustomBottomNavigator";
import { CircularProgress } from "@mui/material";
import Dataset from "../../nonview/core/Dataset";
import RandomX from "../../nonview/utils/RandomX";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.getContext();
    console.log(context);
    const datasetIDList =
      context.datasetIDList || context.datasetKeyList || undefined;
    this.state = {
      datasetIDList,
    };
    this.refChart = createRef();
  }

  get title() {
    return `#LankaDataSearch`;
  }

  get imageURL() {
    return "https://raw.githubusercontent.com/nuuuwan/lanka_data_search/master/public/sri_lanka.png";
  }

  get description() {
    return "Public Datasets about #SriLanka.";
  }

  async componentDidMount() {
    let { datasetIDList } = this.state;

    const allDatasetIdx = await Dataset.multigetRemoteDatasetIdx();

    if (datasetIDList === undefined) {
      const allDatasetIDList = Object.values(allDatasetIdx).map((x) => x.id);
      const randomDatasetIDList = RandomX.shuffle(allDatasetIDList);
      datasetIDList = randomDatasetIDList.slice(0, 1);
      URLContext.setContext({ datasetIDList });
    }

    const datasetList = datasetIDList.map(
      (datasetID) => allDatasetIdx[datasetID]
    );
    this.setState({ datasetIDList, datasetList, allDatasetIdx });
  }
  async handleOnChangeDatasetList(datasetList) {
    const datasetIDList = datasetList.map((x) => x.id);
    URLContext.setContext({ datasetIDList });
    this.setState({ datasetIDList, datasetList });
  }

  renderHeader() {
    const { allDatasetIdx } = this.state;
    return <CustomAppBar allDatasetIdx={allDatasetIdx} />;
  }

  renderBody() {
    const { allDatasetIdx, datasetList } = this.state;
    if (!allDatasetIdx) {
      return <CircularProgress />;
    }
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    const { title, description, imageURL } = this;

    const allDatasetList = Dataset.getUniqueDatasetList(allDatasetIdx);
    const nData = Dataset.getDatasetListLength(allDatasetIdx);

    return (
      <Box>
        <SocialMediaMetaTags
          title={title}
          description={description}
          imageURL={imageURL}
        />

        <DatasetSelector
          allDatasetList={allDatasetList}
          selectedDatasetList={datasetList}
          onChangeDatasetList={this.handleOnChangeDatasetList.bind(this)}
        />

        <DatasetListRemoteDataView
          key={key}
          datasetList={datasetList}
          refChart={this.refChart}
        />
        <AlertDatasets nData={nData} />
        <AlertCBSLApp />
        <VersionView />
      </Box>
    );
  }

  renderFooter() {
    const { datasetList } = this.state;
    if (!datasetList) {
      return <CircularProgress />;
    }
    return (
      <CustomBottomNavigator
        datasetList={datasetList}
        refChart={this.refChart}
      />
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
            bottom: 60,
            left: 0,
            right: 0,
            overflow: "scroll",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          {this.renderBody()}
        </Box>{" "}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {this.renderFooter()}
        </Box>
      </Box>
    );
  }
}
