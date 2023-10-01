import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from '../../layouts/HomeLayout'

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth)
    return (
        <HomeLayout>
            <div className="flex flex-col lg:flex-row lg:px-20 py-12">
                <div className="lg:w-1/2 w-full px-12 flex flex-col gap-7">
                    <img src={state.thumbnail?.secure_url} alt="thumbnail" className="rounded-xl w-full h-96" />
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">Course category : <span className="text-xl text-blue-500">{state.category}</span></p>
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">Instructor : <span className="text-xl text-blue-500">{state.createdBy}</span></p>
                    <p className="font-semibold lg:text-2xl text-xl text-yellow-400 capitalize">Number of lectures : <span className="text-xl text-blue-500">{state.numberOfLectures}</span></p>
                    {
                        role === 'ADMIN' || data?.subscription?.status === 'active' ? (
                            <button className="btn btn-primary capitalize" onClick={() => navigate(`/course/${state.title}/${state._id}/lectures`, { state: state })}>Go to Lectures</button>

                        ) : (

                            <button className="btn btn-primary capitalize" onClick={() => navigate(`/course/${state.title}/checkout`, { state: state })}>Subscribe</button>

                        )
                    }
                </div>
                <div className="lg:w-1/2 w-full px-12 py-12 flex flex-col gap-4 ">
                    <h1 className="font-bold text-yellow-500 lg:text-4xl text-xl capitalize">{state.title}</h1>
                    <p className="font-semibold lg:text-2xl text-xl text-amber-500 capitalize">Course Description :</p>
                    <p className="font-semibold lg:text-xl text-xs text-white normal-case tracking-wider">{state.description}</p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription
