import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomSnackbar({
  snackbarMessage,
  handleOnCloseSnackbar,
}) {
  const snackbarOpen = snackbarMessage !== null;
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleOnCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2_000}
      onClose={handleOnCloseSnackbar}
      message={snackbarMessage}
      action={action}
    />
  );
}
