import { useState } from "react";

import { mockReviews } from "./utils/mockData";

import RatingInfo from "./components/rating-info/rating-info";
import RatingComments from "./components/rating-comments/rating-comments";
import ReviewModal from "./components/modal/review-modal";

function App() {
  const [reviews, setReviews] = useState(mockReviews);
  const [openModal, setOpenModal] = useState(false);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <div>
      <RatingInfo reviews={reviews} />
      <RatingComments reviews={reviews} setOpenModal={setOpenModal} />
      {openModal && (
        <ReviewModal
          openModal={openModal}
          addReview={addReview}
          reviews={reviews}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
}

export default App;
