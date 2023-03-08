import React, { useState } from "react";
import { ChevronDownIcon, DocumentIcon } from "@heroicons/react/24/solid";
import CoinModal from "./CoinModal";
import NetworkModal from "./NetworkModal";

function DepositTop() {
	const [coinOpen, setCoinOpen] = useState(false);
	const [networkOpen, setNetworkOpen] = useState(false);
	return (
		<div>
			{/* // Modals
        // Coin Modal */}
			{coinOpen && <CoinModal open={coinOpen} setOpen={setCoinOpen} />}
			{networkOpen && (
				<NetworkModal open={networkOpen} setOpen={setNetworkOpen} />
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
								<div>
									<h1>
										BTC <span className='text-gray-500'>Bitcoin</span>
									</h1>
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
								<h1 className='text-gray-500'>Select a Network</h1>
								<ChevronDownIcon className='w-4 h-4' />
							</div>
						</div>
					</div>
				</div>

				{/* FAQ */}
				<div className='flex flex-col space-y-4 w-full md:w-[40%]'>
					<h1 className='font-semibold'>FAQ</h1>
					<div>
						<a
							href='https://www.kucoin.com/support/900007079063'
							className='flex gap-2 items-center text-gray-500'
						>
							<DocumentIcon className='h-4 w-4 ' />
							<h1 className='text-xs underline'>
								How do I deposit crypto into my KuCoin account?
							</h1>
						</a>
					</div>

					<div>
						<a
							href='https://www.kucoin.com/support/900006118386'
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
