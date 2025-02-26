export const rawReviews = [
  {
    avatar: "client1.jpg",
    name: "Regular Client",
    date: "20.02.2025",
    service: "Web Application",
    rating: 4,
    feedback: {
      positive:
        "The design and functionality were top-notch. The UI was very intuitive and smooth.",
      negative: "The loading time was a bit slow on mobile devices.",
      general:
        "Overall, I am happy with the service but hope for better performance in the future.",
    },
  },
  {
    avatar: "client2.png",
    name: "Unhappy Client",
    date: "22.02.2025",
    service: "Chat Bot",
    rating: 1,
    feedback: {
      positive:
        "The chatbot was highly responsive and understood queries effectively.",
      negative: "Occasionally, it gave repetitive responses.",
      general:
        "An excellent tool for customer support. Definitely worth using!",
    },
  },
  {
    avatar: "client3.jpg",
    name: "New Client",
    date: "23.02.2025",
    service: "Landing Page",
    rating: 3,
    feedback: {
      positive: "The visuals and layout were aesthetically pleasing.",
      negative: "The navigation was not as user-friendly as expected.",
      general: "It has potential but needs some refinement in user experience.",
    },
  },
  {
    avatar: "client4.jpg",
    name: "Best Client",
    date: "24.02.2025",
    service: "Web Application",
    rating: 5,
    feedback: {
      positive:
        "Highly scalable and secure. Great for handling large data sets.",
      negative: "Some minor bugs were encountered during testing.",
      general: "A reliable and robust solution. I would recommend it.",
    },
  },
  {
    avatar: "client5.jpg",
    name: "Happy Client",
    date: "25.02.2025",
    service: "Landing Page",
    rating: 5,
    feedback: {
      positive: "Beautifully designed with an engaging interface.",
      negative: "A few elements seemed cluttered on smaller screens.",
      general: "Fantastic experience! I am impressed with the outcome.",
    },
  },
];

export const formatToStandardDate = (dateStr) => {
  const [day, month, year] = dateStr.split(".");
  const date = new Date(`${year}-${month}-${day}`); 
  if (isNaN(date.getTime())) return "Invalid Date"; 

  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}.${formattedMonth}.${formattedYear}`;
};

export const mockReviews = rawReviews.map((review) => ({
  ...review,
  date: formatToStandardDate(review.date),
}));

export const specialistInfo = {
  name: "Good Specialist",
  avatar: "avatar.png",
  service: "Web Developer",
};
