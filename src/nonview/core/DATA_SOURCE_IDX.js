import DataSource from "./DataSource.js";
const DATA_SOURCE_IDX = {
  cbsl: new DataSource(
    "cbsl",
    "Central Bank of Sri Lanka",
    "Economic Data Library",
    "https://www.cbsl.lk/eresearch",
    "latest",
    "CBSL"
  ),
  world_bank: new DataSource(
    "world_bank",
    "World Bank",
    "Sri Lanka - Dataset",
    "https://data.worldbank.org/country/LK",
    "other_sources/world_bank",
    "WorldBank"
  ),
};

export const DATA_SOURCE_LIST = Object.values(DATA_SOURCE_IDX);

export const DATA_SOURCE_ID_LIST = DATA_SOURCE_LIST.map((d) => d.id);

export default DATA_SOURCE_IDX;
