import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";

import Footer from '../../components/Footer'
import { deleteLecture, getLectures } from "../../redux/slices/LectureSlice";

function CourseLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [autoPlay, setAutoPlay] = useState(localStorage.getItem("autoPlay") === "true");
    const { role } = useSelector((state) => state.auth);

    const handleVideoEnded = () => {
        if (autoPlay && currentVideo < lectures.length - 1) {
            setCurrentVideo(currentVideo + 1);
        }
    };
    const toggleAutoPlay = () => {
        const newValue = !autoPlay;
        setAutoPlay(newValue);
        localStorage.setItem("autoPlay", newValue.toString());
    };
    async function fetchData() {
        await dispatch(getLectures(state?._id));
    }

    async function deleteHandle(cid, lectureId) {
        const data = { cid, lectureId };
        const res = await dispatch(deleteLecture(data));
        if (res?.payload?.success) {
            if (lectures) {
                setCurrentVideo(0)
            }
        }
    }
    function handleClick(idx) {
        setCurrentVideo(idx)
    }

    const splitParagraph = (paragraph) => {
        const sentences = paragraph.split('.');
        return (
            <ul className="flex flex-col gap-4">
                {sentences.map((sentence, index) => (
                    <li key={index} className="capitalize text-white px-4 list-disc">{sentence}</li>
                ))}
            </ul>
        );
    }

    useEffect(() => {
        if (!state) {
            navigate("/courses");
        } else {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (lectures && currentVideo !== undefined) {
            document.title = `${lectures[currentVideo]?.title} - Learning Management System`;
        }
    }, [lectures, currentVideo]);


    return (
        <div className="relative">
            {lectures?.length > 0 ? (
                <>
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-4 lg:gap-0 md:gap-0 pb-16 ">
                        <div className="lg:w-[70%] md:w-[60%] md:h-screen lg:h-screen h-[50vh] overflow-y-scroll ">
                            <div className="w-full h-16 flex justify-between items-center lg:px-12 px-6 bg-white lg:sticky md:sticky top-0 z-10 mb-4">
                                <div className="flex gap-8 items-center  h-full">
                                    <FaArrowLeft
                                        className="text-black text-2xl cursor-pointer hover:text-slate-600"
                                        onClick={() => navigate(-1)}
                                    />
                                    <p className="text-black lg:text-xl">
                                        Now playing -{" "}
                                        <span className=" font-semibold capitalize ">
                                            {lectures[currentVideo]?.title}
                                        </span>
                                    </p>
                                </div>
                                <div >
                                    <label className="flex items-center h-full gap-4">
                                        <span className="font-semibold text-black text-xl lg:block md:block hidden">Autoplay</span>
                                        <Switch
                                            onChange={toggleAutoPlay}
                                            checked={autoPlay}
                                            height={24}
                                            width={48}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            onColor="#a7a51b"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="h-full lg:overflow-y-scroll md:overflow-y-scroll px-4">
                                <div className="lg:px-6 lg:mb-8 mb-4">
                                    {lectures.length > 0 && currentVideo !== undefined && (
                                        <video key={lectures[currentVideo]?.lecture?.secure_url} controls autoPlay={autoPlay} controlsList="nodownload" disablePictureInPicture onEnded={handleVideoEnded} className="w-full h-auto border-2 border-slate-500 rounded-md outline-none focus:outline-none">
                                            <source src={lectures[currentVideo]?.lecture?.secure_url} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                                <div className="flex flex-col gap-4 p-8">
                                    <h1 className="text-white font-bold text-3xl">Overview :</h1>
                                    {splitParagraph(lectures[currentVideo]?.description)}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[30%] md:w-[40%] lg:h-screen md:h-screen h-[50vh] overflow-y-scroll">
                            <div className="flex flex-col gap-4 z-10 lg:sticky md:sticky top-0">
                                <h1 className="w-full text-center font-bold text-black capitalize bg-white h-16 flex items-center justify-center lg:text-2xl md:text-xl text-xl">
                                    {state?.title}
                                </h1>
                                {role === "ADMIN" && (
                                    <button onClick={() => navigate(`/course/${state?.title}/${state?._id}/lectures/addlecture`, { state: state })} className="btn btn-neutral normal-case w-full rounded">
                                        Add lecture
                                    </button>
                                )}
                            </div>
                            <div className="py-4 h-full lg:overflow-y-scroll md:overflow-y-scroll px-4">
                                <ul className="menu gap-8">
                                    {lectures &&
                                        lectures.map((lecture, idx) => {
                                            return (
                                                <li key={lecture._id}>
                                                    <div className="flex justify-between items-center">
                                                        <span
                                                            className="text-white text-xl font-semibold capitalize"
                                                            onClick={() => handleClick(idx)}
                                                        >
                                                            {lecture?.title}
                                                        </span>
                                                        {role === "ADMIN" && (
                                                            <div className="flex gap-4">
                                                                <button className="text-xl text-blue-500 transform transition-transform hover:scale-110 hover:text-blue-700"
                                                                    onClick={() => navigate(`/course/${state?.title}/${state?._id}/lectures/editlecture`, { state: lectures[idx] })}>
                                                                    <FiEdit />
                                                                </button>
                                                                <button
                                                                    className="text-xl text-red-500 hover:text-red-700 transform transition-transform hover:scale-110"
                                                                    onClick={() =>
                                                                        deleteHandle(state?._id, lecture?._id)
                                                                    }
                                                                >
                                                                    <FiTrash2 />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col h-[90vh] gap-5 items-center justify-center">
                    <p className="font-semibold text-2xl tracking-wider capitalize text-center">
                        {state?.title}
                    </p>
                    {role === "ADMIN" && (
                        <button onClick={() => navigate(`/course/${state?.title}/${state?._id}/lectures/addlecture`, { state: state })} className="btn btn-neutral normal-case rounded">
                            Add lecture
                        </button>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default CourseLectures;
