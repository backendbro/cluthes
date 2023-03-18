import React from 'react'
import AssetsHeader from '../components/AssetsHeader'
import WithdrawTop from '../components/WithdrawTop'
import WithdrawHistory from '../components/WithdrawHistory'
import Footer from '../components/Footer'
import Header from '../components/Header'

function Withdraw() {
  return (
    <div>
        <Header />
        <AssetsHeader />
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col space-y-24'>
            <WithdrawTop />      
            <WithdrawHistory />  
        <Footer />
        </div>
    </div>
  )
}

export default Withdraw