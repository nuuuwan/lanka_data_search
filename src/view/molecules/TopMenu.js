import React from "react";
import IconButton from "@mui/material/IconButton";
import CasinoIcon from "@mui/icons-material/Casino";
import Tooltip from "@mui/material/Tooltip";
import TwitterIcon from "@mui/icons-material/Twitter";
import URLContext from "../../nonview/utils/URLContext";
import ScreenCaptureButton from "./ScreenCaptureButton.js";

export default function TopMenu({ datasetList, refChart }) {
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
      window.location.href,
    ].join("\n");
    const tweetURL =
      "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(tweetURL, "_blank");
  };

  return (
    <>
      <Tooltip title="Open random datasets">
        <IconButton onClick={onClickRandom}>
          <CasinoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Tweet this chart">
        <IconButton onClick={onClickTweet}>
          <TwitterIcon />
        </IconButton>
      </Tooltip>

      <ScreenCaptureButton refChart={refChart} />
    </>
  );
}
