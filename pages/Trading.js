import React from 'react'
import AssetsHeader from '../components/AssetsHeader'

import Footer from '../components/Footer'
import Header from '../components/Header'
import TradingTop from '../components/TradingTop'

function Trading() {
  return (
    <div className=''>
        <Header />
        <AssetsHeader />        
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-24'>
        <TradingTop />
        <Footer />
        </div>
    </div>
  )
}

export default Trading