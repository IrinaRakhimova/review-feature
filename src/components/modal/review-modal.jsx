import "./review-modal.css";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import ReviewForm from "../form/review-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "400px",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

export default function ReviewModal({
  openModal,
  addReview,
  reviews,
  setOpenModal,
}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isFormSubmitted ? (
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography gutterBottom>
            Your feedback is successfully submitted.
          </Typography>
          <DoneOutlineIcon fontSize="large" sx={{ color: "#aa8d2b", mt: 4 }} />
        </Box>
      ) : (
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
          <ReviewForm
            addReview={addReview}
            reviews={reviews}
            setIsFormSubmitted={setIsFormSubmitted}
          />
        </Box>
      )}
    </Modal>
  );
}
