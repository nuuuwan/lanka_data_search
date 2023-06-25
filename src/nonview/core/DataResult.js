export default class DataResult {
  constructor(labels, values) {
    this.labels = labels;
    this.values = values;
  }

  static parseValue(x) {
    x = x.replaceAll(",", "");
    try {
      if (x.includes(".")) {
        return parseFloat(x);
      }
      return parseInt(x);
    } catch (e) {
      return null;
    }
  }

  static fromRemoteData(remoteData) {
    const innerData = remoteData.data;
    const cleanedInnerDataEntries = Object.entries(innerData)
      .map(([k, v]) => [k, DataResult.parseValue(v)])
      .filter(([_, v]) => v);

    const labels = cleanedInnerDataEntries.map((x) => x[0]);
    const values = cleanedInnerDataEntries.map((x) => x[1]);
    return new DataResult(labels, values);
  }

  getMovingAverage(window) {
    const n = this.values.length;
    let values = [];
    for (let i = 0; i < window; i++) {
      values.push(undefined);
    }
    for (let i = window; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < window; j++) {
        sum += this.values[i - j];
      }
      values.push(sum / window);
    }
    console.log(values, this.values);
    return values;
  }
}
