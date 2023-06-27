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

  static getLabelUnion(dataResultList) {
    const labelsList = dataResultList.map((dataResult) => dataResult.labels);
    const labels = labelsList.flat();
    const uniqueLabels = [...new Set(labels)];
    const sortedUniqueLabels = uniqueLabels.sort();
    return sortedUniqueLabels;
  }

  static getLabelIntersection(dataResultList) {
    return dataResultList.reduce(function (labelIntersection, dataResult) {
      const labels = dataResult.labels;
      if (labelIntersection === null) {
        return labels;
      }
      return labelIntersection.filter((x) => labels.includes(x));
    }, null);
  }

  static getCorrelation(dataResult1, dataResult2) {
    const commonLabels = DataResult.getLabelIntersection([
      dataResult1,
      dataResult2,
    ]);
    const values1 = dataResult1.getValuesForLabels(commonLabels);
    const values2 = dataResult2.getValuesForLabels(commonLabels);
    const n = commonLabels.length;
    const sum1 = values1.reduce((a, b) => a + b, 0);
    const sum2 = values2.reduce((a, b) => a + b, 0);
    const sum1Squared = values1.reduce((a, b) => a + b * b, 0);
    const sum2Squared = values2.reduce((a, b) => a + b * b, 0);
    const sumProduct = values1.reduce((a, b, i) => a + b * values2[i], 0);
    const numerator = n * sumProduct - sum1 * sum2;
    const denominator = Math.sqrt(
      (n * sum1Squared - sum1 * sum1) * (n * sum2Squared - sum2 * sum2)
    );
    return numerator / denominator;
  }

  static fitLine(dataResult1, dataResult2) {
    const commonLabels = DataResult.getLabelIntersection([
      dataResult1,
      dataResult2,
    ]);
    const x = dataResult1.getValuesForLabels(commonLabels);
    const y = dataResult2.getValuesForLabels(commonLabels);
    const n = commonLabels.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumXSquared = x.reduce((a, b) => a + b * b, 0);
    const m = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX * sumX);
    const c = (sumY - m * sumX) / n;
    return { m, c };
  }
}
