import WWW from "../utils/WWW.js";
import DataResult from "./DataResult.js";
import DATA_SOURCE_IDX from "./DATA_SOURCE_IDX.js";
const MIN_KEYWORD_LENGTH = 0;

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/lanka_data_timeseries/data";

const HACK_DEFAULT_FREQUENCY_NAME = "Annual";

export default class Dataset {
  constructor(
    sourceID,
    category,
    subCategory,
    scale,
    unit,
    frequencyName,
    iSubject,
    footnotes,
    n,
    minT,
    maxT,
    minValue,
    maxValue
  ) {
    this.sourceID = sourceID;
    this.category = category;
    this.subCategory = subCategory;
    this.scale = scale;
    this.unit = unit;
    this.frequencyName = frequencyName;
    this.iSubject = iSubject;
    this.footnotes = footnotes;
    this.n = n;
    this.minT = minT;
    this.maxT = maxT;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

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
      raw.footnotes | {},
      summaryStatistics.n,
      summaryStatistics.min_t,
      summaryStatistics.max_t,
      summaryStatistics.min_value,
      summaryStatistics.max_value
    );
  }

  isValidForVisualization() {
    return this.n > 1;
  }

  get tweetText() {
    return `📊 ${this.subCategory} - @${this.source.twitterHandle}`;
  }

  get legacyID() {
    return this.subCategory;
  }

  get id() {
    return `${this.sourceID}.${this.subCategory}.${HACK_DEFAULT_FREQUENCY_NAME}`;
  }

  get source() {
    return DATA_SOURCE_IDX[this.sourceID];
  }

  get dataURLSource() {
    return `${URL_BASE}/sources/${this.sourceID}`;
  }

  get dataFileNameOnly() {
    return `${this.id}.json`;
  }

  get dataURL() {
    return `${this.dataURLSource}/${this.dataFileNameOnly}`;
  }

  get scaleFormatted() {
    if (
      this.scale === "Million" ||
      this.scale === "Mn." ||
      this.scale === "Millions"
    ) {
      return "M";
    }
    if (this.scale === "Billion" || this.scale === "Bn.") {
      return "B";
    }
    if (
      this.scale === "Thousand" ||
      this.scale === "Th." ||
      this.scale === "' 000"
    ) {
      return "K";
    }

    if (this.scale === "Percentage") {
      return "%";
    }
    if (
      this.scale === "Unit" ||
      this.scale === "Number" ||
      this.scale === "Numbers"
    ) {
      return "";
    }
    return this.scale;
  }

  get unitFormatted() {
    if (this.unit === "Unit" || this.unit === "Number") {
      return "Units";
    }
    if (this.unit === "Rs.") {
      return " LKR";
    }
    return this.unit;
  }

  get scaleAndUnitFormatted() {
    if (this.scaleFormatted !== this.unitFormatted) {
      return `${this.scaleFormatted} ${this.unitFormatted}`;
    }
    return `${this.scaleFormatted}`;
  }
  get maxValueFormatted() {
    if (!this.maxValue) {
      return "";
    }
    return `${this.maxValue.toLocaleString()}${this.scaleAndUnitFormatted}`;
  }

  get detailedLabel() {
    if (this.scaleAndUnitFormatted) {
      return `${this.subCategory} (${this.scaleAndUnitFormatted})`;
    }
    return `${this.subCategory}`;
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
        `getRemoteDataResult: Could not acces "${this.dataURL}" (${e})`
      );
      return null;
    }
  }

  static async multigetRemoteDatasetListForSource(sourceID) {
    const urlRemote = `${URL_BASE}/sources/${sourceID}/summary.json`;
    const dataListRaw = await WWW.json(urlRemote);
    const filteredDataListRaw = dataListRaw.filter((d) => d.summary_statistics);
    return filteredDataListRaw.map((d) => Dataset.fromRaw(d));
  }

  static async multigetRemoteDatasetList() {
    // TODO: Change to use DATA_SOURCE_IDX!
    const datasetListCBSL = await Dataset.multigetRemoteDatasetListForSource(
      "cbsl"
    );
    const datasetListWorldBank =
      await Dataset.multigetRemoteDatasetListForSource("world_bank");
    const datasetList =  [].concat(datasetListCBSL, datasetListWorldBank);
    return datasetList.sort((a, b) => a.subCategory.localeCompare(b.subCategory));
  }

  static async multigetRemoteDatasetIdx() {
    const datasetList = await Dataset.multigetRemoteDatasetList();
    const datasetIdx = {};
    for (const dataset of datasetList) {
      datasetIdx[dataset.id] = dataset;
      // DEPRECATED: Support legacyID in URLContext
      datasetIdx[dataset.legacyID] = dataset;
    }
    return datasetIdx;
  }
}
