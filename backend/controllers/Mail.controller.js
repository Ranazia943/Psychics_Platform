import nodemailer from 'nodemailer';
import Email from '../models/Mail.model.js'; // Optional, if you want to save email records

// Configure the email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail SMTP server
  port: 587, // Gmail SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ziar7750@gmail.com', // Your email
    pass: 'Zia@1280', // Your email password
  },
});

// Function to send email
export const sendEmail = async (req, res) => {
  const { recipient, subject, body } = req.body;

  // Create the email options
  const mailOptions = {
    from: 'ziar7750@gmail.com', // Sender address
    to: recipient, // List of recipients
    subject: subject, // Subject line
    text: body, // Plain text body
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);

    // Optional: Save the email record
    const newEmail = new Email({ recipient, subject, body });
    await newEmail.save();

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email.' });
  }
};
