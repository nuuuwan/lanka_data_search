import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";

export default function TweetButton({ datasetList }) {
  const onClick = function () {
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

  return (
    <IconButton onClick={onClick}>
      <TwitterIcon />
    </IconButton>
  );
}
