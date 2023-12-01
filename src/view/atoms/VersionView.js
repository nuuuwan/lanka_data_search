import { Typography, Box, Link } from "@mui/material";
import ButtonRefresh from "./ButtonRefresh";
import Grid from "@mui/material/Grid";
import ButtonReportBug from "./ButtonReportBug";

import { VERSION } from "../../nonview/constants";

export default function VersionView() {
  return (
    <Box sx={{ marginTop: 10, padding: 2, textAlign: "center" }}>
      <Typography variant="body2">
        {"Last update at " + VERSION.DATETIME_STR + " by "}
        <Link href="https://www.github.com/nuuuwan/" target="_blank">
          nuuuwan
        </Link>
      </Typography>
      <Grid container justifyContent="center">
        <ButtonRefresh />
        <ButtonReportBug />
      </Grid>
    </Box>
  );
}
