import { Payment } from '../models/paymentModel.js'
import User from '../models/userModel.js'
import { razorpay } from '../server.js'
import createError from '../utils/error.js'
import crypto from 'crypto'


export const getRazorpayKey = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "razorpay key",
        key: process.env.RAZORPAY_API_KEY
    })
}
export const buySubscription = async (req, res, next) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        if (!user) {
            return next(createError(404, "Please log in again"))
        }

        if (user.role === 'ADMIN') {
            return next(createError(400, "Admin cannot purchase a subscription"))
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1
        })

        user.subscription.id = subscription.id
        user.subscription.status = subscription.status

        await user.save()

        res.status(200).json({
            success: true,
            message: "subscribed successfully",
            subscription_id: subscription.id
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}
export const verifySubscription = async (req, res, next) => {
    try {
        const { id } = req.user
        const { payment_id, razorpay_signature, subscription_id } = req.body

        const user = await User.findById(id)
        if (!user) {
            return next(createError(400, "Please log in again"))
        }

        const subscriptionId = user.subscription.id
        const generateSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(`${payment_id}|${subscriptionId}`)
            .digest('hex')

        if (generateSignature !== razorpay_signature) {
            return next(createError(400, "payment not verified , please try again"))
        }

        await Payment.create({
            payment_id,
            subscription_id,
            razorpay_signature
        })

        user.subscription.status = 'active'
        await user.save()
        res.status(200).json({
            success: true,
            message: "Payment successfull"
        })

    } catch (error) {
        return next(createError(500, error.message))
    }
}
export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        if (!user) {
            return next(createError(400, "Please log in again"))
        }
        if (user.role === 'ADMIN') {
            return next(createError(400, "You are not allowed to do this"))
        }

        const subscriptionId = user.subscription.id
        const subscription = await razorpay.subscriptions.cancel(subscriptionId)

        user.subscription.status = subscription.status
        await user.save()
        res.status(200).json({
            success: true,
            message: "subscription cancel successfull"
        })
    } catch (error) {
        return next(createError(500, error.message))
    }
}
export const allPayments = async (req, res, next) => {
    try {
        const { count } = req.user;
        const subscriptions = await razorpay.subscriptions.all({
            count: count || 10
        });
        const currentDate = new Date();
        const currentMonthSubscriptions = subscriptions.filter(subscription => {
            const subscriptionStartDate = new Date(subscription.startDate);
            return subscriptionStartDate.getMonth() === currentDate.getMonth() &&
                subscriptionStartDate.getFullYear() === currentDate.getFullYear();
        });

        res.status(200).json({
            success: true,
            message: "All payments and monthly payments",
            allPayments: subscriptions,
            monthlyPayments: currentMonthSubscriptions,
            currentMonth: currentDate.toLocaleString('default', { month: 'long' }),
            currentYear: currentDate.getFullYear()
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};
