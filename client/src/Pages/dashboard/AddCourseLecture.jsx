import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { addLecture } from '../../redux/slices/LectureSlice';

function AddCourseLecture() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (!state) {
            navigate("/courses")
        }
    }, [])

    const [data, setData] = useState({
        cid: state?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleVideo = (e) => {
        const video = e.target.files[0];
        if (video) {
            const source = window.URL.createObjectURL(video);
            setData({
                ...data,
                lecture: video,
                videoSrc: source
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!data.lecture || !data.title || !data.description) {
            toast.error("All feilds are required")
            return;
        }
        const res = await dispatch(addLecture(data));
        if (res?.payload?.success) {
            navigate(-1)
            setData({
                cid: state._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }


    return (
        <div>

        </div>
    )
}

export default AddCourseLecture
