import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

export default function CopyLinkButton() {
  const onClick = function () {
    navigator.clipboard.writeText(window.location.href);
  };
  return (
    <IconButton onClick={onClick} color="primary">
      <ContentCopyIcon />
    </IconButton>
  );
}
