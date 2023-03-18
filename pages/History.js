import React from 'react'
import AssetsHeader from '../components/AssetsHeader'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeaderTop from '../components/HeaderTop'

function History() {
  return (
    <div>
        <Header />
        <AssetsHeader />
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-24'>
        <HeaderTop />
        <Footer />
        </div>
    </div>
  )
}

export default History