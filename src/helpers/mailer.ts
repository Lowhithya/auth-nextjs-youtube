import nodemailer from 'nodemailer';
import User from '@/models/usersModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}: any)=>{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);

      if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
      }

      
     const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "37774da5cec07d",
          pass: "1a9816046d10df",
        },
      });

      const mailOptions = {
        from:'lowhthyakona@gmail.com',
        to: email,
        html: `${emailType === "VERIFY" ?  `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to Verify Your email ` :   `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to  Reset your Password`}
       `,
      }

      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}