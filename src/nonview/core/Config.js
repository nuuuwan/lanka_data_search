import WWW from "../utils/WWW.js";
import DataResult from "./DataResult.js";
const MIN_KEYWORD_LENGTH = 0;
export default class Config {
  constructor(category, subCategory, unit, scale, minT, maxT, latestValue, n) {
    this.category = category;
    this.subCategory = subCategory;
    this.unit = unit;
    this.scale = scale;
    this.minT = minT;
    this.maxT = maxT;
    this.latestValue = latestValue;
    this.n = n;
  }

  static fromRaw(d) {
    return new Config(
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

  get key() {
    return `${this.category}.${this.subCategory}`;
  }

  get dataURL() {
    return `https://raw.githubusercontent.com/nuuuwan/cbsl/data/latest/${this.category}.${this.subCategory}.json`;
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
    if (this.scale === "Thousand" || this.scale === "Th.") {
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
      return "";
    }
    if (this.unit === "Rs.") {
      return " LKR";
    }
    return this.unit;
  }

  get latestValueFormatted() {
    return `${this.latestValue.toLocaleString()}${this.scaleFormatted} ${
      this.unitFormatted
    }`;
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
    const www = new WWW(this.dataURL);
    const remoteData = await www.readJSON();
    return DataResult.fromRemoteData(remoteData);
  }
}
