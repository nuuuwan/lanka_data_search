export default class DatasetBase {
  constructor(
    sourceID,
    category,
    subCategory,
    scale,
    unit,
    frequencyName,
    iSubject,
    footnotes,
    n,
    minT,
    maxT,
    minValue,
    maxValue,
    lastUpdateTimeUT
  ) {
    this.sourceID = sourceID;
    this.category = category;
    this.subCategory = subCategory;
    this.scale = scale;
    this.unit = unit;
    this.frequencyName = frequencyName;
    this.iSubject = iSubject;
    this.footnotes = footnotes;
    this.n = n;
    this.minT = minT;
    this.maxT = maxT;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.lastUpdateTimeUT = lastUpdateTimeUT;
  }
}
