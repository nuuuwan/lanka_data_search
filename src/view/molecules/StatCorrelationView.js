import React from "react";
import DataResult from "../../nonview/core/DataResult";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function getCorrelationText(isPositive, isStrong, isMild) {
  let correlationText = "";
  if (isStrong) {
    correlationText = "strong";
  } else if (isMild) {
    correlationText = "mild";
  }

  if (correlationText !== "") {
    if (isPositive) {
      correlationText += " positive";
    } else {
      correlationText += " negative";
    }
    correlationText += " correlation";
  }
  return correlationText;
}

function getColor(isPositive, isMild) {
  if (!isMild) {
    return "black";
  }
  if (isPositive) {
    return "green";
  }
  return "red";
}

export default function StatCorrelationView({ dataResultList }) {
  if (dataResultList.length !== 2) {
    return null;
  }
  const correlation = DataResult.getCorrelation(
    dataResultList[0],
    dataResultList[1]
  );

  if (!(correlation && correlation <= 1 && correlation >= -1)) {
    return null;
  }

  const isPositive = correlation > 0;
  const isStrong = Math.abs(correlation) > 0.9;
  const isMild = Math.abs(correlation) > 0.7;

  let color = getColor(isPositive, isMild);
  let correlationText = getCorrelationText(isPositive, isStrong, isMild);

  return (
    <Paper
      elevation={0}
      sx={{
        color,
        margin: 1,
        padding: 1,
        background: "#fcfcfc",
        borderRadius: 3,
        width: 300,
      }}
    >
      <Typography variant="caption">Pearson Correlation Coefficient</Typography>
      <Typography variant="h6">r = {correlation.toLocaleString()}</Typography>
      <Typography variant="h5">{correlationText}</Typography>
    </Paper>
  );
}
