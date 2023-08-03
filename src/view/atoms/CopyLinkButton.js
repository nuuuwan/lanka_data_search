import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export default function CopyLinkButton({ handleOnOpenSnackbar }) {
  const onClick = function () {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    handleOnOpenSnackbar(`Copied "${url}" to clipboard.`);
  };
  return (
    <Tooltip title="Copy link">
      <IconButton onClick={onClick} color="primary">
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
}
