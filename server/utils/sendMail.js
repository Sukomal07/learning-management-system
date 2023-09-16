import nodemailer from 'nodemailer'

const sendMail = async (fromMail, toMail, subject, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.APP_PASSWORD
        }
    })

    await transporter.sendMail({
        from: fromMail,
        to: toMail,
        subject: subject,
        html: message
    })
}

export default sendMail
