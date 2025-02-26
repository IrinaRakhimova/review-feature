import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { TextField, Button, CardContent } from "@mui/material";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { formatToStandardDate } from "../../utils/mockData";
import FormHelperText from "@mui/material/FormHelperText";
import Star from "@mui/icons-material/Star";
import { calculateRating } from "../../utils/review";
import { Avatar } from "@mui/material";

export default function ReviewForm({ addReview, reviews }) {
  const [formData, setFormData] = useState({
    positive: "",
    negative: "",
    feedback: "",
    rating: null,
    service: null,
  });
  const [ratingError, setRatingError] = useState(false);
  const [serviceError, setServiceError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "rating") setRatingError(false);
    if (name === "service") setServiceError(false);
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newValue,
    }));
    setRatingError(false);
    setServiceError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating) {
      setRatingError(true);
      return;
    }
    if (formData.service === null) {
      setServiceError(true);
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${today.getFullYear()}`;
    const standardizedDate = formatToStandardDate(formattedDate);
    const newReview = {
      avatar: "",
      name: "You",
      date: standardizedDate,
      service: formData.service,
      rating: formData.rating,
      feedback: {
        positive: formData.positive,
        negative: formData.negative,
        general: formData.feedback,
      },
    };

    addReview(newReview);
    setIsFormSubmitted(true);
  };

  const rating = calculateRating(reviews);

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CardContent>
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
          <Box>
            <div className="specialist-info">
              <Avatar
                alt="Good Specialist"
                src="src/assets/avatar.png"
                sx={{ width: 56, height: 56 }}
              />
              <div className="info">
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "250px",
                    display: "block",
                  }}
                >
                  Good Specialist | Web Developer
                </Typography>
                <div className="rating">
                  <Star sx={{ color: "#faaf00" }} />
                  <Typography>{rating}</Typography>
                </div>
              </div>
            </div>
          </Box>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Box sx={{ "& > legend": { mt: 2 } }} textAlign="center">
              <Typography>How would you rate your experience?</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                size="large"
                sx={{ mt: 2 }}
              />
              {ratingError && (
                <Typography color="error" variant="body2">
                  Rating is required
                </Typography>
              )}
            </Box>

            <FormControl error={serviceError}>
              <InputLabel id="service-label">* Service</InputLabel>
              <Select
                labelId="service-label"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <MenuItem value="Landing page">Landing page</MenuItem>
                <MenuItem value="Chat bot">Chat bot</MenuItem>
                <MenuItem value="Web application">Web application</MenuItem>
              </Select>
              {serviceError && (
                <FormHelperText>Service is required</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="What did you like?"
              name="positive"
              variant="outlined"
              value={formData.positive}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="What can be improved?"
              name="negative"
              variant="outlined"
              value={formData.negative}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Feedback"
              name="feedback"
              variant="outlined"
              multiline
              rows={4}
              value={formData.feedback}
              onChange={handleChange}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#aa8d2b",
                "&:hover": { backgroundColor: "#8c7422" },
                fontWeight: "bold",
              }}
              fullWidth
            >
              Submit your review
            </Button>
          </form>
        </CardContent>
      </Box>
    </Modal>
  );
}
