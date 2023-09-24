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

        if (user.subscription.id && user.subscription.status === 'created') {
            await user.save()

            res.status(200).json({
                success: true,
                message: "subscribed successfully",
                subscription_id: user.subscription.id
            })
        } else {
            const subscription = await razorpay.subscriptions.create({
                plan_id: process.env.RAZORPAY_PLAN_ID,
                customer_notify: 1,
                total_count: 12
            })

            user.subscription.id = subscription.id
            user.subscription.status = subscription.status

            await user.save()

            res.status(200).json({
                success: true,
                message: "subscribed successfully",
                subscription_id: subscription.id
            })
        }
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
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return next(createError(400, "Please log in again"));
        }

        if (user.role === 'ADMIN') {
            return next(createError(400, "You are not allowed to do this"));
        }

        const subscriptionId = user.subscription.id;

        // Cancel the subscription using Razorpay
        const subscription = await razorpay.subscriptions.cancel(subscriptionId);

        // Update the user's subscription status
        user.subscription.status = subscription.status;
        await user.save();

        // Find the payment associated with the subscription
        const payment = await Payment.findOne({
            subscription_id: subscriptionId
        });

        // Calculate the time since subscription in milliseconds
        const timeSinceSubscribed = Date.now() - new Date(payment.createdAt).getTime();

        // Define the refund period in milliseconds (14 days)
        const refundPeriod = 14 * 24 * 60 * 60 * 1000;

        // Check if the refund period is still valid
        if (timeSinceSubscribed <= refundPeriod) {
            try {
                // Attempt to refund the payment using Razorpay
                const refund = await razorpay.payments.refund(payment.payment_id, {
                    speed: 'optimum'
                });

                // Handle the refund status here, check if it was successful
                if (refund.status === 'processed') {
                    // Refund successful, update user's subscription status and delete payment record
                    user.subscription.id = undefined;
                    user.subscription.status = undefined;
                    await user.save();
                    await payment.deleteOne();
                } else {
                    return next(createError(500, "Refund processing failed"));
                }
            } catch (refundError) {
                return next(createError(500, "Error refunding payment: " + refundError.message));
            }
        } else {
            return next(createError(400, "Refund period is over, so there will not be any refunds provided"));
        }

        res.status(200).json({
            success: true,
            message: "Subscription canceled successfully"
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
}

export const allPayments = async (req, res, next) => {
    try {
        const { count, skip } = req.query;
        const allPayments = await razorpay.subscriptions.all({
            count: count ? count : 10,
            skip: skip ? skip : 0
        });

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const finalMonths = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };

        const monthlyWisePayments = allPayments.items.map((payment) => {

            const monthsInNumbers = new Date(payment.start_at * 1000);

            return monthNames[monthsInNumbers.getMonth()];
        });

        monthlyWisePayments.map((month) => {
            Object.keys(finalMonths).forEach((objMonth) => {
                if (month === objMonth) {
                    finalMonths[month] += 1;
                }
            });
        });

        const monthlySalesRecord = [];

        Object.keys(finalMonths).forEach((monthName) => {
            monthlySalesRecord.push(finalMonths[monthName]);
        });

        res.status(200).json({
            success: true,
            message: 'All payments',
            allPayments,
            finalMonths,
            monthlySalesRecord,
        });
    } catch (error) {
        return next(createError(500, error.message));
    }
};
