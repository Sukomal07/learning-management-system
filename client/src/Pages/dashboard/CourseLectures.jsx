import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { deleteLecture, getLectures } from "../../redux/slices/LectureSlice";

function CourseLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const [currentVideo, setCurrentVideo] = useState(0);
    const { role } = useSelector((state) => state.auth);

    async function fetchData() {
        await dispatch(getLectures(state._id));
    }

    async function deleteHandle(cid, lectureId) {
        const data = { cid, lectureId };
        const res = await dispatch(deleteLecture(data));
        if (res?.payload?.success) {
            await dispatch(getLectures(state._id));
        }
    }
    useEffect(() => {
        if (!state) {
            navigate("/courses");
        }
        fetchData();
    }, []);

    return (
        <div className="relative">
            <div className="w-full h-16 bg-white sticky top-0 z-10 mb-4">
                <div className="flex gap-8 items-center lg:px-12 px-6 h-full">
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
            </div>
            {lectures.length > 0 ? (
                <>
                    <div className="w-full flex lg:flex-row flex-col gap-4 lg:gap-0 px-4 sticky top-20">
                        <div className="lg:flex-[5_1_0%] flex-[4_1_0%] overflow-hidden h-screen">
                            <div className="h-full overflow-y-scroll">
                                <div className="lg:px-6 mb-8">
                                    {lectures.length > 0 && currentVideo !== undefined && (
                                        <MediaPlayer
                                            src={lectures[currentVideo]?.lecture?.secure_url}
                                        >
                                            <MediaCommunitySkin />
                                            <MediaOutlet />
                                        </MediaPlayer>
                                    )}
                                </div>
                                <div className="flex flex-col gap-4 px-8">
                                    <h1 className="text-white font-bold text-3xl">Overview :</h1>
                                    <p className="text-2xl capitalize text-white tracking-wider">
                                        {lectures[currentVideo]?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex-[2_1_0%] overflow-hidden h-screen">
                            <div className="flex flex-col gap-4 z-10">
                                <h1 className="w-full text-center font-bold text-black capitalize bg-white h-12 flex items-center justify-center lg:text-2xl md:text-xl text-xl rounded ">
                                    {state.title}
                                </h1>
                                {role === "ADMIN" && (
                                    <button onClick={() => navigate(`/course/${state.title}/lectures/addlecture/${state._id}`, { state: state })} className="btn btn-neutral normal-case w-full rounded">
                                        Add lecture
                                    </button>
                                )}
                            </div>
                            <div className="py-4 h-full overflow-y-scroll">
                                <ul className="menu gap-8">
                                    {lectures &&
                                        lectures.map((lecture, idx) => {
                                            return (
                                                <li key={lecture._id}>
                                                    <div className="flex justify-between items-center">
                                                        <span
                                                            className="text-white text-xl font-semibold"
                                                            onClick={() => setCurrentVideo(idx)}
                                                        >
                                                            {lecture?.title}
                                                        </span>
                                                        {role === "ADMIN" && (
                                                            <div className="flex gap-4">
                                                                <button className="text-xl text-blue-500 transform transition-transform hover:scale-110 hover:text-blue-700">
                                                                    <FiEdit />
                                                                </button>
                                                                <button
                                                                    className="text-xl text-red-500 hover:text-red-700 transform transition-transform hover:scale-110"
                                                                    onClick={() =>
                                                                        deleteHandle(state._id, lecture?._id)
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
                <div className="flex flex-col gap-5 items-center justify-center">
                    <p className="font-semibold text-2xl tracking-wider capitalize text-center">
                        {state.title}
                    </p>
                    {role === "ADMIN" && (
                        <button onClick={() => navigate(`/course/${state.title}/lectures/addlecture/${state._id}`, { state: state })} className="btn btn-neutral normal-case rounded">
                            Add lecture
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default CourseLectures;
