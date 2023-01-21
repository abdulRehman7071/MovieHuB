import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import app, { usersRef } from '../firebase/firebase'
import swal from 'sweetalert'
import bcrypt from 'bcryptjs'

import { addDoc } from 'firebase/firestore'

const SignUp = () => {
    const navigate = useNavigate()
    const auth = getAuth(app)
    const [signUp, setSignUp] = useState({
        username: '',
        number: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [sentOpt, setSentOpt] = useState(false)
    const [OTP, setOTP] = useState("")
    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    const requestOtp = (e) => {
        e.preventDefault();
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${signUp.number}`, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                setSentOpt(true);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            })
    }

    const verifyOTP = async () => {
        try {

            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                navigate('/login')
                setLoading(false);
            })

        }
        catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(signUp.password, salt);
            await addDoc(usersRef, {
                name: signUp.username,
                password: hash,
                mobile: signUp.number
            });
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <h1 className=' flex justify-center my-4 text-3xl bold text-teal-400'>
                Sign Up
            </h1>
            {
                sentOpt ?
                    <section className=' w-full flex min-h-screen flex-col'>
                        <div className=' md:w-1/3  w-11/12 mx-auto'>
                            <label htmlFor="number" className='flex my-2 '> Phone Number</label>
                            <input type="password" name='number'
                                className=' p-2 rounded text-black bg-slate-100  outline-none  w-full'
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                            />
                        </div>
                        <div className='md:w-1/3  w-11/12 mx-auto mt-6  '>
                            <button
                                onClick={verifyOTP}
                                className='flex justify-center bg-teal-400 w-full p-2 rounded text-black hover:bg-slate-100'>
                                Confirm OTP
                            </button>
                        </div>
                    </section>
                    :
                    <section className=' w-full flex flex-col  justify-start items-center min-h-screen'>

                        <div className=' w-full flex justify-center  text-lg'>
                            <form action="" className=' w-full'>
                                <div className=' md:w-1/3  w-11/12 mx-auto'>
                                    <label htmlFor="name" className='flex my-2 '>Username</label>
                                    <input type="text" name='name'
                                        className=' p-2 rounded text-black bg-slate-100  outline-none  w-full'
                                        value={signUp.username}
                                        onChange={(e) => setSignUp({ ...signUp, username: e.target.value })}
                                    />
                                </div>
                                <div className=' md:w-1/3  w-11/12 mx-auto'>
                                    <label htmlFor="number" className='flex my-2 '> Phone Number</label>
                                    <input type="number" name='number'
                                        className=' p-2 rounded text-black bg-slate-100  outline-none  w-full'
                                        value={signUp.number}
                                        onChange={(e) => setSignUp({ ...signUp, number: e.target.value })}
                                    />
                                </div>
                                <div className=' md:w-1/3  w-11/12 mx-auto'>
                                    <label htmlFor="pass" className='flex my-2'>Password</label>
                                    <input type="password" name='pass'
                                        value={signUp.password}
                                        onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
                                        className=' p-2 rounded text-black bg-slate-100 outline-none w-full' />
                                </div>
                                <div className='md:w-1/3  w-11/12 mx-auto mt-6  '>
                                    <button
                                        onClick={requestOtp}
                                        className='flex justify-center bg-teal-400 w-full p-2 rounded text-black hover:bg-slate-100'>
                                        {
                                            loading ? <TailSpin height={30} color='black' /> : "Get OTP"
                                        }
                                    </button>
                                </div>
                                <div className=' flex justify-center md:w-1/3 mx-auto mt-6'>
                                    <h4>
                                        Already have an account ?
                                        <Link to='/login'>
                                            <span className=' text-teal-400'> Login</span>
                                        </Link>

                                    </h4>
                                </div>

                            </form>
                            <div id="recaptcha-container"></div>
                        </div>
                    </section>
            }
        </>


    )
}

export default SignUp
