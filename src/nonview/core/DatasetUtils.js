import WWW from "../utils/WWW.js";
import Dataset from "./Dataset.js";
const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/lanka_data_timeseries/data";

export default class DatasetUtils {
  static async multigetRemoteDatasetList() {
    const urlRemote = `${URL_BASE}/summary.json`;
    const dataListRaw = await WWW.json(urlRemote);

    const filteredDatasetList = dataListRaw
      .map((d) => Dataset.fromRaw(d))
      .filter((dataset) => dataset.isValidForVisualization());

    const dupeDatasetGroups = Object.values(
      filteredDatasetList.reduce((idx, dataset) => {
        if (!idx[dataset.dataHash]) {
          idx[dataset.dataHash] = [];
        }
        idx[dataset.dataHash].push(dataset);
        return idx;
      }, {})
    );

    const dedupedDatasetList = dupeDatasetGroups.map(function (datasetList) {
      const sortedDatasetList = datasetList.sort(
        DatasetUtils.compareByLastUpdateTime
      );
      return sortedDatasetList[0];
    });

    const sortedDatasetList = dedupedDatasetList.sort((a, b) =>
      a.subCategory.localeCompare(b.subCategory)
    );

    return sortedDatasetList;
  }

  static async multigetRemoteDatasetIdx() {
    const datasetList = await DatasetUtils.multigetRemoteDatasetList();
    const datasetIdx = {};
    for (const dataset of datasetList) {
      datasetIdx[dataset.shortID] = dataset;
      datasetIdx[dataset.id] = dataset;
      // DEPRECATED: Support legacyID in URLContext
      datasetIdx[dataset.legacyID] = dataset;
    }
    return datasetIdx;
  }

  // DEPRECATE! HACK for supporting legacyIDs!
  static getUniqueDatasetList(datasetIdx) {
    const allDatasetIDList = Object.values(datasetIdx).map((x) => x.id);
    const uniqueDatasetIDList = [...new Set(allDatasetIDList)];
    return uniqueDatasetIDList
      .map((datasetID) => datasetIdx[datasetID])
      .sort((a, b) => a.subCategory.localeCompare(b.subCategory));
  }

  static getDatasetListLength(datasetIdx) {
    return Object.values(DatasetUtils.getUniqueDatasetList(datasetIdx)).length;
  }

  static compareByLastUpdateTime(a, b) {
    return b.lastUpdateTimeUT - a.lastUpdateTimeUT;
  }
}
