import Image from 'next/image'
import React from 'react'

import { EyeIcon, EyeSlashIcon, Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";
import {BellIcon, DocumentTextIcon, CreditCardIcon} from "@heroicons/react/24/outline"


export default function Header() {
  return (
    <div className='flex justify-between p-4 items-center'>
      <div className='w-[80%] flex gap-2 items-center '>
          {/* logo */}
          <Image src="https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg" width={100} height={100} alt="logo"  />

        <Squares2X2Icon className='h-6 w-6 text-black' />
               

        <ul className='gap-8 flex-grow items-center hidden lg:flex'>
            <li><a href="#">Buy Crypto</a></li>
            <li><a href="#">Markets</a></li>
            <li><a href="#">Trades</a></li>
            <li><a href="#">Derivatives</a></li>
            <li><a href="#">Earn</a></li>
            <li><a href="#">NFT</a></li>
            <li><a href="#">Wallets</a></li>
            <button className='green bg-green-100 h-8  py-1 px-2 rounded-lg text-sm'>Beginner Zone</button>
        </ul>

       
      </div>

      <div className='w-[40%] md:w-[20%]  flex gap-4 justify-end lg:justify-evenly items-center'>
        <BellIcon className='w-8 h-8 rounded-lg bg-gray-300 px-2 py-2' />
        <DocumentTextIcon className='w-8 h-8 rounded-lg bg-gray-300 px-2 py-2 hidden  lg:flex' />
        <CreditCardIcon className='w-8 h-8 rounded-lg bg-gray-300 px-2 py-2 hidden  lg:flex' />
        <div className='h-8 w-8 flex items-center justify-center rounded-full border border-black text-sm'>32</div>
        <div className='h-6 w-10 text-sm items-center justify-center rounded-md border hidden  lg:flex   border-black text-center '>USD</div>
        <ListBulletIcon className='h-6 w-6 flex lg:hidden' />
      </div>
    </div>
  )
}
