import Cookies from 'js-cookie'
import { useState } from 'react'
import { BsCloudUpload, BsEnvelope, BsLock, BsPerson } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import option3 from '../../assets/Json/option3.json'
import Particle from '../../components/Particle'
import HomeLayout from '../../layouts/HomeLayout'
import { signup } from '../../redux/slices/AuthSlice'
function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = import.meta.env.VITE_TOKEN
    const [viewImage, setViewImage] = useState("");

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
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            setSignUpData({ ...signUpData, avatar: uploadedImage });
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load', function () {
            setViewImage(this.result);
        });
    }

    async function createAccount(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('avatar', signUpData.avatar);
        formData.append('name', signUpData.name);
        formData.append('email', signUpData.email);
        formData.append('password', signUpData.password);

        const response = await dispatch(signup(formData));
        if (response.payload?.success) {
            navigate('/');
            setSignUpData({
                avatar: "",
                name: "",
                email: "",
                password: ""
            })
            setViewImage("")
            Cookies.set('authToken', token, { expires: 7 })
        }
    }

    return (
        <HomeLayout>
            <Particle option={option3} />
            <div className='flex flex-col gap-3 justify-center items-center h-[91vh]'>
                <form onSubmit={createAccount} className='lg:w-[450px] w-[90%] md:w-1/2 h-fit p-7 flex flex-col gap-5 justify-between rounded-md bg-white text-black shadow-md'>
                    <div>
                        <h1 className='text-3xl font-semibold mb-3'>Sign Up</h1>
                        <p className='text-slate-400'>Please fill this form to create an account</p>
                    </div>
                    <hr className='border-t-2 border-slate-500' />
                    <div className='flex items-center w-full gap-4 '>
                        {
                            viewImage ? (
                                <img src={viewImage} alt="photo" className='rounded-[50%] w-14 h-14 hidden lg:block' />
                            ) : (
                                <label htmlFor="image" className='text-xl hidden lg:block md:block'><BsCloudUpload /></label>
                            )
                        }
                        <input type="file" name='image' id='image' accept='.jpg, .jpeg, .png, .svg' className="file-input file-input-bordered file-input-warning w-full  text-white" onChange={getImage} />
                    </div>
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="name" className='text-xl hidden lg:block md:block text-yellow-500'><BsPerson /></label>
                        <input type="text" name='name' id='name' placeholder="Enter Name" className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full " onChange={handleUserInput} />
                    </div>
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="email" className='text-xl hidden lg:block md:block text-yellow-500'><BsEnvelope /></label>
                        <input type="email" name="email" id="email" placeholder='Enter Email' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full " onChange={handleUserInput} />
                    </div>
                    <div className='flex items-center w-full gap-4 border-2 border-yellow-500 px-4 rounded-lg h-14 bg-slate-900'>
                        <label htmlFor="password" className='text-xl hidden lg:block md:block text-yellow-500'><BsLock /></label>
                        <input type="password" name="password" id="password" placeholder='Enter Password' className="py-2 border-0 outline-0 text-xl text-white bg-transparent w-full " onChange={handleUserInput} />
                    </div>
                    <button type='submit' className='btn btn-primary w-full'>SignUp</button>
                </form>
                <p className='text-xl text-white'>Already have an account ?  <Link to={'/login'} className='text-2xl text-blue-500 hover:underline '>Login</Link></p>
            </div>
        </HomeLayout>
    )
}

export default SignUp
