import { Typography, Box, Link } from "@mui/material";
import { VERSION, VERSION_INFO } from "../../nonview/core/Version";
export default function VersionView() {
  return (
    <Box sx={{ margin: 2, padding: 2, textAlign: "center" }}>
      <Typography variant="body2">
        {VERSION} by{" "}
        <Link href="https://www.github.com/nuuuwan/" target="_blank">
          nuuuwan
        </Link>
      </Typography>
      <Typography variant="caption" sx={{ color: "#ccc" }}>
        {VERSION_INFO}
      </Typography>
    </Box>
  );
}
