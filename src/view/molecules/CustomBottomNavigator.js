import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import TwitterIcon from "@mui/icons-material/Twitter";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useScreenshot } from "use-react-screenshot";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// <Tooltip title="Help">
//   <BottomNavigationAction
//     icon={<HelpOutlineIcon onClick={onClickHelp} />}
//   />
// </Tooltip>

export default function CustomBottomNavigator({
  datasetList,
  refChart,
  onClickClearAll,
  onClickRandom,
}) {
  const onClickTweet = function () {
    const dataSetText = datasetList.map((x) => x.tweetText).join("\n");
    const tweetText = [
      dataSetText,
      "",
      "#LankaDataSearch by @nuuuwan",
      "",
      window.location.href.replace(
        "http://localhost:3000",
        "https://nuuuwan.github.io"
      ),
    ].join("\n");
    const tweetURL =
      "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(tweetURL, "_blank");
  };

  const takeScreenshot = useScreenshot()[1];
  const imagePrefix = datasetList.map((dataset) => dataset.id).join("-");

  const download = function (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = `${imagePrefix}.png`;
    link.click();
  };

  const onClickDownloadChartImage = function () {
    takeScreenshot(refChart.current).then(download);
  };

  const onClickCopyLink = function () {
    navigator.clipboard.writeText(window.location.href);
  };

  const onClickHelp = function () {
    window.open(
      "https://nuwans.medium.com/discovering-sri-lanka-with-time-series-data-164f89f58047",
      "_blank"
    );
  };

  const hasDatasets = datasetList.length > 0;
  const disableButton = !hasDatasets;
  const iconColor = disableButton ? "#eee" : "#000";
  const sx = { color: iconColor };

  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation>
          <Tooltip title="Tweet Dataset">
            <BottomNavigationAction
              disabled={disableButton}
              icon={<TwitterIcon onClick={onClickTweet} sx={sx} />}
            />
          </Tooltip>
          <Tooltip title="Download Chart Image">
            <BottomNavigationAction
              disabled={disableButton}
              icon={
                <FileDownloadIcon onClick={onClickDownloadChartImage} sx={sx} />
              }
            />
          </Tooltip>
          <Tooltip title="Copy Link">
            <BottomNavigationAction
              disabled={disableButton}
              icon={<ContentCopyIcon onClick={onClickCopyLink} sx={sx} />}
            />
          </Tooltip>
          <Tooltip title="Clear All">
            <BottomNavigationAction
              disabled={disableButton}
              icon={<ClearIcon sx={sx} />}
              onClick={onClickClearAll}
            />
          </Tooltip>

          <Tooltip title="Add Random Dataset">
            <BottomNavigationAction
              icon={<AddIcon />}
              onClick={onClickRandom}
            />
          </Tooltip>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
