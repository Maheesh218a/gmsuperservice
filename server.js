import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maheeshaudalagama@gmail.com',
    pass: 'hrlt qdmm aovd hsgu'
  }
});

app.post('/send-2fa', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  const mailOptions = {
    from: 'maheeshaudalagama@gmail.com',
    to: email,
    subject: 'Your Admin Login Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; padding: 40px; text-align: center; color: #fff; border-radius: 10px;">
        <h1 style="color: #d4af37; margin-bottom: 20px;">GM Super Service Admin</h1>
        <p style="font-size: 18px; color: #ccc;">A login attempt was made to your admin panel.</p>
        <p style="font-size: 18px; color: #ccc;">Your verification code is:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #d4af37; background: rgba(255,255,255,0.1); padding: 15px 30px; display: inline-block; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p style="font-size: 14px; color: #888;">If you did not attempt to log in, please secure your account immediately.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.post('/send-booking', async (req, res) => {
  const { name, phone, email, startDest, endDest, startDate, endDate } = req.body;

  if (!name || !phone || !startDest || !endDest || !startDate || !endDate) {
    return res.status(400).json({ error: 'All fields except email are required' });
  }

  const mailOptions = {
    from: 'maheeshaudalagama@gmail.com',
    to: 'maheeshaudalagama@gmail.com',
    subject: `New Booking Request from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; padding: 40px; color: #fff; border-radius: 10px;">
        <h1 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Booking Request</h1>
        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email || 'N/A'}</p>
        <p style="font-size: 16px;"><strong>Route:</strong> ${startDest} &rarr; ${endDest}</p>
        <p style="font-size: 16px;"><strong>Dates:</strong> ${startDate} to ${endDate}</p>
        <br />
        <p style="font-size: 14px; color: #888;">You can also view this booking in your Admin Dashboard.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Booking email sent successfully' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ success: false, error: 'Failed to send booking email' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
