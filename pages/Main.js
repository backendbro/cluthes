import React from 'react'
import AssetsHeader from '../components/AssetsHeader'

import Footer from '../components/Footer'
import Header from '../components/Header'
import MainTop from '../components/MainTop'

function Main() {
  return (
    <div className=''>
        <Header />
        <AssetsHeader />        
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-24'>
        <MainTop />
        <Footer />
        </div>
    </div>
  )
}

export default Main