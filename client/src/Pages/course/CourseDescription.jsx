import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import HomeLayout from '../../layouts/HomeLayout'

function CourseDescription() {
    const location = useLocation()

    useEffect(() => {
        console.log(location);
    }, [])
    return (
        <HomeLayout>

        </HomeLayout>
    )
}

export default CourseDescription
