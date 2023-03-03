import React from 'react'

function AssetsFaq() {
  return (
    <div className='flex flex-col space-y-4'>
        <h1 className='text-black font-medium'>FAQ</h1>

        <div >
            <h2 className='mb-2 text-black font-semibold text-[.9rem] '>  What are the differences among the KuCoin Main Account, Trading Account, Margin Account, Futures Account, and Financial Account?</h2>
            <p className='text-gray-400 text-[.8rem]'>The Main Account is used for crypto deposits, withdrawals, and purchases via credit/debit cards, as well as margin lending. The Trading Account is used for crypto trading. The Margin Account is used for margin borrowing and trading. The Futures Account is used for futures trading. The Financial Account is used for staking and financial management, with an annual yield of up to 20%.</p>
        </div>

        <div >
            <h2 className='mb-2 text-black font-semibold text-[.9rem] '>  What are the differences among Loans, Liabilities, and the Estimated Value of your account?</h2>

            <p className='text-gray-400 text-[.8rem]'>Loans refer to the amount of crypto lent out from the Main Account in the margin market. Liabilities refer to the amount of crypto borrowed into the Margin Account in the margin market. Both Liabilities and Loans are included in the Estimated Value of your account. Note: Loans will not generate KCS Bonuses but Liabilities will.</p>
        </div>
    </div>
  )
}

export default AssetsFaq