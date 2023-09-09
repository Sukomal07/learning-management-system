import { useState } from 'react'
import { BsCloudUpload, BsEnvelope, BsLock, BsPerson } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import option3 from '../assets/Json/option3.json'
import Particle from '../components/Particle'
import HomeLayout from '../layouts/HomeLayout'
function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState({
        avatar: "",
        name: "",
        email: "",
        password: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value })
    }
    function getImage(event) {
        event.preventDefault();
        const uploadImage = event.target.files[0];
        if (uploadImage) {
            setSignUpData({ ...signUpData, avatar: uploadImage })
        }
    }


    return (
        <HomeLayout>
            <Particle option={option3} />
            <div className='flex flex-col gap-3 justify-center items-center h-screen'>
                <form className='lg:w-[400px] w-[90%] h-[80%] lg:h-[70%] p-7 flex flex-col gap-4 justify-between rounded-md bg-white text-black shadow-md'>
                    <div>
                        <h1 className='text-3xl font-semibold mb-3'>Sign Up</h1>
                        <p className='text-slate-400'>Please fill in this form to create an account!</p>
                    </div>
                    <hr />
                    <div className='flex items-center w-full gap-4 '>
                        <label htmlFor="image" className='text-xl hidden lg:block'><BsCloudUpload /></label>
                        <input type="file" name='image' id='image' accept='.jpg, .jpeg, .png, .svg' className="file-input file-input-bordered file-input-warning w-full max-w-xs text-white" onChange={getImage} />
                    </div>
                    <div className='flex items-center w-full gap-4 '>
                        <label htmlFor="name" className='text-xl hidden lg:block'><BsPerson /></label>
                        <input type="text" name='name' id='name' required placeholder="Enter Name" className="input text-white input-primary w-full max-w-xs" onChange={handleUserInput} />
                    </div>
                    <div className='flex items-center w-full gap-4'>
                        <label htmlFor="email" className='text-xl hidden lg:block'><BsEnvelope /></label>
                        <input type="email" name="email" id="email" required placeholder='Enter Email' className="input text-white input-primary w-full max-w-xs" onChange={handleUserInput} />
                    </div>
                    <div className='flex items-center w-full gap-4 '>
                        <label htmlFor="password" className='text-xl hidden lg:block'><BsLock /></label>
                        <input type="password" name="password" id="password" required placeholder='Enter Password' className="input text-white input-primary w-full max-w-xs" onChange={handleUserInput} />
                    </div>

                    <Link to={''} className='w-full'>
                        <button className='btn btn-primary w-full'>SignUp</button>
                    </Link>
                </form>
                <p className='text-xl text-white'>Already have an account ?  <Link to={'/login'} className='text-2xl text-blue-500'>Login</Link></p>
            </div>
        </HomeLayout>
    )
}

export default SignUp
