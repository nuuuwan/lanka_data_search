import WWW from "../utils/WWW.js";
import DataResult from "./DataResult.js";
import DATA_SOURCE_IDX from "./DATA_SOURCE_IDX.js";
import md5 from "md5-hash";
import EMOJI_TO_TEXT_LIST from "./EMOJI_TO_TEXT_LIST.js";
import COLOR_TO_TEXT_LIST from "./COLOR_TO_TEXT_LIST.js";
const MIN_KEYWORD_LENGTH = 0;

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/lanka_data_timeseries/data";

function formatT(t) {
  if (!t) {
    return "";
  }
  return t.toString().replaceAll("-01", "");
}

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
      raw.footnotes,
      summaryStatistics.n,
      summaryStatistics.min_t,
      summaryStatistics.max_t,
      summaryStatistics.min_value,
      summaryStatistics.max_value
    );
  }

  isValidForVisualization() {
    return this.n >= 1;
  }

  get tweetText() {
    return `📊 ${this.subCategory} - ${this.source.twitterHandle}`;
  }

  get legacyID() {
    return this.subCategory;
  }

  get id() {
    return `${this.sourceID}.${this.subCategory}.${this.frequencyName}`;
  }

  get shortID() {
    return md5(this.id).slice(0, 8);
  }

  get dataHash() {
    return md5(
      JSON.stringify([
        this.sourceID,
        // this.category,
        // this.subCategory,
        // this.scale,
        // this.unit,
        this.frequencyName,
        this.iSubject,
        // this.footnotes,
        this.n,
        this.minT,
        this.maxT,
        this.minValue,
        this.maxValue,
      ])
    );
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

  get emojis() {
    const haystack = (
      this.subCategory +
      "" +
      this.category.replace("World Bank - Sri Lanka Data", "")
    ).toLowerCase();
    return Object.entries(EMOJI_TO_TEXT_LIST).reduce(function (
      s,
      [emoji, textList]
    ) {
      for (const text of textList) {
        if (haystack.includes(text.toLowerCase())) {
          return `${emoji}${s}`;
        }
      }
      return s;
    },
    "");
  }

  get detailedLabel() {
    return `${this.subCategory} [${this.frequencyName} ${this.scaleAndUnitFormatted}]`;
  }

  get detailedLabelWithEmojis() {
    return `${this.emojis} ${this.subCategory} [${this.frequencyName} ${this.scaleAndUnitFormatted}]`;
  }

  get minTFormatted() {
    return formatT(this.minT);
  }

  get maxTFormatted() {
    return formatT(this.maxT);
  }

  get color() {
    for (const [color, keyList] of Object.entries(COLOR_TO_TEXT_LIST)) {
      for (const key of keyList) {
        if (this.subCategory.toLowerCase().includes(key)) {
          return color;
        }
      }
    }
    return null;
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

  static async multigetRemoteDatasetList(sourceID) {
    const urlRemote = `${URL_BASE}/summary.json`;
    const dataListRaw = await WWW.json(urlRemote);
    const filteredDatasetList = dataListRaw
      .map((d) => Dataset.fromRaw(d))
      .filter((dataset) => dataset.isValidForVisualization());
    const dedupedDatasetList = Object.values(
      filteredDatasetList.reduce((idx, dataset) => {
        idx[dataset.dataHash] = dataset;
        return idx;
      }, {})
    );
    const sortedDatasetList = dedupedDatasetList.sort((a, b) =>
      a.subCategory.localeCompare(b.subCategory)
    );

    return sortedDatasetList;
  }

  static async multigetRemoteDatasetIdx() {
    const datasetList = await Dataset.multigetRemoteDatasetList();
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
    return Object.values(Dataset.getUniqueDatasetList(datasetIdx)).length;
  }

  static getDataSourceListLength(datasetIdx) {
    const allSourceIDList = Object.values(datasetIdx).map((x) => x.sourceID);
    const uniqueSourceIDList = [...new Set(allSourceIDList)];
    return uniqueSourceIDList.length;
  }
}
