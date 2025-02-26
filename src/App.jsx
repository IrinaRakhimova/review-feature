import "./App.css";
import "@fontsource/inter";
import RatingInfo from "./components/rating-info/rating-info";
import RatingComments from "./components/rating-comments/rating-comments";
import { useState } from "react";
import { mockReviews } from "./utils/mockData";
import SuccessModal from "./components/modal/modal";

function App() {
  const [reviews, setReviews] = useState(mockReviews);
  const [openModal, setOpenModal] = useState(false);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="container">
      <RatingInfo reviews={reviews} />
      <div className="main">
        <RatingComments reviews={reviews} setOpenModal={setOpenModal}/>
      </div>
      {openModal && <SuccessModal openModal={openModal} onClose={onClose} addReview={addReview} reviews={reviews} />}
    </div>
  );
}

export default App;
