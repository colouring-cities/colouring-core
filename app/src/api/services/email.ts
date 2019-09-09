import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER_HOST,
    port: parseInt(process.env.MAIL_SERVER_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_SERVER_USER,
        pass: process.env.MAIL_SERVER_PASSWORD
    }
});

export {
    transporter
};
