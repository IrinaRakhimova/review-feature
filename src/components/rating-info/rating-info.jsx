import "./rating-info.css";

import React from "react";

import { calculateRating } from "../../utils/review";
import { specialistInfo } from "../../utils/mockData";

import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Star from "@mui/icons-material/Star";

export default function RatingInfo({ reviews }) {
  const rating = calculateRating(reviews);

  return (
    <Box>
      <div className="infoContainer">
        <Avatar
          alt="Good Specialist"
          src={specialistInfo.avatar}
          sx={{ width: 56, height: 56 }}
        />
        <div className="info">
          <Typography variant="h5">
            {specialistInfo.name} | {specialistInfo.service}{" "}
          </Typography>
          <div className="rating">
            <Star sx={{ color: "#faaf00" }} />
            <Typography>{rating}</Typography>
          </div>
        </div>
      </div>
    </Box>
  );
}
