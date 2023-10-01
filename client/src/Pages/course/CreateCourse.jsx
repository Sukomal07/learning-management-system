import { useState } from 'react';
import { FcAddImage } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import HomeLayout from '../../layouts/HomeLayout'
import { createCourse } from '../../redux/slices/CourseSlice';
function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: ""
    })
    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInput({
            ...userInput, [name]: value
        })
    }
    function handleImage(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener('load', function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadImage
                })
            })
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!userInput.thumbnail) {
            toast.error("Please enter course thumbnail")
            return;
        }
        const formData = new FormData();
        formData.append("title", userInput.title);
        formData.append("description", userInput.description);
        formData.append("category", userInput.category);
        formData.append("createdBy", userInput.createdBy);
        formData.append("thumbnail", userInput.thumbnail);

        const response = await dispatch(createCourse(formData));
        if (response.payload?.success) {
            navigate('/courses');
            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail: null,
                previewImage: ""
            })
        }
    }

    return (
        <HomeLayout>
            <form onSubmit={onSubmit} className='flex flex-col lg:flex-row lg:px-20 py-12'>
                <div className="lg:w-1/2 w-full px-12 flex flex-col gap-4 lg:py-12 py-0">
                    {
                        userInput.previewImage ? (
                            <img src={userInput.previewImage} alt="thumbnail" className="rounded-xl w-full h-96" />
                        ) : (
                            <div className='w-full h-96 flex justify-center items-center border-2 border-slate-500 rounded-lg'>
                                <FcAddImage size={'10rem'} />
                            </div>
                        )
                    }
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-white text-xl' htmlFor="thumbnail">Course Thumbnail</label>
                        <input type="file" name='thumbnail' id='thumbnail' accept='.jpg, .jpeg, .png, .svg' onChange={handleImage} className="file-input file-input-bordered file-input-accent w-full text-white" />
                    </div>
                </div>
                <div className="lg:w-1/2 w-full px-12 py-9 flex flex-col gap-6">
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-white text-xl' htmlFor="title">Course Title</label>
                        <input type="text" name='title' id='title' value={userInput.title} onChange={handleChange} placeholder="Type here" className="input input-bordered input-accent w-full text-white " />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-white text-xl' htmlFor="createdBy">Course Instructor</label>
                        <input type="text" name='createdBy' id='createdBy' value={userInput.createdBy} onChange={handleChange} placeholder="Type here" className="input input-bordered input-accent w-full text-white" />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-white text-xl' htmlFor="category">Course Domain</label>
                        <input type="text" name='category' id='category' value={userInput.category} onChange={handleChange} placeholder="Type here" className="input input-bordered input-accent w-full text-white" />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-white text-xl' htmlFor="description">Course Description</label>
                        <textarea type="text" name='description' id='description' value={userInput.description} onChange={handleChange} placeholder="Type here" className="textarea textarea-accent resize-y min-h-16 w-full text-white " />
                    </div>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
        </HomeLayout>
    )
}

export default CreateCourse
