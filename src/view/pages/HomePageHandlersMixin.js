import URLContext from "../../nonview/utils/URLContext";
import DatasetUtils from "../../nonview/core/DatasetUtils";
import RandomX from "../../nonview/utils/RandomX";
export const N_RANDOM_DATASETS = 1;

const HomePageHandlersMixin = {
  async handleOnChangeDatasetList(datasetList) {
    const { options } = this.state;
    const datasetIDList = datasetList.map((x) => x.shortID);
    URLContext.setContext({ datasetIDList, options });
    this.setState({ datasetIDList, datasetList, homePageViewName: "Chart" });
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
    let { options } = this.state;
    const { datasetIDList } = this.state;
    options = { ...options, ...newOptions };
    this.setState({ options });
    URLContext.setContext({ datasetIDList, options });
  },

  handleOnChangeHomePageViewName(homePageViewName) {
    this.setState({ homePageViewName });
  },

  handleOnOpenSnackbar(snackbarMessage) {
    this.setState({ snackbarMessage });
  },
  handleOnCloseSnackbar() {
    this.setState({ snackbarMessage: null });
  },
};

export default HomePageHandlersMixin;
