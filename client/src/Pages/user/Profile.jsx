import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import HomeLayout from '../../layouts/HomeLayout'

function Profile() {

    const userData = useSelector((state) => state.auth?.data)

    return (
        <HomeLayout>
            <div className='flex justify-center items-center lg:h-screen mb-4'>
                <form className='lg:w-[60%] w-[90%] flex flex-col gap-8 bg-white rounded-lg px-8 shadow-lg py-8'>
                    <div className='flex items-center justify-center w-full'>

                        <div className='relative'>
                            {
                                userData.avatar.secure_url !== "http" ? (
                                    <img src={userData.avatar.secure_url} alt="profile photo" className="rounded-full w-32 h-32" />
                                ) : (
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="profile photo" className="rounded-full w-32 h-32" />
                                )
                            }
                            <button className='absolute bottom-2 right-0 rounded-full bg-slate-200 w-7 h-7 flex items-center justify-center'>
                                <FiEdit size={'18px'} color='black' />
                            </button>
                        </div>

                    </div>

                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 w-full'>
                        <div className='flex w-full relative'>
                            <label htmlFor="name" className='absolute bg-white bottom-9 left-5 '>Name *</label>
                            <input className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent text-black rounded-md capitalize border-slate-400 outline-0' type="text" name='name' id='name' value={userData?.name} />
                        </div>
                        <div className='flex w-full relative'>
                            <label htmlFor="email" className='absolute bg-white bottom-9 left-5 '>Email *</label>
                            <input type="text" name='email' id='email' defaultValue={userData?.email} className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent text-black rounded-md border-slate-400 outline-0 disabled' />
                        </div>
                        <div className='flex relative'>
                            <label htmlFor="role" className='absolute bg-white bottom-9 left-5 '>Role *</label>
                            <input type="text" name='role' id='role' defaultValue={userData?.role} className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent text-black rounded-md capitalize border-slate-400 outline-0' />
                        </div>
                        <div className='flex relative'>
                            <label htmlFor="subscription" className='absolute bg-white bottom-9 left-5 '>Subscription *</label>
                            <input type="text" name='subscription' id='subscription' defaultValue={userData.subscription?.status === "active" ? "Active" : "Inactive"} className='h-12 w-full font-semibold px-4 py-2 border-2 bg-transparent text-black rounded-md capitalize border-slate-400 outline-0' />
                        </div>
                    </div>

                    <div className='w-full flex lg:flex-row flex-col gap-8 items-center'>
                        <Link to={'/profile/changePassword'} className='w-full lg:w-fit'>
                            <button className='btn btn-primary w-full lg:w-fit'>Change Password</button>
                        </Link>

                        <button className='btn btn-secondary w-full lg:w-fit'>Edit Profile</button>

                        <button className='flex items-center text-red-500 gap-2 font-semibold'>
                            <FiTrash2 />
                            Delete Account
                        </button>
                    </div>
                    {userData.subscription?.state === "active" ? (
                        <button className='btn btn-error text-white w-full'>Cancel Subscription</button>
                    ) : null
                    }
                </form>
            </div>
        </HomeLayout>
    )
}

export default Profile
