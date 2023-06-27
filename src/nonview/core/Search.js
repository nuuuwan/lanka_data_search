import DATASET_LIST from "../../nonview/core/DATASET_LIST";
import RandomX from "../../nonview/utils/RandomX";
const DEFAULT_LIMIT = 100;
const DEFAULT_LIMIT_SHORT = 3;
const SHORT_WORDS = 3;

export default class Search {
  static search(keywords) {
    let allResults = DATASET_LIST.filter((dataset) =>
      dataset.isMatch(keywords)
    );
    if (keywords.length <= SHORT_WORDS) {
      RandomX.shuffle(allResults);
    }
    const limit =
      keywords.length <= SHORT_WORDS ? DEFAULT_LIMIT_SHORT : DEFAULT_LIMIT;
    return allResults.slice(0, limit);
  }
}
