import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db, moviesRef } from '../firebase/firebase'
import { ThreeCircles } from 'react-loader-spinner';
import Review from '../components/Review'

const MovieDetails = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({
        title: '',
        year: '',
        url: '',
        desc: '',
        rating: 0,
        rated: 0
    })
    useEffect(() => {
        async function getData() {
            setLoading(true)
            const _doc = doc(db, 'Movies', id)
            const _data = await getDoc(_doc)
            setMovie(_data.data())
            setLoading(false)
        }

        getData()
    }, [])
    return (
        <section className=' p-4 flex flex-col md:flex-row md:justify-center items-center md:items-start min-h-screen'>
            {loading ? <div className=' flex justify-center items-center w-full h-screen'><ThreeCircles height={40} color='white' /></div> :
                <>
                    <img src={movie.url} alt=""
                        className=' h-96 mt-2 md:sticky top-24'
                    />
                    <div className="md:ml-4 p-1 md:w-1/2">
                        <h1 className=' text-3xl bold  '>
                            {movie.title} <span className=' text-xl'>( {movie.year} )</span>
                        </h1>
                        <ReactStars
                            size={20}
                            value={movie.rating / movie.rated}
                            edit={false}
                        />
                        <p className=' mt-3'>
                            {movie.desc}
                        </p>

                        <Review id={id} prevRating={movie.rating} userRated={movie.rated} />

                    </div>
                </>
            }
        </section>
    )
}

export default MovieDetails
