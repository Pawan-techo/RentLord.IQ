import nodemailer from "nodemailer";

//Sent invite email to tenant
export const sendInviteEmail = async (toEmail, inviteLink, firstName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"RentLordIQ" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "You're invited to RentLordIQ 🏠",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hello ${firstName},</h2>
        <p>You have been invited to join <b>RentLordIQ</b> as a tenant.</p>
        <p>Please click the button below to accept invitation</p>
        <a href="${inviteLink}" 
           style="display:inline-block;padding:10px 20px;background:#1f3c88;color:#fff;text-decoration:none;border-radius:5px;">
           Accept Invitation
        </a>
        <p>This link will expire in 24 hours.</p>
        <br/>
        <p>Regards,<br/>RentLordIQ Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
