function CarouselDiv({ slidenumber, image, desc, title }) {
    return (
        <div id={`slide${slidenumber}`} className="carousel-item w-full justify-center">
            <div className='flex flex-col gap-5 justify-center items-center'>
                <img src={image} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>{desc}</p>
                <h3 className='font-bold text-center text-white text-xl'>{title}</h3>
            </div>
        </div>
    )
}

export default CarouselDiv
