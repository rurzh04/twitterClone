import nodemailer from 'nodemailer';

const options = {
    host: process.env.NODEMAILER_HOST || 'sandbox.smtp.mailtrap.io',
    port: Number(process.env.NODEMAILER_PORT) || 2525,
    auth: {
        user: process.env.NODEMAILER_USER || '19c51e25423590',
        pass: process.env.NODEMAILER_PASS || '********bb03',
    },
};
const transport = nodemailer.createTransport(options);

export default transport;
