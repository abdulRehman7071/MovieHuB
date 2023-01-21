import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { TailSpin, CirclesWithBar } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import swal from 'sweetalert'
import { db, reviewsRef } from '../firebase/firebase'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'


const Review = ({ id, prevRating, userRated }) => {
    const navigate = useNavigate()
    const useAppState = useContext(AppState)
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false)
    const [review, setReview] = useState("")
    const [loadReview, setLoadReview] = useState(false)
    const [data, setData] = useState([])
    const [revAdded, setRevAdded] = useState(0)


    const handleReview = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {
            if (useAppState.login) {
                await addDoc(reviewsRef, {
                    movies: id,
                    rating: rating,
                    review: review,
                    reviewer: useAppState.user,
                    time: new Date().getTime()


                });
                swal({
                    title: 'Review added',
                    icon: 'success',
                    buttons: false,
                    timer: 3000
                })
                setReview('')
                setRating(0)
                setRevAdded(revAdded + 1)
                await setLoading(false)
                const docRef = doc(db, 'Movies', id)
                await updateDoc(docRef, {
                    rating: prevRating + rating,
                    rated: userRated + 1
                })
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
    useEffect(() => {

        async function getData() {
            setLoadReview(true)

            const qry = query(reviewsRef, where('movies', '==', id))
            setData([])
            const querrySnapshot = await getDocs(qry)
            querrySnapshot.forEach(doc => {
                setData((prev) => [...prev, doc.data()])
                console.log(doc.data())
            })
            console.log("Finished")
            setLoadReview(false)
        }
        getData()
    }, [revAdded])
    return (
        <section className=' mt-4 border-t-2 border-slate-100 w-full'>
            <form>
                <ReactStars
                    size={30}
                    half={true}
                    value={rating}
                    onChange={(rate) => setRating(rate)
                    }
                // id='ratingStars'
                />
                <input type="text" placeholder='Share your review...'
                    className=' w-full p-2 outline-none bg-gray-500 text-white rounded placeholder:text-white placeholder:italic'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                />
                <button
                    onClick={handleReview}
                    className=' flex justify-center w-full mx-auto p-2 px-10 md:px-4 font-semibold rounded bg-teal-400 mt-5 md:mt-3 text-black hover:bg-slate-100'>

                    {loading ? <TailSpin height={25} color='black' /> : "Publish"}
                </button>

            </form>
            {
                loadReview ?
                    <div className=' w-full flex justify-center mt-5'>
                        <CirclesWithBar
                            height="40"
                            color="white"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            outerCircleColor=""
                            innerCircleColor=""
                            barColor=""
                            ariaLabel='circles-with-bar-loading'
                        />
                    </div>

                    : <div>
                        {data.map((item, i) => {
                            return (
                                <div key={i} className=' mt-4 text-sm  bg-white text-black m-1 p-2 rounded'>
                                    <div className=' flex justify-between text-xs'>
                                        <p className=' bold'>
                                            {item.reviewer}
                                        </p>
                                        <p>
                                            {new Date(item.time).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className='mt-2' >
                                        <ReactStars value={item.rating} edit={false} />
                                        <p>
                                            {item.review}
                                        </p>
                                    </div>
                                </div>

                            )
                        }


                        )}
                    </div>
            }

        </section>
    )
}

export default Review
