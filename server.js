import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const whatsappPhoneId = process.env.WHATSAPP_PHONE_ID; 
const accessToken = process.env.META_ACCESS_TOKEN;
const recipientPhoneNumber = process.env.TO_NUMBER;

console.log("WHATSAPP_PHONE_ID:", whatsappPhoneId);
console.log("META_ACCESS_TOKEN:", accessToken ? "Loaded" : "Missing");
console.log("TO_NUMBER:", recipientPhoneNumber);

app.post("/send-message", async (req, res) => {
    const { rating } = req.body;

    const apiUrl = `https://graph.facebook.com/v22.0/${whatsappPhoneId}/messages`;

    const messageData = {
        messaging_product: "whatsapp",
        to: recipientPhoneNumber,
        type: "template",
        template: {
            name: "review", 
            language: { code: "en_US" },
            components: [
                {
                    type: "body",
                    parameters: [
                        { type: "text", text: rating } 
                    ]
                }
            ]
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageData)
        });

        const result = await response.json();
        if (response.ok) {
            res.json({ success: true, messageId: result.messages[0]?.id });
        } else {
            console.error("Error sending WhatsApp message:", result);
            res.status(500).json({ success: false, error: result });
        }
    } catch (error) {
        console.error("Network error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));