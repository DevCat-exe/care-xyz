import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendBookingEmail({ to, subject, bookingDetails }) {
  const mailOptions = {
    from: `"Care.xyz" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Care.xyz Booking Confirmation</h2>
        <p>Dear ${bookingDetails.userName},</p>
        <p>Your booking has been received and is currently being processed.</p>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151;">Booking Details:</h3>
          <p><strong>Service:</strong> ${bookingDetails.serviceName}</p>
          <p><strong>Date:</strong> ${bookingDetails.bookingDate}</p>
          <p><strong>Start Time:</strong> ${bookingDetails.bookingTime}</p>
          <p><strong>Duration:</strong> ${bookingDetails.duration}</p>
          <p><strong>Location:</strong> ${bookingDetails.location}</p>
          <p><strong>Address:</strong> ${bookingDetails.address}</p>
          <p><strong>Total Cost:</strong> $${bookingDetails.totalCost}</p>
          <p><strong>Status:</strong> ${bookingDetails.status}</p>
        </div>
        
        <p>We will contact you shortly to confirm your booking and arrange the details.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>Care.xyz Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}