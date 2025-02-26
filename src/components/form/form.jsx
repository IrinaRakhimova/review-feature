import React, { useState } from "react";
import "./form.css";
import { TextField, Button, Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatToStandardDate } from "../../utils/mockData";
import SuccessModal from "../modal/modal";

export default function Form({ addReview, setOpenModal, isFormSubmitted, setIsFormSubmitted }) {
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
    if (formData.service === "") {
      setServiceError(true);
      return;
    }
    
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`;
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
    setOpenModal(true);
  };
  

  return (
    <div className="formContainer">
      <Card
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          {isFormSubmitted ? (
            <SuccessModal />
          ) : (
            <>
              <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
                Feedback
              </Typography>
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
