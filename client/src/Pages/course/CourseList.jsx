import { useEffect } from 'react'
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout'
import { getAllCourse } from '../../redux/slices/CourseSlice'
import CourseCard from './CourseCard';

function CourseList() {
    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state?.course)
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    async function loadCourses() {
        await dispatch(getAllCourse())
    }
    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <HomeLayout>
            <div className='flex flex-col lg:pt-20 md:pt-10 lg:px-20 px-4 gap-14'>
                {
                    isLoggedIn && role === "ADMIN" ? (
                        <Link to={'/course/create'} className='absolute lg:right-20 right-8 top-6'>
                            <button className='flex items-center gap-2 text-green-500 hover:text-green-700 font-semibold text-2xl'><FiPlus /> Create new course</button>
                        </Link>
                    ) : <></>
                }
                <h1 className='font-bold lg:text-4xl md:text-4xl text-2xl font-serif text-white text-center'>Explore all courses made by <span className='text-yellow-400'>Industry Experts</span></h1>
                <div className='flex flex-wrap mb-10 gap-14 w-full px-8 justify-center'>
                    {
                        courseData?.map((course) => (
                            <CourseCard key={course._id} data={course} />
                        ))
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList
