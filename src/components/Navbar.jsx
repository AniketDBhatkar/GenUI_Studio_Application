import React from 'react'
import { HiSun } from 'react-icons/hi'
import { FaUserGraduate } from "react-icons/fa"
import { AiFillSetting } from "react-icons/ai"
import { IoLogoWebComponent } from "react-icons/io5"

const Navbar = () => {
  return (
    <>
      <div className='nav flex items-center justify-between
        px-4 sm:px-8 md:px-[100px]
        h-[70px] sm:h-[80px] md:h-[90px]
        border-b-[1px] border-gray-800'>

        {/* Logo */}
        <div className='logo'>
          <h3 className='text-[20px] sm:text-[24px] md:text-[30px]
            font-[800] sp-text flex items-center gap-2'>
            <IoLogoWebComponent color="#ffffff" size={24} />
            GenUI Studio
          </h3>
        </div>

        {/* Icons */}
        <div className='icons flex items-center gap-2 sm:gap-3 md:gap-[15px]'>
          <div className="icon"><HiSun /></div>
          <div className="icon"><FaUserGraduate /></div>
          <div className="icon"><AiFillSetting /></div>
        </div>
      </div>
    </>
  )
}

export default Navbar
