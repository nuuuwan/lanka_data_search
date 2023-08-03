import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconButton from "@mui/material/IconButton";
import { useScreenshot } from "use-react-screenshot";
import Tooltip from "@mui/material/Tooltip";
export default function DownloadChartImageButton({ datasetList, refChart }) {
  const takeScreenshot = useScreenshot()[1];
  const imagePrefix = datasetList.map((dataset) => dataset.id).join("-");

  const download = function (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = `${imagePrefix}.png`;
    link.click();
  };

  const onClick = function () {
    takeScreenshot(refChart.current).then(download);
  };

  return (
    <Tooltip title="Download Chart as Image">
      {" "}
      <IconButton onClick={onClick} color="primary">
        <FileDownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
