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

  get dataURL() {
    return `https://raw.githubusercontent.com/nuuuwan/cbsl/data/latest/${this.category}.${this.subCategory}.json`;
  }

  isMatch(keywords) {
    if (this.n === 0) {
      return false
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
}
