import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'


function Footer() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    return (
        <>
            <footer className="bg-white py-5 lg:px-20 px-8 gap-4 w-full flex flex-col md:flex-row lg:flex-row justify-between items-center lg:absolute lg:bottom-0">
                <span className='lg:text-lg md:text-lg  text-slate-600'>Copyright @{currentYear} All rights reserved</span>
                <section className='flex items-center justify-center gap-5 text-2xl text-slate-400'>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 transition-all ease-in-out duration-300'><BsFacebook /></a>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 transition-all ease-in-out duration-300'><BsLinkedin /></a>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 transition-all ease-in-out duration-300'><BsGithub /></a>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 transition-all ease-in-out duration-300'><BsTwitter /></a>
                </section>
            </footer>
        </>
    )
}

export default Footer