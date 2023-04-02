import React from 'react'

function GridElement({title, amount, subAmount, color }) {
  return (
    <div className={`min-h-30vh bg-white shadow-gray-300 shadow-md rounded-md py-2 px-4 flex flex-col space-y-4 border-t-[.4rem] ${color}`}>
          <h1 className='text-black font-medium'> {title} </h1>
          <div>
          <h1 className='text-black font-medium'> {amount} <span className='text-sm'>BTC</span> </h1>
          <p className='text-gray-300'> = {subAmount} USD </p>
          </div>
    </div>
  )
}

export default GridElement