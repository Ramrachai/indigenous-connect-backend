import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv()

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.GMAIL_APP_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});


export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {

    const mailOptions = {
        from: "ramrachaim@gmail.com", // Sender's email address
        to,                           // Recipient's email address
        subject,                      // Subject of the email
        html,                         // HTML content of the email
    };

    try {

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw new Error('Email could not be sent');
    }
};