import React, { useState, useRef } from "react";
import { ChevronDownIcon, DocumentIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import CoinModal from "./CoinModal";
import Image from "next/image"
import NetworkModal from "./NetworkModal";

function DepositTop() {
	const [coinOpen, setCoinOpen] = useState(false);
	const [coin, setCoin] = useState();
	const [network, setNetwork] = useState();
	const [networkOpen, setNetworkOpen] = useState(false);
    const textRef = useRef()
	return (
		<div>
			{/* // Modals
        // Coin Modal */}
			{coinOpen && <CoinModal open={coinOpen} setOpen={setCoinOpen} setCoin={setCoin} />}			
			{networkOpen && (
				<NetworkModal open={networkOpen} setOpen={setNetworkOpen} setNetwork={setNetwork} />
			)}
			<h1 className='mb-8 text-[1.5rem]'>Deposit Crypto</h1>
			<div className="flex flex-col md:flex-row gap-4 w-full md:w-[90%] mx-auto ">
				<div className='flex flex-col space-y-8 justify-start w-full md:w-[60%]'>
					<div className='flex gap-14 w-full items-center'>
						<h2 className='hidden md:block'>Select Coin</h2>
						<div className=' w-full md:w-[60%] '>
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
                              </div> :<div className="flex gap-2">
                              <Image
                                className=' rounded-full'
                                src="https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663"
                                alt="image"
                                height={25}
                                width={25}
                            />
                            <h1>
                                  USDT <span className='text-gray-500'>Tether USDT</span>
                              </h1>
                                </div>}
                          </div>
								<ChevronDownIcon className='w-4 h-4' />
							</div>
						</div>
					</div>

					<div className='flex gap-4 w-full items-center'>
						<h2 className='hidden md:block'>Select a Network</h2>
						<div className=' w-full md:w-[60%] '>
							<p className='text-sm text-gray-400'>Network</p>
							<div
								className='bg-gray-300 rounded-md px-2 py-4 flex-grow flex cursor-pointer justify-between'
								onClick={() => {
									setNetworkOpen(true);
								}}
							>
								  {network ?                                    
                              <div className="flex gap-2">                                   
                              <h1>
                                  {network.name} <span className='text-gray-500'>{network.displayName}</span>
                              </h1>
                              </div> : <h1>
                                   <span className='text-gray-500'>Please Select a network</span>
                              </h1>}
							</div>
						</div>
					</div>

                    <div className='flex flex-col space-y-8 w-[80%]'>
                        <div >
                            <p  className="text-xs text-gray-400 mb-4">Address</p>
                            <div className="flex justify-between">
                                <h1 ref={textRef}>{network?.address}</h1>
                                <DocumentDuplicateIcon className="w-4 h-4 cursor-pointer text-gray-400" onClick={()=> {
                                    navigator.clipboard.writeText(textRef.current.textContent).then(alert("copied"))
                                }} />
                            </div>
                        </div>
									<div className='flex justify-between'>
										<div>
											<h2 className='text-xs text-gray-400'>
												Receipient Account{" "}
												<span className='text-gray-400 rounded-full border border-gray-400  h-[15px] w-[15px] inline-flex items-center justify-center '>
													?
												</span>{" "}
											</h2>
											<span className='text-xs'>
												Main Account <span className='text-xs green'>Edit</span>
											</span>
										</div>
										<div>
											<h2 className='text-xs text-gray-400'>
												Deposit Confirmation
											</h2>
											<span className='text-xs'>
												3 <span className='text-xs text-gray-400'>Block(s)</span>
											</span>
										</div>
									</div>
									{/* <div>
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
									</div> */}
								</div>

				</div>

				{/* FAQ */}
				<div className='flex flex-col space-y-4 w-full md:w-[40%]'>
					<h1 className='font-semibold'>FAQ</h1>
					<div>
						<a
							href='https://get.exness.help/hc/en-us/articles/360013893851-How-to-deposit-and-withdraw-with-Bitcoin'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								How do I deposit crypto into my DoniCoin account?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-my-money-back-after-i-discovered-an-unauthorized-transaction-or-money-missing-from-my-bank-account-en-1017/'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								What should I do if I didnt receive my deposits or I deposit to
								an incorrect address?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900006117646'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								What should I do if I deposit the wrong crypto?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900006117606'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								{" "}
								What should I do if I forgot to specify the Memo, Tag, or
								Message for my deposit?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900007120723'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								{" "}
								What should I do if I mistakenly deposit through the BSC or
								BEP20 network and did not receive the deposit?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900007172823'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4' />
							<h1 className='text-xs underline'>
								{" "}
								What are the common deposit networks?
							</h1>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DepositTop;
