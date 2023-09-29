import Chart, { ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js/auto'
import { useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { FaUsers } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { GiMoneyStack } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../layouts/HomeLayout'
import { deleteCourse, getAllCourse } from '../../redux/slices/CourseSlice';
import { getPaymentsRecord } from '../../redux/slices/RazorpaySlice';
import { getStats } from '../../redux/slices/StatSlice';

Chart.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)
function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUserCount, subscribedCount } = useSelector((state) => state.stat);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
    const Courses = useSelector((state) => state.course.courseData);

    const userData = {
        labels: ["Registered User", "Entrolled User"],
        datasets: [
            {
                label: "User details",
                data: [allUserCount, subscribedCount],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1
            }
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales",
                data: monthlySalesRecord,
                pointBackgroundColor: ["rgb(255, 99, 132)"],
                borderWidth: 2,
            }
        ],
    }
    const userDataOptions = {
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    fontSize: 16
                }
            }
        }
    };
    const salesDataOptions = {
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    fontSize: 16,
                },
            },
        },
    };
    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourse());
                await dispatch(getStats());
                await dispatch(getPaymentsRecord())
            }
        )()
    }, [])

    async function onDelete(id) {
        const res = await dispatch(deleteCourse(id));
        if (res?.payload?.success) {
            await dispatch(getAllCourse())
        }
    }

    return (
        <HomeLayout>
            <div className='flex flex-col gap-10 lg:pt-10 md:pt-10 pt-0 mb-10'>
                <h1 className='font-bold lg:text-3xl md:text-3xl text-3xl text-slate-500 text-center'>Admin DashBoard</h1>
                <div className='w-full flex lg:flex-row md:flex-row flex-col lg:px-16 md:px-16 px-6 justify-between items-center gap-8'>
                    <div className='lg:w-[30%] lg:h-96 md:w-[30%] md:h-96 w-full flex flex-col gap-10'>
                        <Pie data={userData} options={userDataOptions} />
                    </div>
                    <div className='w-full lg:w-[70%] md:w-[70%]'>
                        <Line data={salesData} options={salesDataOptions} />
                    </div>
                </div>
                <div className='flex justify-around w-full lg:flex-row md:flex-row flex-col lg:px-16 md:px-16 px-6 py-3 gap-3'>
                    <div className='flex flex-col items-center gap-4'>
                        <h1 className='font-bold lg:text-3xl md:text-3xl text-3xl text-slate-500' >Register Users</h1>
                        <div className='flex items-center gap-2 '>
                            <FaUsers className='text-yellow-500 text-4xl' />
                            <p className='text-white font-bold text-4xl'>{allUserCount}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <h1 className='font-bold lg:text-3xl md:text-3xl text-3xl text-slate-500' >Subscribed User</h1>
                        <div className='flex items-center gap-2 '>
                            <FaUsers className='text-green-500 text-4xl' />
                            <p className='text-white font-bold text-4xl'>{subscribedCount}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <h1 className='font-bold lg:text-3xl md:text-3xl text-3xl text-slate-500' >Subscription Count</h1>
                        <div className='flex items-center gap-2 '>
                            <FcSalesPerformance className='text-yellow-500 text-4xl' />
                            <p className='text-white font-bold text-4xl'>{allPayments?.count}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <h1 className='font-bold lg:text-3xl md:text-3xl text-3xl text-slate-500' >Total Revenue</h1>
                        <div className='flex items-center gap-2 '>
                            <GiMoneyStack className='text-green-500 text-4xl' />
                            <p className='text-white font-bold text-4xl'>{isNaN(allPayments?.count) ? 0 : allPayments.count * 499}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex lg:flex-row md:flex-row flex-col lg:px-16 md:px-16 px-6 justify-between items-center gap-6 lg:gap-2 md:gap-2'>
                    <h1 className='font-bold lg:text-3xl md:text-3xl text-3xl text-slate-500'>Course Overview</h1>
                    <Link to={'/course/create'} className='w-full lg:w-fit md:w-fit'>
                        <button className='btn btn-success normal-case text-white font-semibold w-full lg:w-fit md:w-fit'>Create new course</button>
                    </Link>
                </div>
                <div className="overflow-x-auto lg:px-16 md:px-16 px-6 w-full">
                    <table className="table text-center">
                        <thead>
                            <tr className='text-white text-xl'>
                                <th>S No.</th>
                                <th>Course Title</th>
                                <th>Course Category</th>
                                <th>Instructor</th>
                                <th>Lectures</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Courses?.map((course, idx) => {
                                return (
                                    <tr key={course?._id} className='hover:bg-base-300'>
                                        <th className='capitalize lg:text-xl'>{idx + 1}</th>
                                        <td className='capitalize lg:text-xl'>
                                            <button onClick={() => navigate(`/course/${course?.title}/${course?._id}/lectures`, { state: Courses[idx] })} className='capitalize'>
                                                {course?.title}
                                            </button>
                                        </td>
                                        <td className='capitalize lg:text-xl'>{course?.category}</td>
                                        <td className='capitalize lg:text-xl'>{course?.createdBy}</td>
                                        <td className='capitalize lg:text-xl'>{course?.numberOfLectures}</td>
                                        <td className='flex items-center gap-4 justify-center'>
                                            <button onClick={() => navigate(`/course/${course?.title}/${course?._id}/editCourse`, { state: Courses[idx] })} className=" text-blue-500 font-semibold hover:text-blue-700 text-xl">
                                                <FiEdit />
                                            </button>
                                            <button className="text-red-500 font-semibold hover:text-red-700 text-xl" onClick={() => onDelete(course?._id)}>
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AdminDashboard
