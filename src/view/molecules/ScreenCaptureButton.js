import React from "react";
import { useScreenshot } from "use-react-screenshot";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function ScreenCaptureButton({ refChart }) {
  const takeScreenshot = useScreenshot()[1];

  const download = function (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    link.click();
  };

  const onClickDownloadChartImage = function () {
    takeScreenshot(refChart.current).then(download);
  };

  return (
    <Tooltip title="Download Chart Image">
      <IconButton onClick={onClickDownloadChartImage}>
        <BarChartIcon />
      </IconButton>
    </Tooltip>
  );
}
