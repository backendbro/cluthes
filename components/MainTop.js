import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function MainTop() {
  return (
    <div className='mt- flex flex-col space-y-8  md:flex-row md: justify-between md:items-end'>
    <div className='flex flex-col space-y-8'>
        <div className='flex items-center gap-2'>
            <h1 className='text-[1.8rem] font-medium'>Main Account</h1>            
        </div>
        <div className='flex items-center gap-2'>            
            <p>0.00BTC <span className=' text-gray-600'>=0.00 USD</span></p>           
        </div>
        <div>
            <MagnifyingGlassIcon className='h-4 w-4 text=gray-300' />
            <input type="text" placeholder='search' />
        </div>
    </div>   
</div>
  )
}

export default MainTop