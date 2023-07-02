import React from "react";
import DataResult from "../../nonview/core/DataResult";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import XYPlot from "./XYPlot";

const MIN_N = 5;
const SYMBOL1 = "𝑥";
const SYMBOL2 = "𝑦";

function equationText(m, c, order) {
  const y = order ? SYMBOL2 : SYMBOL1;
  const x = order ? SYMBOL1 : SYMBOL2;

  return `${y} = ${m.toPrecision(4)}·${x} ${c >= 0 ? "+" : "-"} ${Math.abs(
    c
  ).toPrecision(4)}`;
}

export default function StatEquationView({ dataResultList, datasetList }) {
  if (dataResultList.length !== 2) {
    return null;
  }
  const {
    m: m1,
    c: c1,
    n,
  } = DataResult.fitLine(dataResultList[0], dataResultList[1]);
  if (n < MIN_N) {
    return null;
  }

  const label1 = datasetList[0].subCategory;
  const label2 = datasetList[1].subCategory;
  return (
    <Paper
      elevation={0}
      sx={{
        margin: 1,
        padding: 1,
        background: "#fcfcfc",
        borderRadius: 3,
        width: 300,
      }}
    >
      <Typography variant="caption">Relationship between Datasets</Typography>
      <Typography variant="h6">{equationText(m1, c1, true)}</Typography>
      <Typography variant="body1">where</Typography>
      <Typography variant="body1">
        {SYMBOL1} = "{label1}"
      </Typography>
      <Typography variant="body1">
        {SYMBOL2} = "{label2}"
      </Typography>
      <XYPlot dataResult1={dataResultList[0]} dataResult2={dataResultList[1]} />
      <Alert severity="warning" sx={{ margin: 1 }}>
        Assuming the relationship is linear.
      </Alert>
    </Paper>
  );
}
