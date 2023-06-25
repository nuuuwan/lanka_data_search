import CONFIG_LIST from "../../nonview/core/CONFIG_LIST";
import RandomX from "../../nonview/utils/RandomX";
const DEFAULT_LIMIT = 100;
export default class Search {
  static search(keywords, limit = DEFAULT_LIMIT) {
    let allResults = CONFIG_LIST.filter((config) => config.isMatch(keywords));
    RandomX.shuffle(allResults);
    return allResults.slice(0, limit);
  }
}
