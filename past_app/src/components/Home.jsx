import React, { useEffect } from 'react'
import { use } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { addtopaste, updatetopaste } from '../redux/pasteSlice';



export default function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams('');
    const pasteId=searchParams.get('pasteId');
    const dispatch=useDispatch();
    const allpastes=useSelector((state)=> state.paste.pastes)
    function createpaste(){
      const paste={
        titel:title,
        content:value,
        _id:pasteId ||
        Date.now().toString(36),
        createdAt: new Date().toISOString(),
      }
      if(pasteId){
        dispatch(updatetopaste(paste))
      }
      else{
        dispatch(addtopaste(paste))
      }
      setTitle('');
      setValue('');
      setSearchParams({})
    }
    useEffect(()=>{
      if(pasteId){
        const paste=allpastes.find((p)=>p._id==pasteId);
        setTitle(paste.titel)
        setValue(paste.content)
      }
    },[pasteId])
  return (
    <div className='bg-gray-600 h-screen'>
    <div className='flex justify-center'>
      
       <input type="text"
        className=' p-2 mt-10 rounded-2xl'
        placeholder='Enter Title' 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <button  onClick={createpaste}className='bg-blue-500 w-24 h-10 rounded-2xl text-white mt-10 ml-2 '>
           {
                pasteId ? 'Update' : 'Create'
           }
        </button>
      </div>
      <div className='flex justify-center'>
        <textarea
        className=' p-2 mt-10 rounded-2xl  w-4/5 place-content-center text-xl text-center'
        placeholder='Ente your text' 
        value={value}
        rows={20}
        onChange={(e)=>setValue(e.target.value)}
        />
      </div>
        
    </div>
  )
}
