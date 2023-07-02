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

function getColor(i, n) {
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
  const { sameYAxisScale, commonDataOnly } = options;

  let titleText = "",
    displayTitle = false,
    positionLegend = "right";
  if (datasetList.length === 1) {
    titleText = datasetList[0].detailedLabel;
    displayTitle = true;
    positionLegend = "bottom";
  }

  let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    plugins: {
      title: {
        display: displayTitle,
        text: titleText,
        font: { size: 24 },
      },
      legend: {
        position: positionLegend,
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

  const colorSet = new Set(datasetList.map((dataset) => dataset.color).filter((color) => color !== null));
  const showCustomColor = colorSet.size === datasetList.length;

  const datasets = dataResultList.map(function (dataResult, i) {
    const data = dataResult.getValuesForLabels(labels);
    const color = showCustomColor ? datasetList[i].color : getColor(i, datasetList.length);
    const label = datasetList[i].detailedLabel;
    let dataset = {
      label,
      data,
      backgroundColor: color,
      borderColor: color,
    };
    if (!sameYAxisScale) {
      dataset.yAxisID = `y${i}`;
      chartOptions.scales[dataset.yAxisID] = {
        ticks: { color },
        display: true,
      };
    } else {
      dataset.yAxisID = "y";
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
