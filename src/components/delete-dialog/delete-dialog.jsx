import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DeleteDialog({
  openDialog,
  handleDelete,
  handleCloseDialog,
}) {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Are you sure you want to delete your review?</DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
