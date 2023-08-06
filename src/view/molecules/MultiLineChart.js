import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import DataResult from "../../nonview/core/DataResult.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

const MAX_HEIGHT = 630;
const ASPECT_RATIO = 1;
const MIN_HEIGHT = MAX_HEIGHT * 0.5;

export function getColor(i, n) {
  if (i < 3) {
    return ["#080", "#f80", "#800"][i];
  }
  const hue = ((i - 3) * 240) / (n - 1 - 3);
  return `hsla(${hue}, 100%, 50%, 0.5)`;
}

export default function MultiLineChart({
  datasetList,
  dataResultList,
  options,
  refChart,
}) {
  if (dataResultList.length === 0) {
    return null;
  }
  const { sameYAxisScale, commonDataOnly, proportionalAxes } = options;

  let titleText = "";
  let displayTitle = false;
  if (datasetList.length === 1) {
    titleText = datasetList[0].subCategoryMultiline;
    displayTitle = true;
  }

  let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    plugins: {
      title: {
        display: displayTitle,
        text: titleText,
        font: { size: 30 },
      },
      legend: {
        position: "top",
        align: "start",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
      },
    },
  };

  const getLabels = commonDataOnly
    ? DataResult.getLabelIntersection
    : DataResult.getLabelUnion;
  const labels = getLabels(dataResultList);
  const dataResultListForLabels = dataResultList.map((dr) =>
    dr.getDataResultForLabels(labels)
  );

  const colorSet = new Set(
    datasetList
      .map((dataset) => dataset.color)
      .filter((color) => color !== null)
  );
  const showCustomColor = colorSet.size === datasetList.length;

  const minSpanRatio = Math.min(
    ...dataResultListForLabels.map((dr) => dr.min / dr.max)
  );

  const datasets = dataResultListForLabels.map(function (dataResult, i) {
    const datasetCore = datasetList[i];
    const color = showCustomColor
      ? datasetCore.color
      : getColor(i, datasetList.length);

    const values = dataResult.values;
    const absValues = values
      .filter((v) => v !== undefined)
      .map((v) => Math.abs(v));
    const maxAbsValue = Math.max(...absValues);
    const logMaxAbsValue = Math.log10(maxAbsValue);
    const scale = Math.max(1, Math.pow(10, Math.floor(logMaxAbsValue / 3) * 3));
    const scaledValues = values.map((v) => v / scale);
    const scaleStr = scale === 1 ? "" : " x " + scale.toLocaleString();

    let dataset = {
      data: scaledValues,
      backgroundColor: color,
      borderColor: color,
    };
    if (!sameYAxisScale) {
      dataset.yAxisID = `y${i}`;
      const actualMin = dataResult.min / scale;
      const actualMax = proportionalAxes
        ? dataResult.min / scale / minSpanRatio
        : dataResult.max / scale;
      const span = actualMax - actualMin;
      const padding = span * 0.05;

      chartOptions.scales[dataset.yAxisID] = {
        min: actualMin - padding,
        max: actualMax + padding,
        ticks: { color },
        display: true,
        title: {
          display: true,
          text: datasetCore.scaleAndUnitFormatted + scaleStr,
        },
      };
      dataset.label = datasetCore.subCategory;
    } else {
      dataset.yAxisID = "y";
      dataset.label = datasetCore.detailedLabel;

      chartOptions.scales[dataset.yAxisID] = {
        ticks: { color },
        display: true,
        title: {
          display: true,
          text: datasetCore.scaleAndUnitFormatted + scaleStr,
        },
      };
    }

    return dataset;
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const height = Math.min(
    MAX_HEIGHT,
    Math.max(MIN_HEIGHT, parseInt((window.innerWidth * 0.8 * 9) / 16))
  );
  const width = height * ASPECT_RATIO;

  return (
    <Box>
      <div id="multi-line-chart" ref={refChart}>
        <Line
          options={chartOptions}
          data={chartData}
          height={height}
          width={width}
        />
      </div>
    </Box>
  );
}
