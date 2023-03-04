import React from 'react'
import AssetsHeader from '../components/AssetsHeader'
import DepositTop from '../components/DepositTop'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Deposit() {
  return (
    <div>
        <Header />
        <AssetsHeader />
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-24'>
            <DepositTop />        
        <Footer />
        </div>
    </div>
  )
}

export default Deposit