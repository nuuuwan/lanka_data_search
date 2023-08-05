import DATA_SOURCE_IDX from "../DATA_SOURCE_IDX.js";
import md5 from "md5-hash";
import DatasetBase from "./DatasetBase.js";
import Scale from "../Scale.js";
import Unit from "../Unit.js";
import Emoji from "../Emoji.js";
import Color from "../Color.js";

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
        this.frequencyName,
        this.iSubject,
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
    const haystack =
      this.subCategory +
      "" +
      this.category.replace("World Bank - Sri Lanka Data", "");
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
    return Color.forText(this.subCategory);
  }

  get lastUpdateTimeFormatted() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(this.lastUpdateTimeUT * 1_000).toLocaleString(
      "en-US",
      options
    );
  }

  get subCategoryMultiline() {
    const MAX_LINE_LENGTH = 80;
    const words = this.subCategory.split(" ");
    let lineList = [[]];
    for (let word of words) {
      if (
        lineList[lineList.length - 1].join(" ").length + word.length <
        MAX_LINE_LENGTH
      ) {
        lineList[lineList.length - 1].push(word);
      } else {
        lineList.push([]);
      }
    }
    return lineList.map((line) => line.join(" "));
  }
}
