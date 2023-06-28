import { Typography, Box, Link } from "@mui/material";
import { VERSION } from "../../nonview/core/Version";
export default function VersionView() {
  return (
    <Box sx={{ margin: 1, padding: 1, textAlign: "center" }}>
      <Typography variant="body2">
        {VERSION} by{" "}
        <Link href="https://www.github.com/nuuuwan/" target="_blank">
          nuuuwan
        </Link>
      </Typography>
    </Box>
  );
}
