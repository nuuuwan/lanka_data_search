import React from "react";
import DataResult from "../../nonview/core/DataResult";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function equationText(m, c, order) {
  const y = order ? "d₂" : "d₁";
  const x = order ? "d₁" : "d₂";

  return `${y} = ${m.toPrecision(4)}·${x} ${c >= 0 ? "+" : "-"} ${Math.abs(
    c
  ).toPrecision(4)}`;
}

export default function StatEquationView({ dataResultList }) {
  if (dataResultList.length !== 2) {
    return null;
  }
  const { m: m1, c: c1 } = DataResult.fitLine(
    dataResultList[0],
    dataResultList[1]
  );
  const { m: m2, c: c2 } = DataResult.fitLine(
    dataResultList[1],
    dataResultList[0]
  );
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
      <Typography variant="caption">Line Equations</Typography>
      <Typography variant="h6">{equationText(m1, c1, true)}</Typography>
      <Typography variant="h6">{equationText(m2, c2, false)}</Typography>
    </Paper>
  );
}
