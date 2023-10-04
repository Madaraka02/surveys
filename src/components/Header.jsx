import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' w-full bg-white shadow-md py-4'>
        <div className="container mx-auto w-full flex flex-row items-center gap-3">
            <Link to="/" className='hover:text-indigo-500 hover:underline underline-offset-1 decoration-2'>Surverys</Link>
            <Link to="/responses" className='hover:text-indigo-500 hover:underline underline-offset-1 decoration-2'>Responses</Link>

        </div>
    </div>
  )
}

export default Header