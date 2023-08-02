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
import HomePageHandlersMixin, {
  N_RANDOM_DATASETS,
} from "./HomePageHandlersMixin";
import { STYLE } from "./HomePageStyle";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const context = URLContext.getContext();
    const datasetIDList =
      context.datasetIDList || context.datasetKeyList || undefined;
    const options = context.options || {
      sameYAxisScale: false,
      commonDataOnly: false,
      proportionalAxes: false,
    };

    this.state = {
      datasetIDList,
      options,
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
    let { datasetIDList, options } = this.state;

    const allDatasetIdx = await DatasetUtils.multigetRemoteDatasetIdx();

    if (datasetIDList === undefined) {
      const allDatasetIDList = Object.values(allDatasetIdx).map(
        (x) => x.shortID
      );
      const randomDatasetIDList = RandomX.shuffle(allDatasetIDList);
      datasetIDList = randomDatasetIDList.slice(0, N_RANDOM_DATASETS);
      URLContext.setContext({ datasetIDList, options });
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

  renderBody() {
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
        />

        <DatasetListRemoteDataView
          key={key}
          datasetList={datasetList}
          refChart={this.refChart}
          options={options}
          handleChangeOptions={this.handleChangeOptions.bind(this)}
        />

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
    const { datasetList } = this.state;
    return (
      <Box sx={STYLE.ALL}>
        <Box sx={STYLE.HEADER}>{this.renderHeader()}</Box>
        {datasetList ? (
          <>
            <Box sx={STYLE.BODY}>{this.renderBody()}</Box>
            <Box sx={STYLE.FOOTER}>{this.renderFooter()}</Box>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    );
  }
}
Object.assign(HomePage.prototype, HomePageHandlersMixin);
