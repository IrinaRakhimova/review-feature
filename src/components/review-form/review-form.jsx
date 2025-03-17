import "./review-form.css";

import React, { useState } from "react";

import { formatToStandardDate } from "../../utils/mockData";
import { calculateRating } from "../../utils/review";
import { specialistInfo } from "../../utils/mockData";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Star from "@mui/icons-material/Star";
import { Avatar } from "@mui/material";

import { sendWhatsAppMessage } from "../../utils/whatsAppMessage";

export default function ReviewForm({ addReview, reviews, setIsFormSubmitted }) {
  const [formData, setFormData] = useState({
    positive: "",
    negative: "",
    feedback: "",
    rating: 0,
    service: "",
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

  const handleSubmit = async (e) => {
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
      me: true,
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

    await sendWhatsAppMessage(newReview);
  };

  const rating = calculateRating(reviews);

  return (
    <div>
      <Box sx={{ marginTop: 4 }}>
        <div className="specialist-info">
          <Avatar
            alt="Good Specialist"
            src={specialistInfo.avatar}
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
              {specialistInfo.name} | {specialistInfo.service}
            </Typography>
            <div className="rating">
              <Star sx={{ color: "#faaf00" }} />
              <Typography>{rating}</Typography>
            </div>
          </div>
        </div>
      </Box>
      <form onSubmit={handleSubmit} className="form">
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

        <FormControl fullWidth error={serviceError}>
          <InputLabel id="service-label">* Service</InputLabel>
          <Select
            labelId="service-label"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            label="* Service"
          >
            <MenuItem value="Landing page">Landing page</MenuItem>
            <MenuItem value="Chat bot">Chat bot</MenuItem>
            <MenuItem value="Web application">Web application</MenuItem>
          </Select>
          {serviceError && <FormHelperText>Service is required</FormHelperText>}
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
    </div>
  );
}
