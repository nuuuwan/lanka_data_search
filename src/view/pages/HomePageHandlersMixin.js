import URLContext from "../../nonview/utils/URLContext";
import Dataset from "../../nonview/core/Dataset";
import RandomX from "../../nonview/utils/RandomX";
export const N_RANDOM_DATASETS = 1;

const HomePageHandlersMixin = {
  async handleOnChangeDatasetList(datasetList) {
    const { options } = this.state;
    const datasetIDList = datasetList.map((x) => x.shortID);
    URLContext.setContext({ datasetIDList, options });
    this.setState({ datasetIDList, datasetList });
  },

  async handleOnClickClearAll() {
    await this.handleOnChangeDatasetList([]);
  },

  async handleOnClickRandom() {
    const { allDatasetIdx, datasetList } = this.state;
    const allDatasetList = Dataset.getUniqueDatasetList(allDatasetIdx);
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
};

export default HomePageHandlersMixin;
