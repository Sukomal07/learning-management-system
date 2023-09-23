import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../../layouts/HomeLayout'
import { deleteProfile, editProfile, getProfile } from '../../redux/slices/AuthSlice';
import { cancelSubscription } from '../../redux/slices/RazorpaySlice';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth?.data)
    const [data, setData] = useState({
        previewImage: userData.avatar?.secure_url,
        name: userData.name,
        avatar: undefined,
        userId: userData._id,
        haschanges: false
    })

    function handleImage(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener('load', function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadImage,
                    haschanges: true
                })
            })
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value, haschanges: true
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("avatar", data.avatar);
        await dispatch(editProfile(formdata));
        await dispatch(getProfile())
    }

    async function onDelete(e) {
        e.preventDefault();
        const res = await dispatch(deleteProfile(data.userId))
        if (res?.payload?.success) {
            navigate('/signup')
        }
    }
    async function handleCancel(e) {
        e.preventDefault();
        const res = await dispatch(cancelSubscription())
        if (res?.payload?.success) {
            await dispatch(getProfile())
            navigate('/')
        }
    }

    return (
        <HomeLayout>
            <div className='flex justify-center items-center lg:h-screen mb-4'>
                <form onSubmit={onFormSubmit} className='lg:w-[60%] w-[90%] flex flex-col gap-8 bg-white rounded-lg px-8 shadow-lg py-8'>
                    <div className='flex items-center justify-center w-full'>

                        <div className='relative'>
                            <img src={data.previewImage} alt="profile photo" className="rounded-full w-32 h-32" />
                            <input type="file" id="imageUpload" accept='.jpg, .jpeg, .png, .svg' className='hidden' onChange={handleImage} />
                            <label htmlFor="imageUpload" className='absolute bottom-2 right-0 rounded-full bg-slate-200 w-7 h-7 flex items-center justify-center cursor-pointer'>
                                <FiEdit size={'18px'} color='black' />
                            </label>
                        </div>

                    </div>

                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 w-full'>
                        <div className='flex w-full relative'>
                            <label htmlFor="name" className='absolute bg-white bottom-9 left-5 '>Name *</label>
                            <input className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent text-black rounded-md capitalize border-slate-400 outline-0' type="text" name='name' id='name' value={data.name} onChange={handleChange} />
                        </div>
                        <div className='flex w-full relative'>
                            <label htmlFor="email" className='absolute bg-white bottom-9 left-5 '>Email *</label>
                            <input type="text" name='email' id='email' defaultValue={userData?.email} className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent rounded-md border-slate-400 outline-0 input-disabled' disabled />
                        </div>
                        <div className='flex relative'>
                            <label htmlFor="role" className='absolute bg-white bottom-9 left-5 '>Role *</label>
                            <input type="text" name='role' id='role' defaultValue={userData?.role} className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent rounded-md capitalize border-slate-400 outline-0 input-disabled' disabled />
                        </div>
                        <div className='flex relative'>
                            <label htmlFor="subscription" className='absolute bg-white bottom-9 left-5 '>Subscription *</label>
                            <input type="text" name='subscription' id='subscription' defaultValue={userData.subscription?.status === "active" ? "Active" : "Inactive"} className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent  rounded-md capitalize border-slate-400 outline-0 input-disabled' disabled />
                        </div>
                    </div>

                    <div className='w-full flex lg:flex-row flex-col gap-8 items-center'>
                        <Link to={'/profile/changePassword'} className='w-full lg:w-fit'>
                            <button className='btn btn-primary w-full lg:w-fit normal-case'>Change Password</button>
                        </Link>

                        <button className='btn btn-secondary w-full lg:w-fit normal-case' disabled={!data.haschanges} type='submit' >Save Changes</button>

                        <button className='flex items-center text-red-500 gap-2 font-semibold' onClick={onDelete}>
                            <FiTrash2 />
                            Delete Account
                        </button>
                    </div>
                    {userData.subscription?.status === "active" ? (
                        <button onClick={handleCancel} className='btn btn-error text-white w-full'>Cancel Subscription</button>
                    ) : null
                    }
                </form>
            </div>
        </HomeLayout>
    )
}

export default Profile
