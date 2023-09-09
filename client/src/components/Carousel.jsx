function Carousel({ image, title, desc, slidenumber, totalslide }) {
    return (
        <div id={`slide${slidenumber}`} className="carousel-item relative w-full justify-center">
            <div className='flex flex-col gap-5 justify-center items-center'>
                <img src={image} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>{desc}</p>
                <h3 className='font-bold text-center text-white text-xl'>{title}</h3>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-5 lg:right-5 left-1 right-1 top-1/2">
                <a href={`#slide${slidenumber === 1 ? totalslide : slidenumber - 1}`} className="btn btn-circle">❮</a>
                <a href={`#slide${slidenumber === totalslide ? 1 : slidenumber + 1}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    )
}

export default Carousel
