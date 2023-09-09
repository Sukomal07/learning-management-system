import { FiMenu } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'

function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);



    return (
        <div className='relative'>
            <div className="drawer w-fit lg:absolute ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="p-5">
                    <label htmlFor="my-drawer-2" className="drawer-button cursor-pointer">
                        <FiMenu size={"30px"} />
                    </label>
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 pt-12 gap-12 w-60 lg:w-80 min-h-full bg-base-200 text-base-content text-xl">
                        {isLoggedIn && role === 'ADMIN' && (
                            <li><Link to={'/admin/dashboard'}>Admin DashBoard</Link></li>
                        )}
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/courses'}>All Courses</Link></li>
                        <li><Link to={'/contact'}>Contact Us</Link></li>
                        <li><Link to={'/about'}>About Us</Link></li>
                        {!isLoggedIn && (
                            <div className='w-full absolute bottom-12 px-4 left-0 flex flex-col gap-4 justify-center items-center'>
                                <Link to={'/login'} className='w-full'>
                                    <button className='btn-primary py-2 w-full font-semibold rounded-md '>
                                        LogIn
                                    </button>
                                </Link>
                                <Link to={'/signup'} className='w-full'>
                                    <button className='btn-secondary py-2 w-full font-semibold rounded-md '>
                                        SignUp
                                    </button>
                                </Link>
                            </div>
                        )}
                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link to={'/user/profile'} className='w-full'>
                                        Profile
                                    </Link>
                                </li>
                                <Link to={'/logout'} className='w-full absolute bottom-12 left-0 px-4'>
                                    <button className='btn-secondary py-2 w-full font-semibold rounded-md '>
                                        LogOut
                                    </button>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout