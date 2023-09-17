import { useState } from 'react';
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

        </HomeLayout>
    )
}

export default CreateCourse
