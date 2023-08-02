import DATA_SOURCE_IDX from "../DATA_SOURCE_IDX.js";
import md5 from "md5-hash";
import DatasetBase from "./DatasetBase.js";
import COLOR_TO_TEXT_LIST from "../COLOR_TO_TEXT_LIST.js";
import Scale from "../Scale.js";
import Unit from "../Unit.js";
import Emoji from "../Emoji.js";
const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/lanka_data_timeseries/data";

function formatT(t) {
  if (!t) {
    return "";
  }
  return t.toString().replaceAll("-01", "");
}

export default class DatasetBaseProps extends DatasetBase {
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
    return new Scale(this.scale).formatted;
  }

  get unitFormatted() {
    return new Unit(this.unit).formatted;
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
    return new Emoji(haystack).emojis;
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
}
