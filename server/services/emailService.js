const nodemailer = require('nodemailer');

let transporter = null;

// Initialize email transporter
const initializeEmailService = () => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM
  } = process.env;

  // Only initialize if all required env vars are present
  if (EMAIL_HOST && EMAIL_PORT && EMAIL_USER && EMAIL_PASS) {
    try {
      transporter = nodemailer.createTransporter({
        host: EMAIL_HOST,
        port: parseInt(EMAIL_PORT),
        secure: parseInt(EMAIL_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
      });

      console.log('Email service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
    }
  } else {
    console.log('Email service not configured - missing environment variables');
  }
};

// Send contact form email
const sendContactEmail = async (contactMessage) => {
  if (!transporter) {
    throw new Error('Email service not configured');
  }

  const { EMAIL_FROM, EMAIL_TO } = process.env;
  
  if (!EMAIL_TO) {
    throw new Error('EMAIL_TO not configured');
  }

  const mailOptions = {
    from: EMAIL_FROM || EMAIL_USER,
    to: EMAIL_TO,
    subject: `New Contact Form Submission: ${contactMessage.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactMessage.name}</p>
      <p><strong>Email:</strong> ${contactMessage.email}</p>
      <p><strong>Phone:</strong> ${contactMessage.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${contactMessage.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactMessage.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date(contactMessage.createdAt).toLocaleString()}</small></p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  initializeEmailService,
  sendContactEmail
};