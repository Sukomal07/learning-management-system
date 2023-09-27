import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from '../../layouts/HomeLayout'
import { deleteCourse } from "../../redux/slices/CourseSlice";

function CourseDescription() {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth)
    async function onDelete() {
        const res = await dispatch(deleteCourse(state?._id));
        if (res?.payload?.success) {
            navigate('/courses')
        }
    }
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
                <div className="lg:w-1/2 w-full px-12 py-12 flex flex-col gap-4 relative">
                    {
                        role === 'ADMIN' && (
                            <div className="flex items-center gap-6 absolute lg:right-2 bottom-0 ">
                                <button className="flex items-center text-red-500 gap-2 font-semibold hover:text-red-700" onClick={onDelete}><FiTrash2 /> Delete Course</button>
                                <button onClick={() => navigate(`/course/${state.title}/${state._id}/editCourse`, { state: state })} className="flex items-center text-blue-500 gap-2 font-semibold hover:text-blue-700"><FiEdit /> Edit Course</button>
                            </div>
                        )
                    }
                    <h1 className="font-bold text-yellow-500 lg:text-4xl text-xl capitalize">{state.title}</h1>
                    <p className="font-semibold lg:text-2xl text-xl text-amber-500 capitalize">Course Description :</p>
                    <p className="font-semibold lg:text-xl text-xs text-blue-500 capitalize">{state.description}</p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription
