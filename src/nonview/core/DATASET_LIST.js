import { RAW_DATASET_LIST } from "../../nonview/core/RAW_DATASET_LIST";
import Dataset from "../../nonview/core/Dataset";

const DATASET_LIST = RAW_DATASET_LIST.map((d) => Dataset.fromRaw(d))
  .filter((dataset) => dataset.isValidForVisualization())
  .sort((a, b) => a.subCategory.localeCompare(b.subCategory));

export default DATASET_LIST;
