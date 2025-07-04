import { Component, createRef } from "react";
import Box from "@mui/material/Box";
import DatasetListRemoteDataView from "../organisms/DatasetListRemoteDataView";
import DatasetSelector from "../molecules/DatasetSelector";
import URLContext from "../../nonview/utils/URLContext";
import SocialMediaMetaTags from "../molecules/SocialMediaMetaTags";
import CustomAppBar from "../molecules/CustomAppBar";
import VersionView from "../atoms/VersionView";
import CustomBottomNavigator from "../molecules/CustomBottomNavigator";
import { CircularProgress } from "@mui/material";
import DatasetUtils from "../../nonview/core/DatasetUtils";
import RandomX from "../../nonview/utils/RandomX";
import HomePageHandlersMixin from "./HomePageHandlersMixin";
import { STYLE } from "./HomePageStyle";
import { DEFAULT_HOME_PAGE_VIEW_NAME } from "./HomePageView";
import DataSourceListView from "../molecules/DataSourceListView";
import DatasetListView from "../molecules/DatasetListView";
import CustomSnackbar from "../molecules/CustomSnackbar";


export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const context = URLContext.getContext();
    const datasetIDList =
      context.datasetIDList || context.datasetKeyList || undefined;
    const options = context.options || {
      sameYAxisScale: false,
      commonDataOnly: true,
      proportionalAxes: false,
    };
    const homePageViewName =
      context.homePageViewName || DEFAULT_HOME_PAGE_VIEW_NAME;

    this.state = {
      datasetIDList,
      options,
      homePageViewName,
      snackbarMessage: null,
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
    let { datasetIDList, options, homePageViewName } = this.state;

    const allDatasetIdx = await DatasetUtils.multigetRemoteDatasetIdx();

    if (datasetIDList === undefined) {
      const allDatasetIDList = Object.values(allDatasetIdx).map(
        (x) => x.shortID
      );

      const N_RANDOM_OPEN_DATASETS = 3;
      const randomDatasetIDList = RandomX.shuffle(allDatasetIDList).slice(0, N_RANDOM_OPEN_DATASETS);
      const randomDatasetList = randomDatasetIDList.map(
        (datasetID) => allDatasetIdx[datasetID]
      ).sort(
        (a,b) => b.n - a.n,
      );
      console.debug(randomDatasetList);
      datasetIDList = [randomDatasetList[0].id];
      URLContext.setContext({ datasetIDList, options, homePageViewName });
    }

    const datasetList = datasetIDList.map(
      (datasetID) => allDatasetIdx[datasetID]
    );
    this.setState({ datasetIDList, datasetList, allDatasetIdx });
  }

  renderHeader() {
    const { allDatasetIdx } = this.state;
    return <CustomAppBar allDatasetIdx={allDatasetIdx} />;
  }

  renderBodyInner() {
    const { allDatasetIdx } = this.state;
    if (!allDatasetIdx) {
      return <CircularProgress />;
    }

    const { homePageViewName } = this.state;
    switch (homePageViewName) {
      case "Chart":
        return this.renderBodyChart();
      case "Sources":
        return this.renderBodySources();
      case "Datasets":
        return this.renderBodyDatasets();
      default:
        throw new Error(`Unknown homePageViewName: ${homePageViewName}`);
    }
  }

  renderBody() {
    return (
      <Box>
        {this.renderBodyInner()}
        <VersionView />
      </Box>
    );
  }

  renderBodyChart() {
    const { allDatasetIdx, datasetList, options } = this.state;
    const key = JSON.stringify(datasetList.map((x) => x.subCategory));
    const { title, description, imageURL } = this;

    const allDatasetList = DatasetUtils.getUniqueDatasetList(allDatasetIdx);

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
          onClickRandom={this.handleOnClickRandom.bind(this)}
          handleSwapDatasets={this.handleSwapDatasets.bind(this)}
        />

        <DatasetListRemoteDataView
          key={key}
          datasetList={datasetList}
          refChart={this.refChart}
          options={options}
          handleChangeOptions={this.handleChangeOptions.bind(this)}
          handleOnOpenSnackbar={this.handleOnOpenSnackbar.bind(this)}
        />
      </Box>
    );
  }

  renderBodySources() {
    return <DataSourceListView allDatasetIdx={this.state.allDatasetIdx} />;
  }

  renderBodyDatasets() {
    return (
      <DatasetListView
        allDatasetIdx={this.state.allDatasetIdx}
        onChangeDatasetList={this.handleOnChangeDatasetList.bind(this)}
      />
    );
  }

  renderFooter() {
    const { homePageViewName } = this.state;
    return (
      <CustomBottomNavigator
        homePageViewName={homePageViewName}
        handleOnChangeHomePageViewName={this.handleOnChangeHomePageViewName.bind(
          this
        )}
      />
    );
  }

  render() {
    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>{this.renderHeader()}</Box>
        <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
        <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
        <CustomSnackbar
          snackbarMessage={this.state.snackbarMessage}
          handleOnCloseSnackbar={this.handleOnCloseSnackbar.bind(this)}
        />
      </Box>
    );
  }
}
Object.assign(HomePage.prototype, HomePageHandlersMixin);
