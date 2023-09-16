import { useState } from 'react'
import { toast } from 'react-toastify'

import option2 from '../assets/Json/option2.json'
import Particle from '../components/Particle'
import axiosInstance from '../helpers/AxiosInstance';
import HomeLayout from '../layouts/HomeLayout'
function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleUserInput(e) {
        const { name, value } = e.target
        setUserInput({ ...userInput, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let hasError = false;

        if (!userInput.name || !userInput.email || !userInput.message) {
            toast.error("All input fields are required");
            hasError = true;
        } else if (!userInput.email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            toast.error('Please enter a valid email');
            hasError = true;
        }

        if (!hasError) {
            try {
                toast.loading("wait! sending message...", {
                    position: 'top-center'
                })
                const response = await axiosInstance.post('/contactus', userInput);
                console.log(response);
                toast.dismiss();
                if (response.data?.success) {
                    toast.success(response.data.message)
                    setUserInput({
                        name: "",
                        email: "",
                        message: ""
                    })
                }
            } catch (error) {
                console.log(error);
                toast.dismiss();
                toast.error(error.response?.statusText || error.message)
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        }
    }


    return (
        <HomeLayout>
            <Particle option={option2} />
            <div className='flex flex-col gap-3 justify-center items-center h-screen'>
                <form onSubmit={handleSubmit} className='rounded-lg border-2 border-yellow-400 lg:w-[450px] w-[90%] md:w-1/2 h-fit p-7 flex flex-col gap-5  bg-white text-black shadow-lg'>
                    <h1 className='text-3xl font-semibold mb-2'>Contact Us</h1>
                    <p className='text-slate-400'>For any queries, Please reach out to us. Our Support team will get back to you within 24 hours.</p>
                    <hr className='border-t-2 border-slate-500' />
                    <div className='flex flex-col  w-full gap-4 '>
                        <div className='flex flex-col  w-full gap-2 '>
                            <label htmlFor="name" className='font-semibold text-xl text-slate-500'>Name</label>
                            <input type="text" placeholder="Enter Your Name" name='name' id='name' className="input input-bordered input-primary w-full text-white" value={userInput.name} onChange={handleUserInput} />
                        </div>
                        <div className='flex flex-col  w-full gap-2' >
                            <label htmlFor="email" className='font-semibold text-xl text-slate-500'>Email</label>
                            <input type="email" placeholder="Enter Your Email" name='email' id='email' className="input input-bordered input-primary w-full text-white " value={userInput.email} onChange={handleUserInput} />
                        </div>
                        <div className='flex  flex-col  w-full gap-2'>
                            <label htmlFor="message" className='font-semibold text-xl text-slate-500'>Message</label>
                            <textarea name='message' id='message' className="textarea textarea-primary  text-white" placeholder="Your Query" value={userInput.message} onChange={handleUserInput}></textarea>
                        </div>
                    </div>
                    <button className='btn-primary rounded-lg py-3 text-xl' type='submit'>Submit</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact
