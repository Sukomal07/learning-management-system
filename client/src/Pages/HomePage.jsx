import { Link } from "react-router-dom"

import HomeImage from "../assets/Images/homeImage.png"
import option1 from '../assets/Json/option1.json'
import Particle from "../components/Particle"
import HomeLayout from "../layouts/HomeLayout"
const HomePage = () => {
    return (
        <HomeLayout>
            <Particle option={option1} />
            <div className="h-screen flex lg:px-8 px-4 pb-8 lg:pb-0  flex-col lg:flex-row justify-around items-center">
                <div className="lg:px-4 md:px-4 space-y-8 lg:w-1/2">
                    <h1 className="lg:text-5xl text-2xl text-white font-semiboldbold ">Find out best <span className="text-yellow-500 font-bold">Online Courses</span></h1>
                    <p className="text-gray-200 lg:text-xl tracking-wider">We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost </p>
                    <div className="flex gap-4 lg:flex-row md:flex-row items-center">
                        <Link to={'/courses'} className="w-fit">
                            <button className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg  font-semibold bg-yellow-500 hover:bg-white hover:text-yellow-400 transition-all ease-in-out duration-300 text-black border-2 border-white hover:border-2 hover:border-yellow-400 cursor-pointer ">Expole Courses</button>
                        </Link>
                        <Link to={'/contact'} className="w-fit">
                            <button className="rounded-md lg:w-48 md:w-48 w-36 py-2 lg:text-lg md:text-lg  font-semibold bg-transparent text-white border-2 border-yellow-400  hover:border-2 hover:border-white cursor-pointer hover:bg-yellow-400
                            transition-all ease-in-out duration-300 hover:text-black">Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={HomeImage} alt="image" className="bg-transparent w-full h-full" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage
