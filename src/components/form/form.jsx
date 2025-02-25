import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

export default function Form() {
  const [formData, setFormData] = useState({
    positive: '',
    negative: '',
    feedback: '',
    rating: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setRatingError(false);
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating) {
        setRatingError(true);
        return;
      }
    console.log(formData);
    setIsSubmitted(true);
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {isSubmitted ? (
          <Box textAlign="center">
            <Typography textAlign="center" gutterBottom>
              Your feedback is successfully submitted.
            </Typography>
            <DoneOutlineIcon fontSize="large" textAlign="center" sx={{ color: '#aa8d2b', mt: 4}} />
          </Box>
        ) : (
          <>
            <Typography  variant="h4" textAlign="center" sx={{ mb: 4,}}>Feedback</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ '& > legend': { mt: 2 } }} textAlign="center">
            <Typography>How would you rate your experience?</Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  size='large'
                  sx={{ mt: 2 }} 
                /> 
                {ratingError && (
                  <Typography color="error" variant="body2">
                    Rating is required
                  </Typography>
                )}
              </Box>
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
                label="Your feedback"
                name="feedback"
                variant="outlined"
                multiline
                rows={4}
                value={formData.feedback}
                onChange={handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#aa8d2b', '&:hover': { backgroundColor: '#8c7422' }, fontWeight: 'bold' }} fullWidth>
                Submit your review
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}


