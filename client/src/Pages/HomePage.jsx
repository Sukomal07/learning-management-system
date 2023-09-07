import { Link } from "react-router-dom"

import HomeImage from "../assets/homeImage.png"
import Particle from "../components/Particle"
import HomeLayout from "../Layouts/HomeLayout"
const HomePage = () => {
    return (
        <HomeLayout>
            <Particle />
            <div className="h-screen flex lg:px-8 px-4 pb-8 lg:pb-0 flex-col lg:flex-row justify-around items-center">
                <div className="lg:px-4 md:px-4 space-y-8 lg:w-1/2">
                    <h1 className="lg:text-5xl text-2xl text-white font-semiboldbold ">Find out best <span className="text-yellow-500 font-bold">Online Courses</span></h1>
                    <p className="text-gray-200 lg:text-xl tracking-wider">We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost </p>
                    <div className="flex gap-4 lg:flex-row md:flex-row items-center">
                        <Link to={'/courses'} className="w-fit">
                            <button className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg  font-semibold bg-white hover:bg-slate-600 transition-all ease-in-out duration-300 text-slate-600 cursor-pointer hover:text-white">Expole Courses</button>
                        </Link>
                        <Link to={'/contact'} className="w-fit">
                            <button className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg  font-semibold bg-white text-slate-600 cursor-pointer hover:bg-slate-600 transition-all ease-in-out duration-300 hover:text-white">Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={HomeImage} alt="image" className="bg-transparent" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage
