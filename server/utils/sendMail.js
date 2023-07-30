import nodemailer from 'nodemailer'

const sendMail = async (email, subject, message) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.APP_PASSWORD
        }
    })

    await transporter.sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: subject,
        html: message
    })
}

export default sendMail