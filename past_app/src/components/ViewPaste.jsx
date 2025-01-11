import React from 'react'

import { use } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import { addtopaste, updatetopaste } from '../redux/pasteSlice';
export default function ViewPaste() {

  const {id}=useParams();
  const allpastes=useSelector((state)=>state.paste.pastes)
  const paste=allpastes.filter((p)=>p._id==id)[0]
  console.log("final paste",paste);
  
  return (
    <div className='bg-gray-600 h-screen'>
    <div className='flex justify-center'>
      
       <input type="text"
        className=' p-2 mt-10 rounded-2xl'
        placeholder='Enter Title' 
        value={paste.titel}
        disabled
        onChange={(e)=>setTitle(e.target.value)}
        />
        {/* <button  onClick={createpaste}className='bg-blue-500 w-24 h-10 rounded-2xl text-white mt-10 ml-2 '>
           {
                pasteId ? 'Update' : 'Create'
           }
        </button> */}
      </div>
      <div className='flex justify-center'>
        <textarea
        className=' p-2 mt-10 rounded-2xl  w-4/5 place-content-center text-xl text-center'
        placeholder='Ente your text' 
        value={paste.content}
        rows={20}
        onChange={(e)=>setValue(e.target.value)}
        />
      </div>
        
    </div>
  )
}
