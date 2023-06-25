import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

export const options = {
  responsive: true,
};

export default function LineChart({ dataResult }) {
  const chartData = {
    labels: dataResult.labels,
    datasets: [
      {
        data: dataResult.values,
        borderColor: "#084",
        backgroundColor: "#fff",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
