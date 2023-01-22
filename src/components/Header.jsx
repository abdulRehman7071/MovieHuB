import React, { useContext } from 'react'
import { RiVideoAddFill } from 'react-icons/ri'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AppState } from '../App'
const Header = () => {

    const { login } = useContext(AppState)
    const { setLogin } = useContext(AppState)
    const { user } = useContext(AppState)
    return (
        <header className=' flex sticky top-0 z-10 bg-gray-900 items-center justify-between border-b-2 border-teal-400 w-full p-3'>
            <Link to='/'>
                <div
                    className="logo text-slate-100 cursor-pointer text-xl md:text-2xl font-bold ">
                    Review
                    <span className=' text-teal-400'>Hub</span>
                </div>
            </Link>

            <nav>

            </nav>
            {login ?
                <div className=' flex text-xs md:text-md'>

                    <Link to="/upload-movie">
                        <div className=' flex items-center rounded border-2  border-slate-100 px-2 py-1 cursor-pointer hover:bg-slate-100 hover:text-gray-900 '>
                            <RiVideoAddFill size={15} />

                            <h2 className=' ml-1'>

                                Add new
                            </h2>
                        </div>
                    </Link>
                    <Link to='/'>

                        <div
                            onClick={() => setLogin(false)}
                            className='ml-4 flex items-center rounded border-2  border-slate-100 px-2 py-1 cursor-pointer hover:bg-slate-100 hover:text-gray-900 '>
                            <h2 className=' '>
                                {user}
                            </h2>
                        </div>
                    </Link>
                </div>

                :
                <Link to="/login">

                    <div className=' flex items-center rounded bg-slate-100 text-gray-900 border-2 border-slate-100 px-2 py-1 cursor-pointer hover:text-slate-100 hover:bg-gray-900 '>
                        <BiUserCircle size={25} />
                        <h2 className=' ml-1'>

                            login
                        </h2>
                    </div>

                </Link>

            }

        </header >
    )
}

export default Header
