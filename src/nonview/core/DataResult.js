import { MONTHS, QUARTERS, HALVES } from "./TimeConstants.js";
const tf = require("@tensorflow/tfjs");

export function sigmoid(x) {
  const y = 1.0 / (1.0 + Math.exp(-x));

  return y;
}
export function inverseSigmoid(y) {
  const x = Math.log(y / (1 - y));

  return x;
}

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

  static isSameDayOfYear(labels) {
    const daysOfYear = labels.map((label) => label.substring(4));
    const uniqueDaysOfYear = [...new Set(daysOfYear)];
    return uniqueDaysOfYear.length === 1;
  }

  static isSameDayOfMonth(labels) {
    const daysOfMonth = labels.map((label) => label.substring(7));
    const uniqueDaysOfMonth = [...new Set(daysOfMonth)];
    return uniqueDaysOfMonth.length === 1;
  }

  static simplifyLabels(labels) {
    if (DataResult.isSameDayOfYear(labels)) {
      return labels.map((label) => label.substring(0, 4));
    }
    if (DataResult.isSameDayOfMonth(labels)) {
      return labels.map((label) => label.substring(0, 7));
    }
    return labels;
  }

  static async projectResults({ labels, datasets }) {
    const nDataSets = datasets.length;
    if (nDataSets !== 1) {
      return { labels, datasets };
    }
    const zList = datasets[0].data;
    const nZList = zList.length;
    const N_MODEL_WINDOW = 36;
    const N_PREDICTION_WINDOW = 6;

    console.debug({ nZList, N_MODEL_WINDOW, N_PREDICTION_WINDOW });
    if (nZList < N_MODEL_WINDOW) {
      return { labels, datasets };
    }

    const Xs = [];
    const ys = [];

    for (let i = 0; i < nZList - N_MODEL_WINDOW; i++) {
      const Xsi = zList.slice(i, i + N_MODEL_WINDOW);
      const meanXsi = Xsi.reduce((a, b) => a + b, 0) / N_MODEL_WINDOW;
      const Xsi2 = Xsi.map((x) => x / meanXsi);

      Xs.push(Xsi2);
      const ysi = zList[i + N_MODEL_WINDOW] / meanXsi;
      ys.push([ysi]);
    }

    const n = Xs.length;
    const m = Xs[0].length;
    console.debug({ n, m, Xs, ys });

    const tXs = tf.tensor2d(Xs);
    const tys = tf.tensor2d(ys);

    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [m], units: 12, activation: "relu" }),
        tf.layers.dense({ units: 1, activation: "relu" }),
      ],
    });
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    await model.fit(tXs, tys, { epochs: 10, shuffle: false });

    let zListExpanded = zList.slice();
    for (let i = 0; i < N_PREDICTION_WINDOW; i++) {
      const iStart = nZList - N_MODEL_WINDOW + i;
      const Xsi = zListExpanded.slice(iStart, iStart + N_MODEL_WINDOW);
      const meanXsi = Xsi.reduce((a, b) => a + b, 0) / N_MODEL_WINDOW;
      const Xsi2 = Xsi.map((x) => x / meanXsi);

      const yHat = model.predict(tf.tensor2d([Xsi2])).dataSync()[0];
      const v = yHat * meanXsi;
      zListExpanded.push(v);

      labels.push("+" + (i + 1).toString());
      datasets[0].data.push(v);

      console.debug({ i, Xsi, meanXsi, Xsi2, yHat, v });
    }

    return { labels, datasets };
  }
}
