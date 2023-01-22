import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { addDoc } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'


const UploadMovie = () => {
    const navigate = useNavigate()
    const useAppContext = useContext(AppState)
    const [movies, setMovies] = useState(
        {
            title: "",
            url: "",
            rating: 0,
            rated: 0,
            year: "",
            desc: ''
        }

    )
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        addMovie()
        // setMovies({})
        document.querySelector('form').reset()


    }
    const addMovie = async () => {
        try {
            if (useAppContext.login) {
                await addDoc(moviesRef, movies);
                swal({
                    title: 'Success',
                    icon: 'success',
                    buttons: false,
                    timer: 3000
                })
                await setLoading(false)
                navigate('/')
            }
            else {
                navigate('/login')
            }

        } catch (e) {
            swal({
                title: e,
                icon: 'error',
                buttons: false,
                timer: 3000
            })
        }

    }

    return (
        <section className=' flex  flex-col h-full mt-3 md:mt-0 md:justify-center items-center text-black min-h-screen'>
            <h2 className=' text-3xl text-teal-400  font-bold '>
                Upload Movie
            </h2>
            <form className=' w-11/12 md:w-1/2 my-4'>
                <div className=' flex flex-col'>
                    <label htmlFor="Title" className='text-white  my-5 md:my-2'>Movie Name</label>
                    <input type="text"
                        name='Title'
                        className=' p-2 rounded text-black bg-slate-100 outline-none'
                        onChange={(e) => setMovies({ ...movies, title: e.target.value })}
                    />
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="url" className='text-white  my-5 md:my-2'>Poster URL</label>
                    <input type="text"
                        name='url'
                        className=' p-2 rounded text-black bg-slate-100 outline-none'
                        onChange={(e) => setMovies({ ...movies, url: e.target.value })}
                    />
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="Year" className='text-white  my-5 md:my-2'>Year</label>
                    <input type="number" name='Year' min="1900" max="2023" step="1"
                        className=' outline-none p-2 rounded text-black bg-slate-100'
                        onChange={(e) => setMovies({ ...movies, year: e.target.value })}
                    />
                </div>
                <div className=' flex flex-col'>
                    <label htmlFor="Desc" className=' text-white  my-5 md:my-2'>Movie Description</label>
                    <textarea name="Desc" id="" cols="30" rows="4"
                        className=' outline-none rounded bg-slate-100 p-2'
                        onChange={(e) => setMovies({ ...movies, desc: e.target.value })}
                    >

                    </textarea>
                    <button
                        onClick={handleSubmit}
                        className=' w-full justify-center p-2 px-10 md:px-4 font-semibold rounded bg-teal-400 mt-6 md:mt-3 text-black hover:bg-slate-100'>
                        {loading ? <TailSpin height={25} color='black' /> : "Submit"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default UploadMovie;

