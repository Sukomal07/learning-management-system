import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'


function Footer() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    return (
        <>
            <footer className="bg-slate-600 py-5 px-20 w-full m-auto flex justify-between items-center">
                <span className='text-lg text-white'>Copyright @{currentYear} All rights reserved</span>
                <section className='flex gap-4 text-2xl text-white'>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 '><BsFacebook /></a>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 '><BsLinkedin /></a>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500'><BsGithub /></a>
                    <a href="#" target='_blank' className='cursor-pointer hover:text-blue-500 '><BsTwitter /></a>
                </section>
            </footer>
        </>
    )
}

export default Footer