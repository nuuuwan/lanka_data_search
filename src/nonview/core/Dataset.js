import WWW from "../utils/WWW.js";
import DataResult from "./DataResult.js";
import DATA_SOURCE_IDX from "./DATA_SOURCE_IDX.js";
const MIN_KEYWORD_LENGTH = 0;

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/lanka_data_timeseries/data";

export default class Dataset {
  constructor(category, subCategory, unit, scale, minT, maxT, latestValue, n) {
    this.category = category;
    this.subCategory = subCategory;
    this.unit = unit;
    this.scale = scale;
    this.minT = minT;
    this.maxT = maxT;
    this.latestValue = latestValue === null ? 0 : latestValue;
    this.n = n;
  }

  static fromRaw(d) {
    return new Dataset(
      d.category,
      d.sub_category,
      d.unit,
      d.scale,
      d.min_t,
      d.max_t,
      d.latest_value,
      d.n
    );
  }

  isValidForVisualization() {
    return this.n > 1;
  }

  get tweetText() {
    return `📊 ${this.subCategory} - @${this.source.twitterHandle}`;
  }

  get key() {
    return this.subCategory;
  }

  get sourceID() {
    if (this.category === "World Bank - Sri Lanka Data") {
      return "world_bank";
    }
    return "cbsl";
  }

  get source() {
    return DATA_SOURCE_IDX[this.sourceID];
  }

  get dataURL() {
    return `${URL_BASE}/${this.source.remoteBaseDir}/${this.category}.${this.subCategory}.json`;
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
  get latestValueFormatted() {
    return `${this.latestValue.toLocaleString()}${this.scaleAndUnitFormatted}`;
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
      return null;
    }
  }
}
