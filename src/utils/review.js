export const calculateRating = (reviews = []) => { // Default to an empty array
    if (!reviews.length) return 0; // Prevents undefined errors
    const totalRatings = reviews.reduce((accum, review) => accum + review.rating, 0);
    return Math.round((totalRatings / reviews.length) * 100) / 100;
};
