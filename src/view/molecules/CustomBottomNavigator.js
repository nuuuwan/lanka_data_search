import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import CasinoIcon from "@mui/icons-material/Casino";
import TwitterIcon from "@mui/icons-material/Twitter";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import URLContext from "../../nonview/utils/URLContext";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useScreenshot } from "use-react-screenshot";
import Tooltip from "@mui/material/Tooltip";
export default function CustomBottomNavigator({ datasetList, refChart }) {
  const onClickRandom = function () {
    URLContext.setContext({ datasetKeyList: undefined });
    window.location.reload();
  };

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

  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation>
          <Tooltip title="Open Random Dataset">
            <BottomNavigationAction
              icon={<CasinoIcon />}
              onClick={onClickRandom}
            />
          </Tooltip>

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
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
