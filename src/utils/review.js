export const calculateRating = (reviews = []) => {
  if (!reviews.length) return 0; 
  const totalRatings = reviews.reduce(
    (accum, review) => accum + review.rating,
    0
  );
  return Math.round((totalRatings / reviews.length) * 100) / 100;
};
