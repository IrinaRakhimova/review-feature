import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import twilio from "twilio";

dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json());

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fromWhatsApp = `whatsapp:${process.env.FROM_NUMBER}`;
console.log("ACCOUNT_SID:", process.env.ACCOUNT_SID);
console.log("AUTH_TOKEN:", process.env.AUTH_TOKEN ? "Loaded" : "Missing");
console.log("FROM_NUMBER:", process.env.FROM_NUMBER);
console.log("TO_NUMBER:", process.env.TO_NUMBER);
const client = twilio(accountSid, authToken);

app.post("/send-message", async (req, res) => {
    const { rating, service, feedback } = req.body;

    const messageBody = `You have a new review! 🎉\n\n⭐ Rating: ${rating}\n📌 Service: ${service}\n💬 General Feedback: ${feedback.general || "No feedback provided."}\n\nWhat did you like: ${feedback.positive || "No positive feedback provided."}\nWhat can be improved: ${feedback.negative || "No negative feedback provided."}`;
    try {
        const message = await client.messages.create({
            from: fromWhatsApp,
            to: `whatsapp:${process.env.TO_NUMBER}`,
            body: messageBody,
        });
        res.json({ success: true, messageSid: message.sid });
    } catch (error) {
        console.error("Error sending WhatsApp message:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));