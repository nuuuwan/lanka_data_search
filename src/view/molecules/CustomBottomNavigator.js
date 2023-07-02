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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
    navigator.clipboard.writeText(window.location.href)
  };

  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation>
          <Tooltip title="Tweet Dataset">
            <BottomNavigationAction
              icon={<TwitterIcon onClick={onClickTweet} />}
            />
          </Tooltip>

          <Tooltip title="Download Chart Image">
            <BottomNavigationAction
              icon={<FileDownloadIcon onClick={onClickDownloadChartImage} />}
            />
          </Tooltip>

          <Tooltip title="Clear All">
            <BottomNavigationAction
              icon={<ClearIcon />}
              onClick={onClickClearAll}
            />
          </Tooltip>
          <Tooltip title="Add Random Dataset">
            <BottomNavigationAction
              icon={<AddIcon />}
              onClick={onClickRandom}
            />
          </Tooltip>

          <Tooltip title="Copy Link">
            <BottomNavigationAction
              icon={<ContentCopyIcon onClick={onClickCopyLink} />}
            />
          </Tooltip>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
