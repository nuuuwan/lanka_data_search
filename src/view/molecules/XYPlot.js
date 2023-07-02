import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

import DataResult from "../../nonview/core/DataResult";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip);

export default function XYPlot({ dataResult1, dataResult2 }) {
  const { x, y } = DataResult.getXYList(dataResult1, dataResult2);
  const xyList = x.map((x, i) => ({ x, y: y[i] }));

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    datasets: [
      {
        data: xyList,
        backgroundColor: "#000",
      },
    ],
  };

  return <Scatter options={options} data={data} />;
}
