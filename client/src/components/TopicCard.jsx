import React from 'react'

const TopicCard = ({title,desc,icon,selected,onClick}) => {
  return (
    <div onClick={onClick} className={`rounded-2xl border-2 p-6 transition-all cursor-pointer ${selected?"border-blue-400 bg-green-300  ":"border-gray-500 hover:scale-[1.02]"}`} >
      <div className='w-6 h-6 mb-3 flex items-center justify-center rounded-lg bg-gradient-to-tr from-gray-500 to-green-200' >
        <div className='text-2xl' >{icon}</div>
      </div>
      <h4 className='text-lg font-semibold' >{title}</h4>
      <p className='text-sm text-shadow-violet-950 mt-1' >{desc}</p>
    </div>
  )
}

export default TopicCard