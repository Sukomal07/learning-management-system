import { Link } from "react-router-dom"

import HomeImage from "../assets/homeImage.png"
import HomeLayout from "../Layouts/HomeLayout"
const HomePage = () => {
    return (
        <HomeLayout>
            <div className="h-screen flex px-8 justify-around items-center">
                <div className="px-4 lg:px-0 space-y-8 w-1/2">
                    <h1 className="lg:text-5xl text-2xl text-white font-semiboldbold ">Find out best <span className="text-yellow-500 font-bold">Online Courses</span></h1>
                    <p className="text-gray-200 lg:text-xl tracking-wider">We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost </p>
                    <div className="space-x-6">
                        <Link to={'/courses'}>
                            <button className="rounded-md px-8 py-2 text-lg font-semibold bg-white hover:bg-slate-600 transition-all ease-in-out duration-300 text-slate-600 cursor-pointer hover:text-white">Expole Courses</button>
                        </Link>
                        <Link to={'/contact'}>
                            <button className="rounded-md px-8 py-2 text-lg font-semibold bg-white text-slate-600 cursor-pointer hover:bg-slate-600 transition-all ease-in-out duration-300 hover:text-white">Cotact Us</button>
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={HomeImage} alt="image" className="" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage
