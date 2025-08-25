import React, { useEffect } from 'react'
import { useState } from 'react'
const Loader = ({message}) => {
    const [progress,setProgress]=useState(0);

    useEffect(()=>{
        const interval=setInterval(()=>{
            setProgress((p)=>{
                if(p>=95) return p;
                return Math.min(p+Math.floor(Math.random()*10),100);

            })
        },500);
        return ()=>clearInterval(interval);
    },[]);
  return (
    <div className='flex flex-col justify-center items-center h-screen text-center' >
        <h2 className='text-2xl font-bold mb-4' >{message}</h2>
        <div className='w-64  h-4 rounded-full  bg-gray-200'>
            <div className='bg-blue-500 h-4 rounded-full transition-all duration-300' style={{width:`${progress}%`}}/>
        </div>
        <p>{progress}%</p>
    </div>
  )
}

export default Loader