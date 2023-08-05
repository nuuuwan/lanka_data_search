import URLContext from "../../nonview/utils/URLContext";
import DatasetUtils from "../../nonview/core/DatasetUtils";
import RandomX from "../../nonview/utils/RandomX";
export const N_RANDOM_DATASETS = 1;

const HomePageHandlersMixin = {
  async handleOnChangeDatasetList(datasetList) {
    const { options } = this.state;
    const homePageViewName = 'Chart';
    
    const datasetIDList = datasetList.map((x) => x.shortID);
    URLContext.setContext({ datasetIDList, options, homePageViewName });
    this.setState({ datasetIDList, datasetList, homePageViewName });
  },

  async handleOnClickClearAll() {
    await this.handleOnChangeDatasetList([]);
  },

  async handleOnClickRandom() {
    const { allDatasetIdx, datasetList } = this.state;
    const allDatasetList = DatasetUtils.getUniqueDatasetList(allDatasetIdx);
    const randomDatasetList = RandomX.shuffle(allDatasetList);
    const datasetListNew = [].concat(
      datasetList,
      randomDatasetList.slice(0, N_RANDOM_DATASETS)
    );
    await this.handleOnChangeDatasetList(datasetListNew);
  },

  handleChangeOptions(newOptions) {
    let { options, homePageViewName } = this.state;
    const { datasetIDList } = this.state;
    options = { ...options, ...newOptions };
    this.setState({ options });
    URLContext.setContext({ datasetIDList, options, homePageViewName });
  },

  handleOnChangeHomePageViewName(homePageViewName) {
    let { datasetIDList, options } = this.state;
    this.setState({ homePageViewName });
    URLContext.setContext({ datasetIDList, options, homePageViewName });
  },

  handleOnOpenSnackbar(snackbarMessage) {
    this.setState({ snackbarMessage });
  },
  handleOnCloseSnackbar() {
    this.setState({ snackbarMessage: null });
  },
  handleSwapDatasets() {
    const { datasetList } = this.state;
    const datasetListNew = [].concat(datasetList);
    datasetListNew.reverse();
    this.handleOnChangeDatasetList(datasetListNew);
  },
};

export default HomePageHandlersMixin;
