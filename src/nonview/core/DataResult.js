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

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const HALVES = ["H1", "H2"];
export default class DataResult {
  constructor(labels, values) {
    this.labels = labels;
    this.values = values;
  }

  get valuesNonNull() {
    return this.values.filter((x) => x !== null && x !== undefined);
  }

  get max() {
    return Math.max(...this.valuesNonNull);
  }

  get min() {
    return Math.min(...this.valuesNonNull);
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

    for (let i = 0; i < QUARTERS.length; i++) {
      const quarter = QUARTERS[i];
      if (label.endsWith(quarter)) {
        return (
          label.substring(0, 4) +
          "-" +
          (i * 3 + 1).toString().padStart(2, "0") +
          "-01"
        );
      }
    }

    for (let i = 0; i < HALVES.length; i++) {
      const half = HALVES[i];
      if (label.endsWith(half)) {
        return (
          label.substring(0, 4) +
          "-" +
          (i * 6 + 1).toString().padStart(2, "0") +
          "-01"
        );
      }
    }

    return label;
  }

  static fromRemoteData(remoteData) {
    const innerData = remoteData.cleaned_data;
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

  getDataResultForLabels(labels) {
    const values = this.getValuesForLabels(labels);
    return new DataResult(labels, values);
  }

  static getLabelUnion(dataResultList) {
    const labelsList = dataResultList.map((dataResult) => dataResult.labels);
    let labels = labelsList.flat();
    const labelYears = labels.map((label) => parseInt(label.substring(0, 4)));
    const minYear = Math.min(...labelYears);
    const maxYear = Math.max(...labelYears);

    for (let year = minYear; year <= maxYear; year++) {
      if (!labelYears.includes(year)) {
        const yearLabel = year.toString() + "-01-01";
        labels.push(yearLabel);
      }
    }

    const uniqueLabels = [...new Set(labels)];
    const sortedUniqueLabels = uniqueLabels.sort();
    return sortedUniqueLabels;
  }

  static getLabelIntersection(dataResultList) {
    return dataResultList
      .reduce(function (labelIntersection, dataResult) {
        const labels = dataResult.labels;
        if (labelIntersection === null) {
          return labels;
        }
        return labelIntersection.filter((x) => labels.includes(x));
      }, null)
      .sort();
  }

  static getCorrelation(dataResult1, dataResult2) {
    const commonLabels = DataResult.getLabelIntersection([
      dataResult1,
      dataResult2,
    ]);
    const values1 = dataResult1.getValuesForLabels(commonLabels);
    const values2 = dataResult2.getValuesForLabels(commonLabels);
    const n = commonLabels.length;
    if (n < 5) {
      return null;
    }
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

  static getXYList(dataResult1, dataResult2) {
    const commonLabels = DataResult.getLabelIntersection([
      dataResult1,
      dataResult2,
    ]);
    const x = dataResult1.getValuesForLabels(commonLabels);
    const y = dataResult2.getValuesForLabels(commonLabels);
    return { x, y };
  }

  static fitLine(dataResult1, dataResult2) {
    const { x, y } = DataResult.getXYList(dataResult1, dataResult2);
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumXSquared = x.reduce((a, b) => a + b * b, 0);
    const m = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX * sumX);
    const c = (sumY - m * sumX) / n;
    return { m, c, x, y, n };
  }
}
