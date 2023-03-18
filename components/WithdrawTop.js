import React, { useState, useRef } from "react";
import { ChevronDownIcon, DocumentIcon } from "@heroicons/react/24/solid";
import CoinModal from "./CoinModal";
import NetworkModal from "./NetworkModal";
import WithdrawModal from "./WithdrawModal";
import Image from "next/image"

function WithdrawTop() {
	const [coinOpen, setCoinOpen] = useState(false);
	const [WithdrawOpen, setWithdrawOpen] = useState(false);
    const [coin, setCoin] = useState()
	const [networkOpen, setNetworkOpen] = useState(false);
    const amountRef= useRef()

    console.log(coin)

	return (
		<div className=' '>
			{/* // Modals
        // Coin Modal */}
			{coinOpen && <CoinModal open={coinOpen} setOpen={setCoinOpen} setCoin={setCoin} />}
			{networkOpen && (
				<NetworkModal open={networkOpen} setOpen={setNetworkOpen} />
			)}

			{WithdrawOpen && (
				<WithdrawModal open={WithdrawOpen} setOpen={setWithdrawOpen} amount={amountRef.current.value} />
			)}
			<h1 className='mb-8 text-[1.5rem]'>Withdraw Crypto</h1>
			<div className='flex flex-col md:flex-row gap-4 w-full md:w-[90%] mx-auto  '>
				<div className='flex flex-col space-y-8 justify-start w-full md:w-[60%]'>
					<div className='flex gap-14 w-full items-center'>
						<h2 className='hidden md:block'>Select Coin</h2>
						<div className='w-full md:w-[60%] '>
							<p className='text-sm text-gray-400'>Coin</p>
							<div
								className='bg-gray-300 rounded-md px-2 py-4 flex-grow flex cursor-pointer justify-between'
								onClick={() => {
									setCoinOpen(true);
								}}
							>
								<div className="flex gap-2">
                              
									{coin ?                                    
                                    <div className="flex gap-2">
                                          <Image
                                      className=' rounded-full'
                                      src={coin.optionsUrl}
                                      alt="image"
                                      height={25}
                                      width={25}
                                  />
                                    <h1>
										{coin.name} <span className='text-gray-500'>{coin.displayName}</span>
									</h1>
                                    </div> : <h1>
										BTC <span className='text-gray-500'>Bitcoin</span>
									</h1>}
								</div>
								<ChevronDownIcon className='w-4 h-4' />
							</div>
						</div>
					</div>

					<div className='flex gap-12 w-full items-start'>
						<h2 className='hidden md:block'>Withdraw To</h2>
						<div className='w-full md:w-[60%] '>
							<div className='flex gap-4 mb-8 border-2 border-b-gray-400 border-transparent w-full md:w-[14rem]'>
								<h1>Wallet Address</h1>								
							</div>

							<div className='flex flex-col space-y-6 '>
								<div>
									<p className='text-sm text-gray-400'>Wallet Address</p>
									<input
										className='bg-gray-300 rounded-md px-2 py-4 outline-green-300 w-full'
										type='text'
										placeholder='Enter Withdrawal Address'
									/>
								</div>

								{/* <div>
									<p className='text-sm text-gray-400'>Network</p>
									<div
										className='bg-gray-300 rounded-md px-2 py-4 flex-grow flex cursor-pointer justify-between'
										onClick={() => {
											setNetworkOpen(true);
										}}
									>
										<h1 className='text-gray-500'>Select a Network</h1>
										<ChevronDownIcon className='w-4 h-4' />
									</div>
								</div> */}

                                <div>
									<p className='text-sm text-gray-400'>Amount</p>
									<input
										className='bg-gray-300 rounded-md px-2 py-4 outline-green-300 w-full'
										type='number'
										placeholder='Enter Amount'
                                        ref={amountRef}
									/>
								</div>

								<div className='flex flex-col space-y-4'>
									<div className='flex gap-8'>
										<div>
											<h2 className='text-xs text-gray-400'>
												Available Balance{" "}
												<span className='text-gray-400 rounded-full border border-gray-400  h-[15px] w-[15px] inline-flex items-center justify-center '>
													?
												</span>{" "}
											</h2>
											<span className='text-sm'>
												0.00 <span className='text-sm text-gray-400'>USDT</span>
											</span>
										</div>
										<div>
											<h2 className='text-xs text-gray-400'>
												Minimum Withrawal
											</h2>
											<span className='text-sm'>
												1.00 <span className='text-sm text-gray-400'>USDT</span>
											</span>
										</div>
									</div>
									<div>
										<h2 className='text-xs text-gray-400'>Fees</h2>
										<span className='text-sm'>
											0.00 <span className='text-sm text-gray-400'>USDT</span>
										</span>
									</div>
									<div>
										<h2 className='text-xs text-gray-400'>
											Remaining Daily Withdrawal Amount
										</h2>
										<span className='text-sm'>
											1 <span className='text-sm text-gray-400'>BTC</span>
										</span>
									</div>
								</div>

								<button
									className='w-full bg-green px-6 py-2 rounded-md text-white'
									onClick={() => {
										setWithdrawOpen(true);
									}}
								>
									Withdraw
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* FAQ */}
				<div className='flex flex-col space-y-4 w-full md:w-[40%]'>
					<h1 className='font-semibold'>FAQ</h1>
					<div>
						<a
							href='https://www.kucoin.com/support/900005758426'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								How do I withdraw crypto from my KuCoin account?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900007121923'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								What should I do if I didnt receive my withdrawal or if I made a
								withdrawal to an incorrect address?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900006118646'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								Is there a limit on 24h withdrawal?
							</h1>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WithdrawTop;
