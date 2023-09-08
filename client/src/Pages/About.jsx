import aboutMainImage from '../assets/aboutMainImage.png'
import apj from '../assets/apj.png'
import billGates from '../assets/billGates.png'
import einstein from '../assets/einstein.png'
import nelsonMandela from '../assets/nelsonMandela.png'
import steveJobs from '../assets/steveJobs.png'
import HomeLayout from '../Layouts/HomeLayout'

function About() {
    return (
        <HomeLayout>
            <div className=' flex flex-col  lg:p-16 p-8'>
                <section className='flex lg:flex-row flex-col items-center justify-between w-full'>
                    <div className=' flex flex-col gap-16 lg:w-[70%] w-full'>
                        <h1 className='lg:text-5xl text-3xl font-bold text-yellow-500 text-center lg:text-left'>Affordable and quality education</h1>
                        <p className='lg:text-2xl text-xl text-slate-500 font-semibold text-center lg:text-left'> Our goal is to provide the affordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.  </p>
                    </div>
                    <div className='lg:w-[30%] drop-shadow-2xl brightness-50 '>
                        <img src={aboutMainImage} alt="image" className='bg-transparent' />
                    </div>
                </section>
                <section className='pt-4 w-full lg:w-[80%] lg:mx-auto'>
                    <div className="carousel w-full">
                        <div id="slide1" className="carousel-item relative w-full justify-center">
                            <div className='flex flex-col gap-5 justify-center items-center'>
                                <img src={apj} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>" If you want to shine like a sun , first burn like a sun. "</p>
                                <h3 className='font-bold text-center text-white text-xl'>APJ Abdul Kalam</h3>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-5 lg:right-5 left-1 right-1 top-1/2">
                                <a href="#slide5" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full justify-center">
                            <div className='flex flex-col gap-5 justify-center items-center'>
                                <img src={billGates} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>" Patience is a key element of success. "</p>
                                <h3 className='font-bold text-center text-white text-xl'>Bill Gates</h3>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-5 lg:right-5 left-1 right-1 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full justify-center">
                            <div className='flex flex-col gap-5 justify-center items-center'>
                                <img src={einstein} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>" Try no to become a man of success, but rather try to become a man of value. "</p>
                                <h3 className='font-bold text-center text-white text-xl'>Albert Einstein</h3>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-5 lg:right-5 left-1 right-1 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide4" className="carousel-item relative w-full justify-center">
                            <div className='flex flex-col gap-5 justify-center items-center'>
                                <img src={nelsonMandela} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>" Education is the most powerful tool you can use to change the world. "</p>
                                <h3 className='font-bold text-center text-white text-xl'>Nelson Mendela</h3>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-5 lg:right-5 left-1 right-1 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                        <div id="slide5" className="carousel-item relative w-full justify-center">
                            <div className='flex flex-col gap-5 justify-center items-center'>
                                <img src={steveJobs} className="w-40 h-40 lg:w-[300px] lg:h-[300px] rounded-3xl" />
                                <p className='lg:text-xl text-[1rem] text-slate-500 text-center'>" Quality is more important than quantity. "</p>
                                <h3 className='font-bold text-center text-white text-xl'>Steve Jobs</h3>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-5 lg:right-5 left-1 right-1 top-1/2">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </HomeLayout>
    )
}

export default About
