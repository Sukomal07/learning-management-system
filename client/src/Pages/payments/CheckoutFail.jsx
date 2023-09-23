import { useEffect } from 'react';
import Lottie from 'react-lottie'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import animationData from '../../lotties/payment-failed.json'
import { getProfile } from '../../redux/slices/AuthSlice';

function CheckoutFail() {
    const dispatch = useDispatch();
    async function onLoad() {
        await dispatch(getProfile())
    }
    useEffect(() => {
        onLoad()
    }, [])
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='lg:w-1/3 w-11/12 m-auto bg-white rounded-lg shadow-lg flex flex-col gap-4 justify-center items-center pb-4'>
                <Lottie options={defaultOptions} height={300} width={300} />
                <p className='px-4 text-xl tracking-wider text-slate-500 text-center'>Oops ! Payment is not Successful</p>
                <Link className='btn btn-primary w-[90%]' to={'/checkout'}>Try again</Link>
            </div>
        </div>
    )
}

export default CheckoutFail
