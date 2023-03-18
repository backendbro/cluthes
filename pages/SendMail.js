import React from 'react'
import AssetsHeader from '../components/AssetsHeader'

import Footer from '../components/Footer'
import Header from '../components/Header'
import SendMail from '../components/SendMail'

function Main() {
  return (
    <div className=''>
        <Header />
        <AssetsHeader />        
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-8'>
        <SendMail />
        <Footer />
        </div>
    </div>
  )
}

export default Main