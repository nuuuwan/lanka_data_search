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

function getColor(i, n) {
  if (i < 3) {
    return ["#080", "#f80", "#800"][i];
  }
  const hue = ((i - 3) * 240) / (n - 1 - 3);
  return `hsla(${hue}, 100%, 50%, 0.5)`;
}

export default function MultiLineChart({ configList, dataResultList, isZ }) {
  if (dataResultList.length === 0) {
    return null;
  }

  let options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels = DataResult.getAllLabels(dataResultList);

  const datasets = dataResultList.map(function (dataResult, i) {
    const data = isZ
      ? dataResult.getZValuesForLabels(labels)
      : dataResult.getValuesForLabels(labels);
    const color = getColor(i, configList.length);
    const label = configList[i].detailedLabel;
    let dataset = {
      label,
      data,
      backgroundColor: color,
      borderColor: color,
    };
    if (!isZ) {
      dataset.yAxisID = label;
    }
    return dataset;
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <Box>
      <Line options={options} data={chartData} />
    </Box>
  );
}
