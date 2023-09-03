import HomeLayout from "../Layouts/HomeLayout"

const HomePage = () => {
    return (
        <HomeLayout>
            <div className="flex gap-10 justify-center h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl text-white font-semiboldbold">Find out best <span className="text-yellow-500 font-bold">Online Courses</span></h1>
                    <p className="text-gray-200 text-xl">We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost </p>
                </div>

            </div>
        </HomeLayout>
    )
}

export default HomePage
