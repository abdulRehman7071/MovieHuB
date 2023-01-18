import React, { useEffect, useState } from 'react'

const Cards = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        async function getMovies(url) {
            let res = await fetch(url)
            let movieRes = await res.json()
            setMovies(movieRes)
            console.log(movieRes);
        }
        getMovies('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
    }, [])
    return (
        <div className=' flex my-5'>
            {
                movies.map((movie, id) => (
                    <div key={id} className=' w-36 mx-2 cursor-pointer hover:scale-110 transition-all ease-in-out'>
                        <div className=' relative'>
                            <img src={movie.Poster} alt="" />

                        </div>
                        <div className=' rounded flex flex-col text-sm'>
                            <h2 className=' my-1 font-bold'>
                                {movie.Title}
                            </h2>
                            <h2 className=' my-1'>
                                Rating: {movie.Runtime}
                            </h2>
                            <h3 className=' my-1'>
                                Year:{movie.Year}
                            </h3>
                        </div>


                    </div>
                ))
            }

        </div>
    )
}

export default Cards
