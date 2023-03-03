import React from 'react'
import AssetsFaq from '../components/AssetsFaq'
import AssetsGrid from '../components/AssetsGrid'
import AssetsHeader from '../components/AssetsHeader'
import AssetsTop from '../components/AssetsTop'
import Footer from '../components/Footer'
import Header from '../components/Header'

function assets() {
  return (
    <div className=''>
        <Header />
        <AssetsHeader />
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-24'>
        <AssetsTop />
        <AssetsGrid />
        <AssetsFaq />
        <Footer />
        </div>
    </div>
  )
}

export default assets