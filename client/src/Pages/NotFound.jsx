import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import errorImage from '../assets/Images/error.png'
import Footer from '../components/Footer'
function NotFound() {

    useEffect(() => {
        document.title = 'Page not found - Learning Management System'
    }, [])
    return (
        <div className="h-screen w-screen flex flex-col relative justify-between items-center mx-auto bg-[#1A2238]">
            <img src={errorImage} alt="" className=' bg-transparent h-[70vh] brightness-50' />
            <Link to={'/'} className='flex justify-center'>
                <button className='rounded-lg border-yellow-400 text-xl font-semibold border-2 py-2 lg:w-[20%] w-[70%] absolute top-[60%] text-white hover:bg-white hover:text-black transition-all ease-in-out duration-300'>Back to Home</button>
            </Link>
            <Footer />
        </div>
    )
}

export default NotFound
