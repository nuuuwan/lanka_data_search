import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

  Legend
);

function getColor(i, n) {
  if (i < 3) {
    return ["#080", "#f80", "#800"][i];
  }
  const hue = ((i - 3) * 240) / (n - 1 - 3);
  return `hsla(${hue}, 100%, 50%, 0.5)`;
}

export default function MultiLineChart({
  configList,
  dataResultList,
  sameYAxisScale,
}) {
  if (dataResultList.length === 0) {
    return null;
  }

  let options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {},
  };

  const labels = DataResult.getAllLabels(dataResultList);

  const datasets = dataResultList.map(function (dataResult, i) {
    const data = dataResult.getValuesForLabels(labels);
    const color = getColor(i, configList.length);
    const label = configList[i].detailedLabel;
    let dataset = {
      label,
      data,
      backgroundColor: color,
      borderColor: color,
    };
    if (!sameYAxisScale) {
      dataset.yAxisID = `y${i}`;
      options.scales[dataset.yAxisID] = { ticks: { color } };
    } else {
      dataset.yAxisID = "y";
    }

    return dataset;
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const height = Math.max(400, parseInt((window.innerWidth * 0.8 * 9) / 16));
  return (
    <Box>
      <Line options={options} data={chartData} height={height} />
    </Box>
  );
}
