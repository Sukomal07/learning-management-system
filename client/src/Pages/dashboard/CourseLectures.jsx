import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from '@vidstack/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from '../../layouts/HomeLayout'
import { getLectures } from '../../redux/slices/LectureSlice';

function CourseLectures() {

    const [currentVideo, setCurrentVideo] = useState(0)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture)
    const { role } = useSelector((state) => state.auth)
    const videoSrc = lectures[currentVideo]?.lecture?.secure_url
    console.log(lectures);
    useEffect(() => {
        if (!state) {
            navigate("/courses")
        }
        async function fetchData() {
            await dispatch(getLectures(state._id))
        }
        fetchData()
    }, [state, navigate, dispatch])

    return (
        <HomeLayout>
            <div className='flex flex-col mb-10 gap-12 pt-10'>
                <h1 className='text-center font-semibold text-3xl capitalize text-yellow-400'>Course Name : <span className='text-blue-500'>{state.title}</span></h1>

                <div className='w-full lg:px-12 px-6 flex lg:flex-row flex-col'>
                    <div className='lg:w-[70%] w-full'>
                        <div className='lg:w-10/12'>
                            {lectures.length > 0 && currentVideo !== undefined && (
                                <MediaPlayer src={videoSrc} >
                                    <MediaOutlet className='lg:h-[500px]' />
                                    <MediaCommunitySkin />
                                </MediaPlayer>
                            )}
                        </div>
                    </div>
                    <div className='w-[30%]'>
                        hello
                    </div>
                </div>

            </div>
        </HomeLayout>
    )
}

export default CourseLectures
