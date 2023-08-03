import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export default function CopyLinkButton() {
  const onClick = function () {
    navigator.clipboard.writeText(window.location.href);
  };
  return (
    <Tooltip title="Copy link">
      <IconButton onClick={onClick} color="primary">
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
}
