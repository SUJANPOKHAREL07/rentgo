import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { sendMailViaAPI } from "./brevoApi";

dotenv.config();
const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST || "smtp-relay.brevo.com", // Changed
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587, // Changed, ensure string before parseInt
  secure: process.env.SMTP_PORT === "465",


  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 15000, // 15 seconds
  socketTimeout: 30000,
});

export default transporter;
export type typeMail = {
  to: string;
  subject: string;
  html: string;
};
export const sendMail = async (data: typeMail) => {
  // await transporter.sendMail({
  //   from: process.env.SENDER_EMAIL,
  //   to,
  //   subject,
  //   html,
  // });
  return await sendMailViaAPI(data.to, data.subject, data.html);
};
