import DataSource from "./DataSource.js";
const DATA_SOURCE_IDX = {
  cbsl: new DataSource(
    "cbsl",
    "Central Bank of Sri Lanka",
    "Economic Data Library",
    "https://www.cbsl.lk/eresearch",
    "latest"
  ),
  world_bank: new DataSource(
    "world_bank",
    "World Bank",
    "Sri Lanka - Dataset",
    "https://data.worldbank.org/country/LK",
    "other_sources/world_bank"
  ),
};

export const DATA_SOURCE_LIST = Object.values(DATA_SOURCE_IDX);

export default DATA_SOURCE_IDX;
