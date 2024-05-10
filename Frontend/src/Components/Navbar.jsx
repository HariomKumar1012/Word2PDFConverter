import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed'>
        <div className='flex justify-between'>
          <h1 className='text-3xl cursor-pointer font-bold text-white'>PDF <span className='text-3xl text-blue-600'>Cool</span></h1>
        </div>
      </div>
    </>
  )
}

export default Navbar
