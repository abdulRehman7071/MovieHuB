import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { query, where, getDocs } from 'firebase/firestore'
import { usersRef } from '../firebase/firebase'
import bcrypt from 'bcryptjs'
import { AppState } from '../App';

const Login = () => {
    const useAppstate = useContext(AppState)
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        number: '',
        password: '',
    })

    const hanldeLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const qry = query(usersRef, where('mobile', '==', loginData.number))
            const qrySnapshot = await getDocs(qry)

            qrySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(loginData.password, _data.password);
                console.log(isUser);
                if (isUser) {
                    useAppstate.setLogin(true)
                    useAppstate.setUser(_data.name)
                    swal({
                        text: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000,
                    });
                    navigate('/')

                } else {
                    swal({
                        text: 'Invalid Credentials',
                        icon: "error",
                        buttons: false,
                        timer: 3000,
                    });
                }
            })

        } catch (err) {
            swal({
                text: err.message,
                icon: "error",
                buttons: false,
                timer: 3000,
            });
            console.log(err);
        }
        setLoading(false)
    }
    const [loading, setLoading] = useState(false);
    return (
        <section className=' w-full flex flex-col  justify-start items-center min-h-screen'>
            <h1 className=' my-4 text-3xl bold text-teal-400'>
                Login
            </h1>
            <div className=' w-full flex justify-center text-lg'>
                <form action="" className=' w-full'>
                    <div className=' md:w-1/3 w-11/12 mx-auto'>
                        <label htmlFor="number" className='flex my-2 '> Phone Number</label>
                        <input type="number" name='number'
                            className=' p-2 rounded text-black bg-slate-100  outline-none  w-full'
                            value={loginData.number}
                            onChange={(e) => setLoginData({ ...loginData, number: e.target.value })}
                        />
                    </div>
                    <div className=' md:w-1/3  w-11/12  mx-auto'>
                        <label htmlFor="pass" className='flex my-2'>Password</label>
                        <input type="password" name='pass'
                            className=' p-2 rounded text-black bg-slate-100 outline-none w-full'
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                    </div>
                    <div className='md:w-1/3  w-11/12 mx-auto mt-6  '>
                        <button
                            onClick={hanldeLogin}
                            className=' flex justify-center bg-teal-400 w-full p-2 rounded text-black hover:bg-slate-100'>
                            {
                                loading ? <TailSpin height={30} color='black' /> : "Login"
                            }
                        </button>
                    </div>

                    <div className=' flex justify-center md:w-1/3 mx-auto mt-6'>
                        <h4>
                            don't have an account ?
                            <Link to='/sign-up'>
                                <span className=' text-teal-400'> Sign up</span>

                            </Link>

                        </h4>
                    </div>
                </form>


            </div>
        </section>
    )
}

export default Login
