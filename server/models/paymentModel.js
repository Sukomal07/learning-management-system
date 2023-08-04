import { model, Schema } from 'mongoose'

const paymentSchema = new Schema({
    payment_id: {
        type: String,
        required: true
    },
    subscription_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },

}, { timestamps: true })

export const Payment = model('Payment', paymentSchema)