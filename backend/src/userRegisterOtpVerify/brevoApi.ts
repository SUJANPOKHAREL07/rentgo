// brevoApi.ts - Put this in the same folder as your current email file
import axios from "axios";

export const sendMailViaAPI = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Vutungtung-Rental",
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Email sent via Brevo API");
    return response.data;
  } catch (error: any) {
    console.error("❌ Brevo API error:", error.response?.data || error.message);
    throw error;
  }
};
