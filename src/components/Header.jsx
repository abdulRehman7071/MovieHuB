import React from 'react'
import { AiOutlineVideoCameraAdd } from 'react-icons/ai'
const Header = () => {
    return (
        <header className=' flex items-center justify-between border-b-2 border-teal-400 w-full p-3 '>
            <div
                className="logo text-slate-100 cursor-pointer text-2xl font-bold ">
                Movie
                <span className=' text-teal-400'>Hub</span>
            </div>
            <nav>

            </nav>
            <div className=' flex items-center rounded border-2 border-slate-100 px-2 py-1 cursor-pointer hover:bg-slate-100 hover:text-gray-900 '>
                <AiOutlineVideoCameraAdd size={25} />
                <h2 className=' ml-1'>

                    Add new
                </h2>
            </div>
        </header>
    )
}

export default Header
