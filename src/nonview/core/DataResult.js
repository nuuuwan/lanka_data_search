const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default class DataResult {
  constructor(labels, values) {
    this.labels = labels;
    this.values = values;
  }

  static parseValue(x) {
    if (x === null) {
      return null;
    }

    x = x.toString();
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

  static translateLabel(label) {
    if (label.length === 4) {
      return label + "-01-01";
    }
    if (label.length === 7) {
      return label + "-01";
    }
    for (let i = 0; i < MONTHS.length; i++) {
      const month = MONTHS[i];
      if (label.endsWith(month)) {
        return (
          label.substring(0, 4) +
          "-" +
          (i + 1).toString().padStart(2, "0") +
          "-01"
        );
      }
    }
    return label;
  }

  static fromRemoteData(remoteData) {
    const innerData = remoteData.data;
    const cleanedInnerDataEntries = Object.entries(innerData)
      .map(([k, v]) => [k, DataResult.parseValue(v)])
      .filter(([_, v]) => v);

    const labels = cleanedInnerDataEntries
      .map((x) => x[0])
      .map(DataResult.translateLabel);
    const values = cleanedInnerDataEntries.map((x) => x[1]);
    return new DataResult(labels, values);
  }

  getValuesForLabels(labels) {
    return labels.map((label) => this.values[this.labels.indexOf(label)]);
  }

  static getAllLabels(dataResultList) {
    const labelsList = dataResultList.map((dataResult) => dataResult.labels);
    const labels = labelsList.flat();
    const uniqueLabels = [...new Set(labels)];
    const sortedUniqueLabels = uniqueLabels.sort();
    return sortedUniqueLabels;
  }

  get zValues() {
    const values = this.values;
    const n = values.length;
    const mean = values.reduce((a, b) => a + b) / n;
    const std =
      Math.sqrt(
        values.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      ) || 1;
    return values.map((x) => (x - mean) / std);
  }
  getZValuesForLabels(labels) {
    return labels.map((label) => this.zValues[this.labels.indexOf(label)]);
  }
}
