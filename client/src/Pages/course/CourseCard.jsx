function CourseCard({ data }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl cursor-pointer transform transition-transform hover:scale-110">
            <figure><img src={data.thumbnail?.secure_url} alt="course thumbnail" className="w-full h-60 group-hover:scale[1.1]" /></figure>
            <div className="card-body">
                <h2 className="card-title capitalize text-xl text-white">
                    {data.title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className="capitalize">{data.description}</p>
                <p className="capitalize font-bold">Instructor : {data.createdBy}</p>
                <p className="capitalize font-bold">Number of Lectures : {data.numberOfLectures}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline capitalize py-4 px-3 border-yellow-400 border-2">{data.category}</div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
