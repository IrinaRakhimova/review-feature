export const sendWhatsAppMessage = async (review) => {
    try {
        const response = await fetch("http://localhost:5000/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        });

        const result = await response.json();
        if (result.success) {
            console.log(`WhatsApp message sent! SID: ${result.messageSid}`);
        } else {
            console.error("Error sending WhatsApp message:", result.error);
        }
    } catch (error) {
        console.error("Network error:", error.message);
    }
};