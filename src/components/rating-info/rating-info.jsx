import React from "react";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Star from "@mui/icons-material/Star";
import { calculateRating } from "../../utils/review";
import "./rating-info.css";

export default function RatingInfo({ reviews }) {
  const rating = calculateRating(reviews);

  return (
    <Box>
      <div className="info-container">
        <Avatar
          alt="Good Specialist"
          src="src/assets/avatar.png"
          sx={{ width: 56, height: 56 }}
        />
        <div className="info">
          <Typography variant="h5">Good Specialist</Typography>
          <div className="rating">
            <Star sx={{ color: "#faaf00" }} />
            <Typography>{rating}</Typography>
          </div>
        </div>
      </div>
    </Box>
  );
}
