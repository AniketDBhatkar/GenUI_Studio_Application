import React from 'react'
import {HiSun} from 'react-icons/hi'
import { FaUserGraduate } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { IoLogoWebComponent } from "react-icons/io5";
const Navbar = () => {
  return (
    <>
      <div className='nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800'>
         <div className='logo'>
          <h3 className='text-[30px] font-[800] sp-text flex gap-2' ><IoLogoWebComponent color="#ffffff" size={24} />
GenUI Studio</h3>
         </div>
         <div className='icons flex item-center gap-[15px]'>
          <div className="icon"><HiSun/></div>
          <div className="icon"><FaUserGraduate /></div>
          <div className="icon"><AiFillSetting /></div>
         </div>
      </div>
    </>
  )
}

export default Navbar