import "./rating-comments.css";

import React, { useState, useEffect, useRef } from "react";

import { Avatar, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";

export default function RatingComments({ reviews, setOpenModal }) {
  const [expanded, setExpanded] = useState(Array(reviews.length).fill(false));
  const [needsSeeMore, setNeedsSeeMore] = useState(
    Array(reviews.length).fill(false)
  );
  const reviewRefs = useRef([]);

  useEffect(() => {
    const newNeedsSeeMore = reviews.map((_, index) => {
      const ref = reviewRefs.current[index];
      return ref ? ref.scrollHeight > 150 : false;
    });

    setNeedsSeeMore(newNeedsSeeMore);
  }, [reviews]);

  const sortedReviews = [...reviews].sort((a, b) => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split(".");
      return new Date(`${year}-${month}-${day}`);
    };

    return parseDate(b.date) - parseDate(a.date);
  });

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const openModalClick = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <div className="reviewsList">
        <Button
          variant="contained"
          onClick={openModalClick}
          sx={{
            backgroundColor: "#aa8d2b",
            "&:hover": { backgroundColor: "#8c7422" },
            fontWeight: "bold",
            mt: 4,
            maxWidth: "745px",
            width: "100%",
          }}
        >
          Write your review
        </Button>
        <div>
          {sortedReviews.map((review, index) => (
            <div key={index}>
              <div
                ref={(el) => (reviewRefs.current[index] = el)}
                className="commentsContainer"
                style={{
                  maxHeight: expanded[index] ? "none" : "150px",
                  overflow: "hidden",
                  position: "relative",
                  paddingBottom: needsSeeMore[index] ? "30px" : "10px",
                }}
              >
                <div className="clientInfo">
                  <Avatar
                    alt={review.name}
                    src={review.avatar}
                    sx={{ width: 30, height: 30, mr: 1 }}
                  />
                  <Typography>{review.name}</Typography>
                </div>
                <Typography sx={{ color: "#aeaeae" }}>{review.date}</Typography>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography>
                  <strong>Service: </strong>
                  {review.service}
                </Typography>
                {review.feedback.positive && (
                  <Typography>
                    <strong>What did you like?</strong>{" "}
                    {review.feedback.positive}
                  </Typography>
                )}
                {review.feedback.negative && (
                  <Typography>
                    <strong>What can be improved?</strong>{" "}
                    {review.feedback.negative}
                  </Typography>
                )}
                {review.feedback.general && (
                  <Typography>
                    <strong>Feedback:</strong> {review.feedback.general}
                  </Typography>
                )}
                {needsSeeMore[index] && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: expanded[index] ? "0px" : "50px",
                      background: expanded[index]
                        ? "none"
                        : "linear-gradient(transparent, white)",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      paddingBottom: "10px",
                    }}
                  >
                    <Button
                      onClick={() => toggleExpand(index)}
                      sx={{
                        backgroundColor: "white",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                      }}
                    >
                      {expanded[index] ? "Hide" : "See More"}
                    </Button>
                  </div>
                )}
              </div>
              {index < sortedReviews.length - 1 && <Divider sx={{ my: 2 }} />}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}
