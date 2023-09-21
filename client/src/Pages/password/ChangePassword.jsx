import { useState } from "react";
import { BsKey } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";

import HomeLayout from "../../layouts/HomeLayout"
import { changePassword, logout } from "../../redux/slices/AuthSlice";

function ChangePassword() {

    const dispatch = useDispatch();

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        cnfPassword: "",
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let hasError = false
        if (!data.oldPassword || !data.newPassword || !data.cnfPassword) {
            toast.error("All fields are mandatory")
            hasError = true
        } else if (data.oldPassword === data.newPassword) {
            toast.error("new password and old password should not be same")
            hasError = true
        } else if (data.newPassword !== data.cnfPassword) {
            toast.error("new password and confirm password should be same")
            hasError = true
        }
        if (!hasError) {
            const response = await dispatch(changePassword(data));
            if (response.payload?.success) {
                await dispatch(logout())
            }
        }
    }


    return (
        <HomeLayout>
            <div className='flex justify-center items-center min-h-screen '>
                <form onSubmit={handleSubmit} className='lg:w-[450px] w-[90%] md:w-1/2 h-fit p-7 flex flex-col justify-between gap-5 rounded-md bg-white text-black shadow-md'>
                    <h1 className='text-3xl font-semibold mb-3'>Change Password</h1>
                    <hr className='border-t-2 border-slate-500' />
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="oldPassword" className='text-xl hidden lg:block md:block text-yellow-500'><BsKey /></label>
                        <input type="text" name="oldPassword" id="oldPassword" placeholder='current password' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full capitalize" value={data.oldPassword} onChange={handleChange} />
                    </div>
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="newPassword" className='text-xl hidden lg:block md:block text-yellow-500'><BsKey /></label>
                        <input type="text" name="newPassword" id="newPassword" placeholder='new password' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full capitalize" value={data.newPassword} onChange={handleChange} />
                    </div>
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="cnfPassword" className='text-xl hidden lg:block md:block text-yellow-500'><BsKey /></label>
                        <input type="text" name="cnfPassword" id="cnfPassword" placeholder='confirm new password' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full capitalize" value={data.cnfPassword} onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn btn-primary w-full  mx-auto'>Confirm</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword
