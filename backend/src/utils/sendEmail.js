const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
    user: "f0fe5161df3672",
    pass: "baf6ebad67fe11"
    }
});

    const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
    };

    const info = await transport.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;