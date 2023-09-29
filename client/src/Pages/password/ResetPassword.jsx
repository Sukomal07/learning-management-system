import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";

import Footer from "../../components/Footer"
import { resetPassword } from "../../redux/slices/AuthSlice";
function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const [data, setData] = useState({
        password: "",
        cnfPassword: "",
        resetToken: resetToken
    })
    function handleUserInput(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function onSubmit(event) {
        event.preventDefault();
        let hasError = false;
        if (!data.password || !data.cnfPassword) {
            toast.error('All fields are mandatory');
            hasError = true
        } else if (!data.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
            toast.error('Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol');
            hasError = true;
        } else if (data.password !== data.cnfPassword) {
            toast.error("Both password should be same")
            hasError = true
        }
        if (!hasError) {
            const response = await dispatch(resetPassword(data));
            if (response.payload?.success) {
                navigate('/login')
                setData({
                    password: "",
                    cnfPassword: "",
                })
            }
        }
    }

    useEffect(() => {
        document.title = 'Reset Password - Learning Management System'
    }, [])
    return (
        <>
            <div className="flex flex-col gap-10 justify-center items-center mb-1 h-[90vh]">
                <h1 className="text-4xl text-yellow-500 font-bold">Reset Your Password</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-lg bg-white shadow-lg lg:w-1/3 w-[90%] h-fit px-8 py-8">
                    <div>
                        <label className="text-xl text-black font-semibold" htmlFor="password">New Password</label>
                        <input type="text" name="password" placeholder="New Password" className="input input-bordered input-primary w-full text-white mt-2" value={data.password} onChange={handleUserInput} />
                    </div>
                    <div className="mb-2">
                        <label className="text-xl text-black font-semibold" htmlFor="cnfPassword">Confirm Password</label>
                        <input type="text" name="cnfPassword" placeholder="Confirm Password" className="input input-bordered input-primary w-full text-white mt-2" value={data.cnfPassword} onChange={handleUserInput} />
                    </div>
                    <button className='btn-primary rounded-lg py-3 text-xl' type='submit'>Confirm</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword
