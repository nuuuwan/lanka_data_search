import DataSource from "./DataSource.js";
const DATA_SOURCE_IDX = {
  cbsl: new DataSource(
    "cbsl",
    "Central Bank of Sri Lanka",
    "Economic Data Library",
    "https://www.cbsl.lk/eresearch",
    "@CBSL"
  ),
  world_bank: new DataSource(
    "world_bank",
    "World Bank",
    "Sri Lanka - Dataset",
    "https://data.worldbank.org/country/LK",
    "@WorldBank"
  ),
  imf: new DataSource(
    "imf",
    "International Monetary Fund",
    "Sri Lanka - Dataset",
    "https://www.imf.org/external/datamapper",
    "@IMFNews"
  ),
  adb: new DataSource(
    "adb",
    "Asian Development Bank",
    "Sri Lanka - Dataset",
    "https://www.adb.org/countries/sri-lanka/data",
    "@ADB_HQ"
  ),
  dmtlk: new DataSource(
    "dmtlk",
    "Department of Motor Traffic, Sri Lanka",
    "Statistics",
    "https://dmt.gov.lk/index.php?option=com_content&view=article&id=16&Itemid=132&lang=en",
    "#DeptMotorTrafficLK"
  ),
  sltda: new DataSource(
    "sltda",
    "Sri Lanka Tourism Development Authority",
    "Statistics",
    "https://www.sltda.gov.lk/en/statistics",
    "@sltda_srilanka"
  ),
};

export const DATA_SOURCE_LIST = Object.values(DATA_SOURCE_IDX);

export const DATA_SOURCE_ID_LIST = DATA_SOURCE_LIST.map((d) => d.id);

export default DATA_SOURCE_IDX;
