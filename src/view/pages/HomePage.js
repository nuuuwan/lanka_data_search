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

const DEFAULT_DATASET_ID = "world_bank.GDP per capita (current US$).Annual";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetIDList: URLContext.getContext().datasetIDList || [
        DEFAULT_DATASET_ID,
      ],
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

  async handleOnChangeDatasetList(datasetList) {
    const datasetIDList = datasetList.map((x) => x.id);
    URLContext.setContext({ datasetIDList });
    this.setState({ datasetIDList, datasetList });
  }

  renderHeader() {
    return <CustomAppBar />;
  }

  async componentDidMount() {
    const { datasetIDList } = this.state;
    const allDatasetIdx = await Dataset.multigetRemoteDatasetIdx();
    const datasetList = datasetIDList.map(
      (datasetID) => allDatasetIdx[datasetID]
    );
    this.setState({ datasetList, allDatasetIdx });
  }

  renderBody() {
    const { allDatasetIdx, datasetList } = this.state;
    if (!allDatasetIdx) {
      return <CircularProgress />;
    }
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    const { title, description, imageURL } = this;
    return (
      <Box>
        <SocialMediaMetaTags
          title={title}
          description={description}
          imageURL={imageURL}
        />

        <DatasetSelector
          allDatasetList={Object.values(allDatasetIdx)}
          selectedDatasetList={datasetList}
          onChangeDatasetList={this.handleOnChangeDatasetList.bind(this)}
        />

        <DatasetListRemoteDataView
          key={key}
          datasetList={datasetList}
          refChart={this.refChart}
        />
        <AlertDatasets />
        <AlertCBSLApp />
        <VersionView />
      </Box>
    );
  }

  renderFooter() {
    const { datasetList } = this.state;
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
