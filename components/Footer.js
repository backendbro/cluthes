import Image from 'next/image'
import React from 'react'
import { FooterData } from '../data/FooterData'
import FooterElement from './FooterElement'

function Footer() {
  return (
    <div className='flex flex-col space-y-8'>
          <Image src="/images/logo.jpeg" width={100} height={100} alt="logo"  />

       <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
       {FooterData.map((item, i)=> <FooterElement title={item.title} list={item.list} number={item.number} index={i} key={i} /> ) }
       </div>
    </div>
  )
}

export default Footer