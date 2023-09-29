import User from '../models/userModel.js'
import createError from '../utils/error.js'
import sendMail from '../utils/sendMail.js'

export const contactUs = async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return (next(createError(400, "All input feilds required")))
    }
    const subject = `You got a new message from ${name}`;
    const replySubject = `Thank you ${name}`
    const replyText = `
    <h3>Hello ${name}</h3>
    <p>Thank you for your message. We review your message and reply as soon as possible</p>
    <br/>
    Thank you
    `
    const textMessage = `
    <h3>My email id ${email}</h3>
    <br/>
    <p>${message}</p>
    `
    try {
        await sendMail(email, process.env.GMAIL_ID, subject, textMessage);
        res.status(200).json({
            success: true,
            message: `Message sent successfully`
        })
    } catch (error) {
        return (next(createError(400, error.message)))
    }
    await sendMail(process.env.GMAIL_ID, email, replySubject, replyText)
}

export const userStats = async (req, res, next) => {
    try {
        const allUserCount = await User.countDocuments();
        const subscribedUser = await User.countDocuments({
            'subscription.status': 'active'
        });
        res.status(200).json({
            success: true,
            message: 'stats fetched successfully',
            allUserCount,
            subscribedUser
        })
    } catch (error) {
        return (next(createError(400, error.message)))
    }
}