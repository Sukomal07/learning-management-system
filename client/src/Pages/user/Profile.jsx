import { FiEdit } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import HomeLayout from '../../layouts/HomeLayout'

function Profile() {

    const userData = useSelector((state) => state.auth?.data)

    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-screen mb-4'>
                <div className='flex flex-col gap-6 rounded-lg bg-white shadow-lg w-80 lg:w-[30rem] px-12 py-8'>
                    <div className='relative'>
                        {
                            userData.avatar.secure_url !== "http" ? (
                                <img src={userData.avatar.secure_url} alt="profile photo" className="rounded-full w-52 h-52 m-auto" />
                            ) : (
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="profile photo" className="rounded-full w-52 h-52 m-auto" />
                            )
                        }
                        <button className='absolute lg:right-28 right-8 bottom-0 rounded-full p-2 cursor-pointer bg-slate-100'>
                            <FiEdit size={'20px'} color='black' />
                        </button>
                    </div>
                    <div className='text-center'>
                        <h2 className="text-3xl font-semibold capitalize text-black mb-2">
                            {userData?.name}
                        </h2>
                        <p className='text-lg text-gray-500'>{userData?.email}</p>
                        <p className='text-lg text-gray-500 capitalize'>{userData?.role}</p>
                        <p className='text-lg text-gray-500'>
                            Subscription: {userData.subscription?.status === "active" ? "Active" : "Inactive"}
                        </p>
                    </div>
                    <div className='flex lg:flex-row flex-col gap-4 lg:gap-0 items-center justify-between'>
                        <Link to={'/changePassword'}>
                            <button className='btn btn-primary'>Change Password</button>
                        </Link>
                        <Link to={'/editProfile'}>
                            <button className='btn btn-secondary'>Edit Profile</button>
                        </Link>
                    </div>
                    {
                        userData.subscription?.state === "active" ? (
                            <button className='btn btn-error text-white'>Cancel Subscription</button>
                        ) : <></>
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile
