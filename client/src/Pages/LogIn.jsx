import { BsEnvelope, BsLock } from "react-icons/bs"
import { Link } from "react-router-dom"

import option2 from '../assets/Json/option2.json'
import Particle from "../components/Particle"
import HomeLayout from "../layouts/HomeLayout"
function LogIn() {
    return (
        <HomeLayout>
            <Particle option={option2} />
            <div className='flex flex-col gap-3 justify-center items-center h-screen'>
                <form className='lg:w-[450px] w-[90%] md:w-1/2 h-[60%] p-7 flex flex-col justify-between rounded-md bg-white text-black shadow-md'>
                    <div>
                        <h1 className='text-3xl font-semibold mb-3'>Log In</h1>
                        <p className='text-slate-400'>Please fill this form to login your account</p>
                    </div>
                    <hr className='border-t-2 border-slate-500' />
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="email" className='text-xl hidden lg:block md:block text-yellow-500'><BsEnvelope /></label>
                        <input type="email" name="email" id="email" placeholder='Enter Email' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full " />
                    </div>
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="password" className='text-sm hidden lg:block md:block text-yellow-500'><BsLock /></label>
                        <input type="password" name="password" id="password" placeholder='Enter Password' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full " />
                    </div>
                    <button type='submit' className='btn btn-primary w-full  mx-auto'>LogIn</button>
                </form>
                <p className='text-xl text-white'>don't have an account ?  <Link to={'/signup'} className='text-2xl text-blue-500 hover:underline '>Signup</Link> here</p>
            </div>
        </HomeLayout>
    )
}

export default LogIn
