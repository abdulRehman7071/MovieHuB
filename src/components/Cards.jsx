import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { doc, getDocs } from 'firebase/firestore';
import { ThreeCircles } from 'react-loader-spinner';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';
const Cards = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getMovies() {
            setLoading(true)
            const _data = await getDocs(moviesRef)
            _data.forEach((movie, index) => {
                setMovies((prev) => [...prev, { ...(movie.data()), id: movie.id }])
                //if error will remove prev

            })
            setLoading(false)
        }
        getMovies()
    }, [])
    return (
        <div className=' flex mt-5 flex-wrap md:justify-start justify-around min-h-screen'>
            {loading ? <div className=' flex justify-center items-center w-full h-screen'><ThreeCircles height={40} color='white' /></div> :
                movies.map((movie, id) => (
                    <Link to={`/view-movie/${movie.id}`} key={id}>
                        <div className='md:w-36 mx-2 shadow-xl drop-shadow-xl cursor-pointer hover:scale-110 hover:-translate-y-1 transition-all ease-in-out rounded my-4 duration-500'>
                            <div className=' relative p-1 '>
                                <img src={movie.url} alt={movie.title} className=' h-60 md:72' />

                            </div>
                            <div className=' rounded flex flex-col text-xs'>
                                <h2 className=' my-1 font-bold'> Name:
                                    <span className=' text-slate-100 ml-1'>
                                        {movie.title}
                                    </span>
                                </h2>
                                <h2 className='flex items-center my-1'>
                                    Rating :
                                    <span className=' text-slate-100 ml-1'>
                                        <ReactStars
                                            size={20}
                                            value={movie.rating / movie.rated}
                                            edit={false}
                                        />

                                    </span>
                                </h2>
                                <h3 className=' my-1'>
                                    Year:
                                    <span className=' text-slate-100 ml-1'>
                                        {movie.year}
                                    </span>
                                </h3>
                            </div>


                        </div>
                    </Link>
                ))
            }

        </div>
    )
}

export default Cards
