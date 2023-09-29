import { useEffect } from 'react';
import { BsCurrencyRupee } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import HomeLayout from '../../layouts/HomeLayout'
import { getRazorpayKey, purchaseCourseBundle, verifyUserPayment } from '../../redux/slices/RazorpaySlice';


function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const razorpay = useSelector((state) => state.razorpay);
    const userdata = useSelector((state) => state.auth?.data);
    const paymentDetails = {
        payment_id: "",
        subscription_id: "",
        razorpay_signature: ""
    }
    async function handleSubscription() {
        if (!razorpay.key || !razorpay.subscription_id) {
            toast.error("Something went wrong! Please try again later")
            return;
        }
        const options = {
            key: razorpay.key,
            subscription_id: razorpay.subscription_id,
            name: "Dutta Pvt. LTD",
            description: "Yearly Subscription",
            theme: {
                color: "#cedb17"
            },
            prefill: {
                email: userdata.email,
                name: userdata.name
            },
            handler: async function (response) {
                paymentDetails.payment_id = response.razorpay_payment_id
                paymentDetails.subscription_id = response.razorpay_subscription_id
                paymentDetails.razorpay_signature = response.razorpay_signature
                const res = await dispatch(verifyUserPayment(paymentDetails));
                if (res?.payload?.success) {
                    navigate(`/course/${state?.title}/checkout/success`, { state: state });
                } else {
                    navigate(`/course/${state?.title}/checkout/fail`, { state: state });
                }
            }
        }
        const paymentObj = new window.Razorpay(options)
        paymentObj.open()
    }

    async function onLoad() {
        await dispatch(getRazorpayKey());
        await dispatch(purchaseCourseBundle())
    }

    useEffect(() => {
        if (!state) {
            navigate("/courses")
        } else {
            document.title = 'Checkout - Learning Management System'
            onLoad()
        }
    }, [])
    return (
        <HomeLayout>
            <div className='lg:h-screen flex justify-center items-center mb-6 lg:mb-0'>
                <div className='lg:w-1/3 w-11/12 m-auto bg-white rounded-lg shadow-lg flex flex-col gap-4 justify-center items-center pb-4'>
                    <h1 className='bg-yellow-500 text-black font-bold text-3xl w-full text-center py-3 rounded-t-lg'>Subscription Bundle</h1>
                    <p className='px-4 text-xl tracking-wider text-slate-500 text-center'>This purchase will allow you to access all available course of our platform for <span className='text-2xl text-blue-500 font-bold'>1 year duration.</span></p>
                    <p className='px-5 text-xl tracking-wider text-yellow-500 text-center font-semibold'>All the existing and new launched courses will be available </p>
                    <p className='flex gap-1 items-center text-xl justify-center text-green-500'><BsCurrencyRupee /> <span className='text-3xl font-bold'>499</span>only</p>
                    <p className='text-slate-500 text-xl font-semibold px-4 text-center'>100% refund on cancellation within 14 days</p>
                    <button className='btn btn-primary w-[90%]' onClick={handleSubscription}>Buy Now</button>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Checkout
