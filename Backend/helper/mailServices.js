const nodemailer = require("nodemailer");

exports.sendGreetMail = async (to, name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amber1251.be22@chitkara.edu.in',
            pass: 'amberdhama@5678'
        }
    });

    const subject = 'Welcome to WorkWave - Your Journey Begins Here⭐';

    const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <img src="https://res.cloudinary.com/dwd71kz3s/image/upload/v1724846253/cmvtodvvvgafvhfkgepi.jpg" 
         alt="WorkWave User" 
         style="display: block; margin: 0 auto;">
        <div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 10px;">
            <p>Dear ${name},</p>
            <p>We're thrilled to welcome you to <strong>WorkWave</strong>!</p>
            <p>
                Thank you for choosing our platform to manage your bookings. Whether you're here to explore new services, 
                book appointments, or manage your bookings with ease, we're here to help you every step of the way.
            </p>
            <h3 style="color: #007bff;">What you can do now:</h3>
            <ul style="line-height: 1.6;">
                <li>Explore Services: Browse through our wide range of services and find the perfect fit for your needs.</li>
                <li>Book Appointments: Schedule your appointments in just a few clicks.</li>
                <li>Manage Your Bookings: Keep track of all your appointments with our easy-to-use dashboard.</li>
            </ul>
            <p>
                We're committed to providing you with the best experience possible. If you have any questions or need assistance, 
                our support team is just an email away at <a href="mailto:support@workwave.com">support@workwave.com</a>.
            </p>
            <p>
                <a href="https://landing-page-orpin-one-53.vercel.app/" style="background-color: #007bff; color: #fff; padding: 10px 20px; 
                text-decoration: none; border-radius: 5px;">Start Exploring</a>
            </p>
            <p>Thank you for being part of our community. We look forward to serving you!</p>
            <p>Best regards,<br>Stack Surgeons<br>WorkWave Team</p>
        </div>
    </div>`;

    let mailOptions = {
        from: 'amber1251.be22@chitkara.edu.in',
        to: to,
        subject: subject,
        html: html
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email: ' + error);
    }
};