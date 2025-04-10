export const sendWhatsAppMessage = async (rating) => {
    const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating })
    });
    const data = await response.json();
    console.log(data);
};
