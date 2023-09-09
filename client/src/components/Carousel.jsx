import { useState } from "react";

import CarouselDiv from "../components/CarouselDiv";
import { celeb } from "../constants/celebData.js";

function Carousel() {
    const [slidenumber, setSlideNumber] = useState(1);

    const handlePrevClick = () => {
        setSlideNumber((currSlide) => {
            return currSlide === 1 ? celeb.length : currSlide - 1;
        });
    };

    const handleNextClick = () => {
        setSlideNumber((currSlide) => {
            return currSlide === celeb.length ? 1 : currSlide + 1;
        });
    };

    return (
        <div className="relative">
            <a href={`#slide${slidenumber}`} onClick={handlePrevClick} className="btn btn-circle absolute z-30 flex justify-center items-center  lg:left-5  left-1 top-1/2">❮</a>
            <div className="carousel w-full relative">
                {celeb &&
                    celeb.map((person) => (
                        <CarouselDiv key={person.slidenumber} {...person} totalslide={celeb.length} />
                    ))}
            </div>

            <a href={`#slide${slidenumber}`} onClick={handleNextClick} className="btn btn-circle absolute z-30 flex justify-center items-center  lg:right-5  right-1 top-1/2">❯</a>
        </div>
    );
}

export default Carousel;
