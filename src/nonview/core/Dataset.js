import WWW from "../utils/WWW.js";
import DataResult from "./DataResult.js";
import DatasetBaseProps from "./_dataset/DatasetBaseProps.js";
const MIN_KEYWORD_LENGTH = 0;
const MIN_DATASET_SIZE = 1;

export default class Dataset extends DatasetBaseProps {
  static fromRaw(raw) {
    const summaryStatistics = raw.summary_statistics;

    return new Dataset(
      raw.source_id,
      raw.category,
      raw.sub_category,
      raw.scale,
      raw.unit,
      raw.frequency_name,
      raw.i_subject,
      raw.footnotes,
      summaryStatistics.n,
      summaryStatistics.min_t,
      summaryStatistics.max_t,
      summaryStatistics.min_value,
      summaryStatistics.max_value,
      raw.last_updated_time_ut
    );
  }

  isValidForVisualization() {
    return this.n >= MIN_DATASET_SIZE;
  }

  isMatch(keywords) {
    if (this.n === 0) {
      return false;
    }
    if (keywords.length < MIN_KEYWORD_LENGTH) {
      return false;
    }
    const keywordsLower = keywords.toLowerCase();

    const keywordLowerList = keywordsLower.split(" ");
    for (const keywordLower of keywordLowerList) {
      let someFieldContains = false;
      if (this.sourceID.toLowerCase().includes(keywordLower)) {
        someFieldContains = true;
      }
      if (this.category.toLowerCase().includes(keywordLower)) {
        someFieldContains = true;
      }
      if (this.subCategory.toLowerCase().includes(keywordLower)) {
        someFieldContains = true;
      }
      if (!someFieldContains) {
        return false;
      }
    }
    return true;
  }

  async getRemoteDataResult() {
    try {
      const remoteData = await WWW.json(this.dataURL);
      return DataResult.fromRemoteData(remoteData);
    } catch (e) {
      console.error(
        `getRemoteDataResult: Could not access "${this.dataURL}" (${e})`
      );
      return null;
    }
  }
}
